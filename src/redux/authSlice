import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState} from "../types/Auth";
import {User} from "../types/User"
const initialState: AuthState = {
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
