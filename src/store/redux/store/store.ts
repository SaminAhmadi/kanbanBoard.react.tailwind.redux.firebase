import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../boards/boardSlice.ts';
import columnReducer from '../columns/columnSlice.ts';
import taskReducer from '../tasks/taskSlice.ts';
import darkmodeReducer from '../darkmode/index.ts';

const store = configureStore({
  reducer: {
    board: boardReducer,
    column: columnReducer,
    task: taskReducer,
    darkmode: darkmodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
