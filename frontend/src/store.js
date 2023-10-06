import { configureStore } from "@reduxjs/toolkit";
import {
  UpdatePasswordReducer,
  UpdateProfileReducer,
  userReducer,
} from "./reducer/userReducer";
// import {
//   allUsersReducer,
//   postOfFollowingReducer,
//   userProfileReducer,
//   userReducer,
// } from "./Reducers/User";
// import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";

// toconfigure the store
const store = configureStore({
  reducer: {
    user: userReducer,
    updateUser: UpdateProfileReducer,
    updatePassword: UpdatePasswordReducer,
    //   postOfFollowing: postOfFollowingReducer,
    //   allUsers: allUsersReducer,
    //   like: likeReducer,
    //   myPosts: myPostsReducer,
    //   userProfile: userProfileReducer,
    //   userPosts: userPostsReducer,
  },
});

export default store;
