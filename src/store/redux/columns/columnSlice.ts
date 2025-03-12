import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig.js';

export interface Column {
  boardID: string;
  title: string;
  id: string;
  icon: string;
}
interface columnState {
  columns: Column[];
  loading: boolean;
  error: string | null;
}
const initialState: columnState = {
  columns: [],
  loading: false,
  error: null,
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
        column => column.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchColumns.pending, state => {
        state.loading = true;
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.loading = false;
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.loading = false;
        console.error('Failed to fetch columns:', action.error.message);
      });
  },
});
// Async thunk to fetch columns for a selected board
export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async (boardID: string) => {
    const q = query(collection(db, 'columns'), where('boardID', '==', boardID));
    const columnDocs = await getDocs(q);
    return columnDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Column[];
  },
);
// Export actions for use in components
export const { addColumn, setColumns, removeColumn, setLoading } =
  columnSlice.actions;
export default columnSlice.reducer;
