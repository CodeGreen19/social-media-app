import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const followReducer = createReducer(initialState, {
  FollowRequest: (state) => {
    state.loading = true;
  },
  FollowSuccess: (state, action) => {
    state.loading = false;
    state.following = action.payload.following;
    state.followers = action.payload.followers;
  },
  FollowFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UnFollowingRequest: (state) => {
    state.loading = true;
  },
  UnFollowingSuccess: (state, action) => {
    state.loading = false;
    state.unfollowingUsers = action.payload;
  },
  UnFollowingFailure: (state, action) => {
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
