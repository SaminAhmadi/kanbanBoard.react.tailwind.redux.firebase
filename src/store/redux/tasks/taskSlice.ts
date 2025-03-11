import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  boardId: string;
  columnId: string;
  name: string;
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
    removeTasks: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTasks, setTasks, removeTasks, setLoading } =
  taskSlice.actions;
export default taskSlice.reducer;
