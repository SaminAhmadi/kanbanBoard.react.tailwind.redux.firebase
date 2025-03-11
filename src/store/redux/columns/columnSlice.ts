import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Column {
  boardId: string;
  title: string;
  columnId: string;
  order: number;
}
interface columnState {
  columns: Column[];
  loading: boolean;
}
const initialState: columnState = {
  columns: [],
  loading: false,
};

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    // Action to start loading (useful for async calls)
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Action to add new column
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push(action.payload);
    },
    // Action to set columns after fetching from firebase
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    // Action to remove a column
    removeColumn: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter(
        column => column.columnId !== action.payload,
      );
    },
  },
});
// Export actions for use in components
export const { addColumn, setColumns, removeColumn, setLoading } =
  columnSlice.actions;
export default columnSlice.reducer;
