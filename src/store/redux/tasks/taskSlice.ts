import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
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
}

const initialState: taskState = {
  tasks: [],
  loading: false,
  currentID: null,
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
      state.tasks = state.tasks.filter(task => task.boardID !== action.payload);
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
      dispatch(removeTasks(taskID));
      console.log('task deleted successfuly', taskID);
    } catch (error) {
      console.log('task couldnt get removed due to ', error);
    }
  },
);
export const { addTasks, setTasks, removeTasks, setLoading, setCurrentID } =
  taskSlice.actions;
export default taskSlice.reducer;
