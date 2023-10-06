import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const userReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.message = action.payload.message;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  RegisterRequest: (state) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.message = action.payload.message;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogoutUserRequest: (state) => {
    state.loading = true;
  },
  LogoutUserSuccess: (state, action) => {
    state.loading = false;
    state.user = null;
    state.message = action.payload.message;
    state.isAuthenticated = false;
  },
  LogoutUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const UpdateProfileReducer = createReducer(initialState, {
  UpdateUserRequest: (state) => {
    state.updateLoading = true;
  },
  UpdateUserSuccess: (state, action) => {
    state.updateLoading = false;
    state.updateMessage = action.payload.message;
    state.updateUser = action.payload.user;
  },
  UpdateUserFailure: (state, action) => {
    state.updateLoading = false;
    state.updateError = action.payload;
  },
  clearUpdateErrors: (state) => {
    state.updateError = null;
  },
  clearUpdateMessage: (state) => {
    state.updateMessage = null;
  },
});

// update passwrod reducer
export const UpdatePasswordReducer = createReducer(initialState, {
  ForgetPassRequest: (state) => {
    state.forgetLoading = true;
  },
  ForgetPassSuccess: (state, action) => {
    state.forgetLoading = false;
    state.forgetMessage = action.payload.message;
  },
  ForgetPassFailure: (state, action) => {
    state.forgetLoading = false;
    state.forgetError = action.payload;
  },
  ResetPassRequest: (state) => {
    state.forgetLoading = true;
  },
  ResetPassSuccess: (state, action) => {
    state.forgetLoading = false;
    state.forgetMessage = action.payload.message;
  },
  ResetPassFailure: (state, action) => {
    state.forgetLoading = false;
    state.forgetError = action.payload;
  },
  clearForgetErrors: (state) => {
    state.forgetError = null;
  },
  clearForgetMessage: (state) => {
    state.forgetMessage = null;
  },
});
