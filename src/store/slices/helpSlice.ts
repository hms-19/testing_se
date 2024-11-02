import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface HelpSliceState {
  isLoading: boolean;
  data: [];
  error: Error | null;
}

const initialState: HelpSliceState = {
  isLoading: false,
  data: [],
  error: null,
};

export const helpSlice = createSlice({
  name: 'helpData',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setHelpDatas: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setIsLoading, setHelpDatas } = helpSlice.actions;

export default helpSlice.reducer;
