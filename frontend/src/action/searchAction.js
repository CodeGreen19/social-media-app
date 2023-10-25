import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//to search any existing users

export const searchUsersAction = (givenName) => async (dispatch) => {
  try {
    dispatch({
      type: "SearchUsersRequest",
    });

    const { data } = await axios.get(
      `/api/user/search?name=${givenName}`,
      config
    );

    dispatch({
      type: "SearchUsersSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "SearchUsersFailure",
      payload: error.response.data.message,
    });
  }
};
