import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const searchReducer = createReducer(initialState, {
  SearchUsersRequest: (state) => {
    state.loading = true;
  },
  SearchUsersSuccess: (state, action) => {
    state.loading = false;
    state.followimgUsers = action.payload.followimgUsers;
    state.followUsers = action.payload.followUsers;
  },
  SearchUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
