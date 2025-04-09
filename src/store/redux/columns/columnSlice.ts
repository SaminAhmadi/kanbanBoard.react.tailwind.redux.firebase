import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig.js';
import { removeTasks } from '../tasks/taskSlice.ts';

export interface Column {
  boardID: string | null;
  title: string;
  id: string;
  icon: string;
  timestamp: string;
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
        column => column.boardID !== action.payload,
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
    builder
      .addCase(removeColumnsFromFromFirebase.pending, state => {
        state.loading = true;
      })
      .addCase(removeColumnsFromFromFirebase.fulfilled, (state, action) => {
        state.loading = false;
        state.columns = state.columns.filter(
          col => col.id !== action.payload.colID,
        );
      });
  },
});

// capitalize words function
const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};
// Async thunk to fetch columns for a selected board
export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async (boardID: string) => {
    const q = query(
      collection(db, 'columns'),
      where('boardID', '==', boardID),
      orderBy('timestamp', 'asc'),
    );
    const columnDocs = await getDocs(q);
    return columnDocs.docs.map(doc => {
      const data = doc.data();
      // Generate a new JS timestamp (current time + offset)
      const newTimestamp = new Date();
      newTimestamp.setHours(newTimestamp.getHours() + 1); // Add 1 hour
      newTimestamp.setMinutes(newTimestamp.getMinutes() + 30); // Add 30 minutes
      newTimestamp.setSeconds(newTimestamp.getSeconds() + 45); // Add 45 seconds
      return {
        ...data,
        id: doc.id,
        timestamp: newTimestamp.toISOString(),
      };
    }) as Column[];
  },
);

// async thunk to add extra columns on the current board
export const addNewColumn = createAsyncThunk(
  'columns/addNewColumn',
  async (
    {
      colorIcon,
      columnTitle,
      currentBoard,
    }: { colorIcon: string; columnTitle: string; currentBoard: string | null },
    { dispatch },
  ) => {
    try {
      // sorting with timestamp
      const newTimestamp = new Date();
      newTimestamp.setHours(newTimestamp.getHours() + 1); // Add 1 hour
      newTimestamp.setMinutes(newTimestamp.getMinutes() + 30); // Add 30 minutes
      newTimestamp.setSeconds(newTimestamp.getSeconds() + 45); // Add 45 seconds
      const ColumnDocs = await addDoc(collection(db, 'columns'), {
        id: Math.floor(Math.random() * 100),
        title: capitalizeWords(columnTitle),
        boardID: currentBoard,
        icon: colorIcon,
        timestamp: newTimestamp.toISOString(),
      });
      const newCol = {
        id: ColumnDocs.id,
        title: capitalizeWords(columnTitle),
        boardID: currentBoard,
        icon: colorIcon,
        timestamp: newTimestamp.toISOString(),
      };
      dispatch(addColumn(newCol)); // update redux
    } catch (error) {
      console.error('adding column error: ', error);
    }
  },
);

// remove column
export const removeColumnsFromFromFirebase = createAsyncThunk(
  'columns/removeColumnsFromFirebase',
  async (
    { colID, colTitle }: { colID: string; colTitle: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      // Query all tasks where taskStatus === colTitle
      const taskQuery = query(
        collection(db, 'tasks'),
        where('status', '==', colTitle),
      );
      // Delete all matching tasks
      const taskSnapShots = await getDocs(taskQuery);
      const deletedTasks = taskSnapShots.docs.map(task => {
        deleteDoc(doc(db, 'tasks', task.id));
        dispatch(removeTasks(task.id));
      });
      await Promise.all(deletedTasks);
      // Delete the column
      await deleteDoc(doc(db, 'columns', colID));
      // Update Redux store
      dispatch(removeColumn(colID));
      return { colID };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);
// Export actions for use in components
export const { addColumn, setColumns, removeColumn, setLoading } =
  columnSlice.actions;
export default columnSlice.reducer;
