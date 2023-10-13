import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const postReducer = createReducer(initialState, {
  CreatePostRequest: (state) => {
    state.loading = true;
  },
  CreatePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreatePostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  DeletePostRequest: (state) => {
    state.loading = true;
  },
  DeletePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeletePostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  MyPostRequest: (state) => {
    state.loading = true;
  },
  MyPostSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload.posts;
  },
  MyPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  NewCommentRequest: (state) => {
    state.loading = true;
  },
  NewCommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  NewCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  ReplyCommentRequest: (state) => {
    state.loading = true;
  },
  ReplyCommentSuccess: (state) => {
    state.loading = false;
  },
  ReplyCommentFailure: (state) => {
    state.loading = false;
  },
  AllReplyRequest: (state) => {
    state.loading = true;
  },
  AllReplySuccess: (state, action) => {
    state.loading = false;
    state.replyCommentsInfo = action.payload;
  },
  AllReplyFailure: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
export const LikeReducer = createReducer(initialState, {
  LikeRequest: (state) => {
    state.loading = true;
  },
  LikeSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  LikeFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
export const commentReducer = createReducer(initialState, {
  AllCommentsRequest: (state) => {
    state.loading = true;
  },
  AllCommentsSuccess: (state, action) => {
    state.loading = false;
    state.comments = action.payload.post.comments;
  },
  AllCommentsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  OpenCommentModal: (state, action) => {
    state.modalOpen = action.payload;
  },
  CloseCommentModal: (state, action) => {
    state.modalOpen = action.payload;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
