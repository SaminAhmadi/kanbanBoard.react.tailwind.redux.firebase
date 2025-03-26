import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig.ts';

interface DarkMode {
  isDarkMode: boolean;
}
interface initializeStateProps {
  darkmode: DarkMode;
}
const initialState: initializeStateProps = {
  darkmode: { isDarkMode: false },
};
export const DarkModeSlice = createSlice({
  name: 'darkmode',
  initialState,
  reducers: {
    setDarkModeToggle: (state, action: PayloadAction<boolean>) => {
      state.darkmode.isDarkMode = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDarkMode.fulfilled, (state, action) => {
        state.darkmode.isDarkMode = action.payload;
      })
      .addCase(updateDarkModeFirebase.fulfilled, (state, action) => {
        state.darkmode.isDarkMode = action.payload;
      });
  },
});

// fetching dark mode data
export const fetchDarkMode = createAsyncThunk(
  'darkmode/fetchDarkMode',
  async (_, { rejectWithValue }) => {
    try {
      const darkModeDocRef = doc(db, 'darkmode', 'dark-mode');
      const docSnap = await getDoc(darkModeDocRef);

      if (docSnap.exists()) {
        const isDarkMode = docSnap.data().isDarkMode;
        console.log('Dark mode state fetched:', isDarkMode);

        // Apply dark mode instantly on load
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        return isDarkMode;
      } else {
        return false; // Default if Firestore has no data
      }
    } catch (error) {
      console.error('Could not fetch dark mode due to', error);
      return rejectWithValue(error);
    }
  },
);

// adding darkmode into database to handle the toggle
export const updateDarkModeFirebase = createAsyncThunk(
  'darkmode/updateDarkModeFirebase',
  async (isDark: boolean, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setDarkModeToggle(isDark));
      console.log('Updating dark mode in Firestore:', isDark);
      const darkModeDocRef = doc(db, 'darkmode', 'dark-mode');

      // Use setDoc to update Firestore, creating the document if it doesn't exist
      await setDoc(darkModeDocRef, { isDarkMode: isDark }, { merge: true });

      // Apply dark mode instantly
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return isDark;
    } catch (error) {
      console.error('Could not update field due to', error);
      return rejectWithValue(error);
    }
  },
);

export const { setDarkModeToggle } = DarkModeSlice.actions;
export default DarkModeSlice.reducer;
