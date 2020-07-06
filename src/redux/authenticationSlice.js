import {createSlice} from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    accessToken: null,
    refreshToken: null,
    expirationDate: null,
    loading: false,
    onboarding: false,
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.loading = false;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload.refreshToken;
      state.loading = false;
    },
    setExpr(state, action) {
      state.expirationDate = action.payload.expirationDate;
      state.loading = false;
    },
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
    },
    setOnboarding(state) {
      console.log('hello');
      state.onboarding = true;
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  setExpr,
  setLoadingTrue,
  setLoadingFalse,
  setOnboarding,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
