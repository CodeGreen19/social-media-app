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

  LogoutRequest: (state) => {
    state.loading = true;
  },
  LogoutSuccess: (state, action) => {
    state.loading = false;
    state.user = null;
    state.message = action.payload.message;
    state.isAuthenticated = false;
  },
  LogoutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },
  SelectUserRequest: (state) => {
    state.loading = true;
  },
  SelectUserSuccess: (state, action) => {
    state.loading = false;
    state.selectedUser = action.payload.selectedUser;
    state.relation = action.payload.relation;
  },
  SelectUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  mobileDevice: (state, action) => {
    state.mobile = action.payload;
  },
  toggleDarkMode: (state, action) => {
    state.darkMode = action.payload;
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
    state.loading = true;
  },
  UpdateUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.updateUser = action.payload.user;
  },
  UpdateUserFailure: (state, action) => {
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

// update passwrod reducer
export const UpdatePasswordReducer = createReducer(initialState, {
  ForgetPassRequest: (state) => {
    state.loading = true;
    state.forget = false;
  },
  ForgetPassSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.forget = true;
  },
  ForgetPassFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.forget = false;
  },
  ResetPassRequest: (state) => {
    state.loading = true;
    state.updatedPassword = false;
  },
  ResetPassSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.updatedPassword = true;
  },
  ResetPassFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.updatedPassword = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
