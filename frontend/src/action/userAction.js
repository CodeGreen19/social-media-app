import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// to register a new user

export const registerUser = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });

    const { data } = await axios.post("/api/user/register", userInfo, config);

    dispatch({
      type: "RegisterSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error.response.data.message,
    });
  }
};
// to login a registered user
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );

    dispatch({
      type: "LoginSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};
// to login a registered user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutRequest",
    });

    const { data } = await axios.get("/api/user/logout", config);

    dispatch({
      type: "LogoutSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LogoutFailure",
      payload: error.response.data.message,
    });
  }
};

// load a login user when any page will refresh.
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("/api/user/me");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

// to update profile
export const updateUser = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateUserRequest",
    });

    const { data } = await axios.put(
      "/api/user/profile/update",
      userInfo,
      config
    );

    dispatch({
      type: "UpdateUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UpdateUserFailure",
      payload: error.response.data.message,
    });
  }
};

// forget password
export const PasswordForget = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "ForgetPassRequest",
    });

    const { data } = await axios.put(
      "/api/user/forget/password",
      { email },
      config
    );

    dispatch({
      type: "ForgetPassSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ForgetPassFailure",
      payload: error.response.data.message,
    });
  }
};
export const passwordReset = (token, info) => async (dispatch) => {
  try {
    dispatch({
      type: "ResetPassRequest",
    });

    const { data } = await axios.put(
      `/api/user/reset/password/${token}`,
      info,
      config
    );

    dispatch({
      type: "ResetPassSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ResetPassFailure",
      payload: error.response.data.message,
    });
  }
};
