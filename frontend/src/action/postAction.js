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

// report posts
export const reportPost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: "ReportRequest",
    });

    const { data } = await axios.put(`/api/user/post/report/${postId}`, config);

    dispatch({
      type: "ReportSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ReportFailure",
      payload: error.response.data.message,
    });
  }
};

// delete the post
export const editCaptionPost = (info) => async (dispatch) => {
  try {
    dispatch({
      type: "EditCaptionRequest",
    });

    const { data } = await axios.post(`/api/user/post/update`, info, config);

    dispatch({
      type: "EditCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "EditCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

// get a specific user all posts

export const getMyPosts = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "MyPostRequest",
    });

    const { data } = await axios.post("/api/user/myposts", { userId }, config);

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
// delete comments from a specific post
export const deletePostComment = (postId, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteCommentRequest",
    });

    const { data } = await axios.put(
      `/api/user/post/comment/delete/${postId}`,
      { commentId },
      config
    );

    dispatch({
      type: "DeleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

// react a specific comment

export const reactComment = (postId, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "ReactCommentRequest",
    });

    const { data } = await axios.put(
      `/api/user/post/react/comment/${postId}`,
      { commentId },
      config
    );

    dispatch({
      type: "ReactCommentSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ReactCommentFailure",
      payload: error.response.data.message,
    });
  }
};
// get alll the comments of a specific posts

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

// reply comment

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
// to make react of a replied comment

export const forReplyReactComment = (postId, info) => async (dispatch) => {
  try {
    dispatch({
      type: "ReplyReactRequest",
    });

    const { data } = await axios.put(
      `/api/user/post/react/reply/${postId}`,
      info,
      config
    );

    dispatch({
      type: "ReplyReactSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ReplyReactFailure",
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

/// reply of replied comment

export const ReplyOfRepliedComment = (postId, info) => async (dispatch) => {
  try {
    dispatch({
      type: "ReplyOfRepliedRequest",
    });

    const { data } = await axios.put(
      `/api/user/post/Replied/${postId}`,
      info,
      config
    );

    dispatch({
      type: "ReplyOfRepliedSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ReplyOfRepliedFailure",
      payload: error.response.data.message,
    });
  }
};

// delete replied comment

export const deleteRepliedComment = (postId, info) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteReplyRequest",
    });

    const { data } = await axios.put(
      `/api/user/post/reply/delete/${postId}`,
      info,
      config
    );

    dispatch({
      type: "DeleteReplySuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DeleteReplyFailure",
      payload: error.response.data.message,
    });
  }
};

// uplaoad a video
export const uploadVideoAction = (info) => async (dispatch) => {
  try {
    dispatch({
      type: "UploadVideoRequest",
    });

    const { data } = await axios.post(`/api/user/video/upload`, info, config);

    dispatch({
      type: "UploadVideoSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UploadVideoFailure",
      payload: error.response.data.message,
    });
  }
};
