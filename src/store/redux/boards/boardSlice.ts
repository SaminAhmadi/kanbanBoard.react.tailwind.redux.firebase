// Define the type for a single board
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig.js';
import { removeColumn } from '../columns/columnSlice.ts';
import { removeTasks } from '../tasks/taskSlice.ts';

export interface Board {
  id: string;
  title: string;
}
// Define the initial state type
interface BoardState {
  boards: Board[];
  loading: boolean;
  currentBoardId: string | null;
}

const initialState: BoardState = {
  boards: [],
  loading: false,
  currentBoardId: null,
};

// Creating the board slice
const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // Action to start loading (useful for async calls)
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Action to add a new board
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload);
    },
    // Action to set boards (e.g., after fetching from Firebase)
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
    },
    // Action to remove a board
    removeBoards: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter(board => board.id !== action.payload);
    },
    // Action to set current board, which board is selected
    setCurrentBoard: (state, action: PayloadAction<string>) => {
      state.currentBoardId = action.payload;
    },
  },
});

// using Firebase to fetch data
export const fetchBoards = () => async (dispatch: any) => {
  dispatch(boardSlice.actions.setLoading(true));
  const boardsCollection = query(
    collection(db, 'boards'),
    orderBy('timestamp', 'asc'),
  );
  const boardDocuments = await getDocs(boardsCollection);
  const boardList: Board[] = boardDocuments.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Board[];
  dispatch(boardSlice.actions.setBoards(boardList));
  dispatch(boardSlice.actions.setLoading(false));
};

// updating firebase boards
export const addBoardToFirebase = createAsyncThunk(
  'boards/addBoardToFirebase',
  async (boardTitle: string, { dispatch }) => {
    try {
      // sorting with timestamp
      const newTimestamp = new Date();
      newTimestamp.setHours(newTimestamp.getHours() + 1); // Add 1 hour
      newTimestamp.setMinutes(newTimestamp.getMinutes() + 30); // Add 30 minutes
      newTimestamp.setSeconds(newTimestamp.getSeconds() + 45); // Add 45 seconds
      const docRef = await addDoc(collection(db, 'boards'), {
        title: boardTitle,
        timestamp: newTimestamp,
      });
      const newBoard = {
        id: docRef.id,
        title: boardTitle,
      };
      dispatch(addBoard(newBoard)); // Update Redux state
    } catch (error) {
      console.error('Error adding board:', error);
    }
  },
);
// deleting a board inside firebase and redux
export const removeBoard = createAsyncThunk(
  'boards/removeBoard',
  async (boardID: string, { dispatch }) => {
    try {
      await deleteDoc(doc(db, 'boards', boardID));
      await deleteDoc(doc(db, 'columns', boardID));
      await deleteDoc(doc(db, 'tasks', boardID));
      dispatch(removeBoards(boardID));
      dispatch(removeColumn(boardID));
      dispatch(removeTasks(boardID));
      console.log('board deleted successfully!');
    } catch (error) {
      console.log('board didnt get deleted cause the error is :', error);
    }
  },
);
// Export actions for use in components
export const {
  addBoard,
  setBoards,
  removeBoards,
  setLoading,
  setCurrentBoard,
} = boardSlice.actions;
export default boardSlice.reducer;
