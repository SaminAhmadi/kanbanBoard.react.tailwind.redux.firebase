import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

export interface Task {
  id: string;
  description: string;
  status: string;
  boardID: string | null;
}
interface taskState {
  tasks: Task[];
  loading: boolean;
  currentID: string | null;
  error: string | null;
}

const initialState: taskState = {
  tasks: [],
  loading: false,
  currentID: null,
  error: null,
};
const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // Action to start loading (useful for async calls)
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addTasks: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    removeTasks: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setCurrentID: (state, action: PayloadAction<string | null>) => {
      state.currentID = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, state => {
        state.loading = false;
      });
    builder.addCase(deleteTaskFromFirebase.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    });
    builder
      .addCase(editTasksFirebase.pending, state => {
        state.loading = true;
      })
      .addCase(editTasksFirebase.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, description: action.payload.description } // Update task
            : task,
        );
      })
      .addCase(editTasksFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// capitalize words function
const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

// Async thunk to fetch tasks based on the selected board
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (boardID: string) => {
    const q = query(collection(db, 'tasks'), where('boardID', '==', boardID));
    const taskDocs = await getDocs(q);
    return taskDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  },
);

// add new tasks to firebase and redux
export const addToTasks = createAsyncThunk(
  'tasks/addToTasks',
  async (
    {
      description,
      status,
      currentBoardID,
    }: { description: string; status: string; currentBoardID: string | null },
    { dispatch },
  ) => {
    const taskDocs = await addDoc(collection(db, 'tasks'), {
      description: description,
      status: capitalizeWords(status),
      boardID: currentBoardID,
    });
    dispatch(
      addTasks({
        description: description,
        id: taskDocs.id,
        status: capitalizeWords(status),
        boardID: currentBoardID,
      }),
    );
  },
);
// async thunk to delete tasks
export const deleteTaskFromFirebase = createAsyncThunk(
  'tasks/deleteTaskFromFirebase',
  async (taskID: string, { dispatch }) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskID));
      console.log('task deleted successfuly', taskID);
      dispatch(removeTasks(taskID));
      return taskID;
    } catch (error) {
      console.log('task couldnt get removed due to ', error);
    }
  },
);

// edit tasks in firebase
export const editTasksFirebase = createAsyncThunk(
  'tasks/editTasksFirebase',
  async (
    { taskId, description }: { taskId: string; description: string },
    { rejectWithValue },
  ) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, { description });

      return { taskId, description }; // Return the updated values
    } catch (error) {
      console.error('Error updating task:', error);
      return rejectWithValue(error);
    }
  },
);

// set drag and drop tasks to the database
export const setDragAndDropTasks = createAsyncThunk(
  'tasks/setDragAndDropTasks',
  async (
    { taskId, newStatus }: { taskId: string; newStatus: string },
    { rejectWithValue },
  ) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      const taskSnapShot = await getDoc(taskRef);
      if (!taskSnapShot.exists()) {
        console.log('Task not found');
      }
      // Update only the 'status' field
      await updateDoc(taskRef, { status: newStatus });
      return { taskId, newStatus };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const { addTasks, setTasks, removeTasks, setLoading, setCurrentID } =
  taskSlice.actions;
export default taskSlice.reducer;
