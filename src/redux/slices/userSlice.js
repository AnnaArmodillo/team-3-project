import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
    refreshTokens(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    signOut() {
      return { ...initState.user };
    },
  },
});

export const { setUser, refreshTokens, signOut } = userSlice.actions;

export const getUserSelector = (state) => state.user;
export const getAccessTokenSelector = (state) => state.user.accessToken;
export const getRefreshTokenSelector = (state) => state.user.refreshToken;

export const userReducer = userSlice.reducer;
