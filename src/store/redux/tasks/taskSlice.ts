import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

export interface Task {
  id: string;
  boardID: string;
  columnID: string;
  description: string;
}
interface taskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: taskState = {
  tasks: [],
  loading: false,
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

export const { addTasks, setTasks, removeTasks, setLoading } =
  taskSlice.actions;
export default taskSlice.reducer;
