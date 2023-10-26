import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// to fetch followinga and followers

export const myFollow = (selectId) => async (dispatch) => {
  try {
    dispatch({
      type: "FollowRequest",
    });

    const { data } = await axios.post(
      "/api/user/following",
      { selectId },
      config
    );

    dispatch({
      type: "FollowSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "FollowFailure",
      payload: error.response.data.message,
    });
  }
};

// to make follow and unfollowing

export const followAndUnFollow = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "FollowUnfollowRequest",
    });

    const { data } = await axios.put(`/api/user/follow/${userId}`, config);

    dispatch({
      type: "FollowUnfollowSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "FollowUnfollowFailure",
      payload: error.response.data.message,
    });
  }
};

/// suggested them who are not following a spacific user
export const unFollowingUsers = (selectId) => async (dispatch) => {
  try {
    dispatch({
      type: "UnFollowingRequest",
    });

    const { data } = await axios.post(
      "/api/user/suggested",
      { selectId },
      config
    );

    dispatch({
      type: "UnFollowingSuccess",
      payload: data.unfollowingUsers,
    });
  } catch (error) {
    dispatch({
      type: "UnFollowingFailure",
      payload: error.response.data.message,
    });
  }
};
// to remove follower
export const removeFollower = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "RemoveFollowerRequest",
    });

    const { data } = await axios.put(`/api/user/follower/${userId}`, config);

    dispatch({
      type: "RemoveFollowerSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "RemoveFollowerFailure",
      payload: error.response.data.message,
    });
  }
};

// to get followings posts
export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetFollowingPostRequest",
    });

    const { data } = await axios.get(`/api/user/getposts`, config);

    dispatch({
      type: "GetFollowingPostSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "GetFollowingPostFailure",
      payload: error.response.data.message,
    });
  }
};
// to get suggession posts
export const someSuggessionPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "SuggessionRequest",
    });

    const { data } = await axios.get(`/api/user/newsuggested`, config);

    dispatch({
      type: "SuggessionSuccess",
      payload: data.somePosts,
    });
  } catch (error) {
    dispatch({
      type: "SuggessionFailure",
      payload: error.response.data.message,
    });
  }
};
