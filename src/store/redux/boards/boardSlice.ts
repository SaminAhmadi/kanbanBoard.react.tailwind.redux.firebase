// Define the type for a single board
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig.js';

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
  const boardsCollection = collection(db, 'boards');
  const boardDocuments = await getDocs(boardsCollection);
  const boardList: Board[] = boardDocuments.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Board[];
  dispatch(boardSlice.actions.setBoards(boardList));
  dispatch(boardSlice.actions.setLoading(false));
};
// Export actions for use in components
export const {
  addBoard,
  setBoards,
  removeBoards,
  setLoading,
  setCurrentBoard,
} = boardSlice.actions;
export default boardSlice.reducer;
