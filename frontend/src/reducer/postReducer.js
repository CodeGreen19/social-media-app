import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

// all the post based reducers here !
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
  EditCaptionRequest: (state) => {
    state.loading = true;
  },
  EditCaptionSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  EditCaptionFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  ReportRequest: (state) => {
    state.loading = true;
  },
  ReportSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  ReportFailure: (state, action) => {
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
  ReactCommentRequest: (state) => {
    state.loading = true;
  },
  ReactCommentSuccess: (state, action) => {
    state.loading = false;
  },
  ReactCommentFailure: (state, action) => {
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
  ReplyReactRequest: (state) => {
    state.loading = true;
  },
  ReplyReactSuccess: (state) => {
    state.loading = false;
  },
  ReplyReactFailure: (state) => {
    state.loading = false;
  },
  ReplyOfRepliedRequest: (state) => {
    state.loading = true;
  },
  ReplyOfRepliedSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  ReplyOfRepliedFailure: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteReplyRequest: (state) => {
    state.loading = true;
  },
  DeleteReplySuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  DeleteReplyFailure: (state, action) => {
    state.loading = false;
    state.message = action.payload;
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
  UploadVideoRequest: (state) => {
    state.loading = false;
  },
  UploadVideoSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  UploadVideoFailure: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  myPostsTrue: (state, action) => {
    state.showMyPost = action.payload;
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

// comment reducer inside the post reducer
export const commentReducer = createReducer(initialState, {
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
  DeleteCommentRequest: (state) => {
    state.loading = true;
  },
  DeleteCommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
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
