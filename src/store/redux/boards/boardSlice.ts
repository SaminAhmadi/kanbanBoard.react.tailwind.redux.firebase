// Define the type for a single board
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Board {
  id: string;
  name: string;
}
// Define the initial state type
interface BoardState {
  boards: Board[];
}

const initialState: BoardState = {
  boards: [],
};

// Creating the board slice
const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
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
  },
});
// Export actions for use in components
export const { addBoard, setBoards, removeBoards } = boardSlice.actions;
export default boardSlice.reducer;
