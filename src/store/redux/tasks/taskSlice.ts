import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  boardId: string;
  columnId: string;
  name: string;
}
interface taskState {
  tasks: Task[];
}

const initialState: taskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
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

export const { addTasks, setTasks, removeTasks } = taskSlice.actions;
export default taskSlice.reducer;
