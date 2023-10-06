import "./App.css";
import Home from "./component/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./component/login/SignUp";
import Login from "./component/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./action/userAction";
import { useEffect, useState } from "react";
import EditProfile from "./component/profile/EditProfile";
import Loading from "./component/loading/Loading";
import Alert from "./component/utils/Alert";
import ForgetPassword from "./component/login/ForgetPassword";
import ResetPassword from "./component/login/ResetPassword";
import UserProfile from "./component/profile/UserProfile";

function App() {
  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { updateLoading, updateError, updateMessage } = useSelector(
    (state) => state.updateUser
  );
  const { forgetLoading, forgetError, forgetMessage } = useSelector(
    (state) => state.updatePassword
  );

  // these state for showing custom alerts
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  // custom alert function
  const handleAlert = (text) => {
    setAlertText(text);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  // this useEffect is used to show custom alerts
  useEffect(() => {
    // error showing
    if (error) {
      handleAlert(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      handleAlert(message);
      dispatch({ type: "clearErrors" });
    }
    //  message showing
    if (updateError) {
      handleAlert(updateError);
      dispatch({ type: "clearUpdateErrors" });
    }
    if (updateMessage) {
      handleAlert(updateMessage);
      dispatch({ type: "clearUpdateMessage" });
    }
    if (forgetError) {
      handleAlert(forgetError);
      dispatch({ type: "clearForgetErrors" });
    }
    if (forgetMessage) {
      handleAlert(forgetMessage);
      dispatch({ type: "clearForgetMessage" });
    }
  }, [
    error,
    message,
    dispatch,
    updateMessage,
    updateError,
    forgetError,
    forgetMessage,
  ]);

  // this useEffect is used to load the login user
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      {loading || updateLoading || forgetLoading ? <Loading /> : ""}
      {alert && <Alert text={alertText} />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/update" element={<EditProfile />} />
        <Route path="/forget/password" element={<ForgetPassword />} />
        <Route path="/reset/password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
