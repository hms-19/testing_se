import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token?: string,
  role_type?: string|number
}

const initialState: AuthState = {
  token: '',
  role_type: ''
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      return action.payload; 
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;