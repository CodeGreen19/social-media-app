import { configureStore } from "@reduxjs/toolkit";
import {
  UpdatePasswordReducer,
  UpdateProfileReducer,
  userReducer,
} from "./reducer/userReducer";
import {
  LikeReducer,
  commentReducer,
  postReducer,
} from "./reducer/postReducer";
import { followReducer } from "./reducer/followReducer";
import { searchReducer } from "./reducer/searchReducer";

// toconfigure the store
const store = configureStore({
  reducer: {
    user: userReducer,
    updateUser: UpdateProfileReducer,
    updatePassword: UpdatePasswordReducer,
    post: postReducer,
    follow: followReducer,
    react: LikeReducer,
    comments: commentReducer,
    search: searchReducer,
  },
});

export default store;
