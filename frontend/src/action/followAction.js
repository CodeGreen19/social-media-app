import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// to fetch followinga and followers

export const myFollow = () => async (dispatch) => {
  try {
    dispatch({
      type: "FollowRequest",
    });

    const { data } = await axios.get("/api/user/following", config);

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

export const unFollowingUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "UnFollowingRequest",
    });

    const { data } = await axios.get("/api/user/suggested", config);

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
// to
