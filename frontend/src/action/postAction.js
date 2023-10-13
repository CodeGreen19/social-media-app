import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// to register a new user

export const createPost = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: "CreatePostRequest",
    });

    const { data } = await axios.post(
      "/api/user/post/create",
      userInfo,
      config
    );

    dispatch({
      type: "CreatePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreatePostFailure",
      payload: error.response.data.message,
    });
  }
};
// delete the post
export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeletePostRequest",
    });

    const { data } = await axios.delete(
      `/api/user/post/delete/${postId}`,
      config
    );

    dispatch({
      type: "DeletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeletePostFailure",
      payload: error.response.data.message,
    });
  }
};
// to

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "MyPostRequest",
    });

    const { data } = await axios.get("/api/user/myposts");

    dispatch({
      type: "MyPostSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "MyPostFailure",
      payload: error.response.data.message,
    });
  }
};

// make like and unlike posts
export const likeAndUnlikePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: "LikeRequest",
    });

    const { data } = await axios.put(`/api/user/post/like/${postId}`);

    dispatch({
      type: "LikeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LikeFailure",
      payload: error.response.data.message,
    });
  }
};
// to create a new comment

export const commentPost = (postId, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "NewCommentRequest",
    });

    const { data } = await axios.put(
      `/api/user/post/comment/${postId}`,
      { comment },
      config
    );

    dispatch({
      type: "NewCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "NewCommentFailure",
      payload: error.response.data.message,
    });
  }
};
// to create a new comment

export const allCommentsPost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: "AllCommentsRequest",
    });

    const { data } = await axios.get(`/api/user/post/allcomment/${postId}`);

    dispatch({
      type: "AllCommentsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "AllCommentsFailure",
      payload: error.response.data.message,
    });
  }
};
// to create a new comment

export const forReplyComment = (postId, info) => async (dispatch) => {
  try {
    dispatch({
      type: "ReplyCommentRequest",
    });

    const { data } = await axios.put(
      `/api/user/post/reply/${postId}`,
      info,
      config
    );

    dispatch({
      type: "ReplyCommentSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ReplyCommentFailure",
      payload: error.response.data.message,
    });
  }
};
// to create a new comment

export const forRepliedComments = (postId, info) => async (dispatch) => {
  try {
    dispatch({
      type: "AllReplyRequest",
    });

    const { data } = await axios.put(
      `/api/user/post/replies/${postId}`,
      info,
      config
    );

    dispatch({
      type: "AllReplySuccess",
      payload: data.replies,
    });
  } catch (error) {
    dispatch({
      type: "AllReplyFailure",
      payload: error.response.data.message,
    });
  }
};
