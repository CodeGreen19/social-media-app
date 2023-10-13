import "./App.css";
import Home from "./component/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./component/login/SignUp";
import Login from "./component/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./action/userAction";
import { useEffect } from "react";
import EditProfile from "./component/profile/EditProfile";
import ForgetPassword from "./component/login/ForgetPassword";
import ResetPassword from "./component/login/ResetPassword";
import UserProfile from "./component/profile/UserProfile";
import AlertMessage from "./component/utils/AlertMessage";
import CommentShow from "./component/posts/CommentShow";
import SmallLoading from "./component/loading/SmallLoading";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  // this useEffect is used to load the login user
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <AlertMessage />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/update" element={<EditProfile />} />
        <Route path="/forget/password" element={<ForgetPassword />} />
        <Route path="/reset/password/:token" element={<ResetPassword />} />
        <Route path="/comments" element={<CommentShow />} />
        <Route path="/smallLoading" element={<SmallLoading />} />
      </Routes>
    </Router>
  );
}

export default App;
