import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig.js';
import columns from '../../../components/ui/common/columns';

export interface Column {
  boardID: string | null;
  title: string;
  id: string;
  icon: string;
  position: number;
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
    const q = query(collection(db, 'columns'), where('boardID', '==', boardID));
    const columnDocs = await getDocs(q);
    return columnDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Column[];
  },
);
// After adding a new column, update other columns' positions
const updateColumnPositions = async (
  boardID: string | null,
  newPosition: number,
) => {
  const columnsQuery = query(
    collection(db, 'columns'),
    where('boardID', '==', boardID),
    orderBy('position'),
  );
  const querySnapshot = await getDocs(columnsQuery);

  // Create an array of promises for each updateDoc operation
  const updatePromises = querySnapshot.docs.map(async (doc, index) => {
    const columnRef = doc.ref;
    const updatedPosition = index >= newPosition ? index + 1 : index;
    await updateDoc(columnRef, { position: updatedPosition });
  });

  // Wait for all updates to complete
  await Promise.all(updatePromises);
};

// async thunk to add extra columns on the current board
export const addNewColumn = createAsyncThunk(
  'columns/addNewColumn',
  async (
    {
      columnTitle,
      currentBoard,
    }: { columnTitle: string; currentBoard: string | null },
    { dispatch },
  ) => {
    try {
      const icons = [
        '--circle-primary',
        '--circle-secondary',
        '--circle-third',
      ];
      const randomIndex = Math.floor(Math.random() * icons.length);
      const currentIcon = icons[randomIndex];
      console.log(currentIcon);
      const ColumnDocs = await addDoc(collection(db, 'columns'), {
        id: Math.floor(Math.random() * 100),
        title: capitalizeWords(columnTitle),
        boardID: currentBoard,
        icon: currentIcon,
        position: columns.length + 1,
      });
      const newCol = {
        id: ColumnDocs.id,
        title: capitalizeWords(columnTitle),
        boardID: currentBoard,
        icon: '--circle-third',
        position: columns.length + 1,
      };
      await updateColumnPositions(currentBoard, columns.length);
      dispatch(addColumn(newCol)); // update redux
    } catch (error) {
      console.log('adding column error: ', error);
    }
  },
);
// Export actions for use in components
export const { addColumn, setColumns, removeColumn, setLoading } =
  columnSlice.actions;
export default columnSlice.reducer;
