import React, { useEffect, useState } from "react";
import "./Login.css";
import BoxText from "../utils/BoxText";
import { Light, LightBg } from "../utils/ThemeColor";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../action/userAction";

function Login() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const login = ["L", "O", "G", "I", "N"];
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  // handle guest user

  const handleGuestUser = async (e) => {
    e.preventDefault();
    setEmail("veronica@gmail.com");
    setPassword("veronica123");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="loginCotainer" style={{ backgroundColor: LightBg }}>
      <form className="loginBox" style={{ backgroundColor: Light }}>
        <BoxText text={login} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <EmailIcon className="login-mailSvg" />
        <HttpsIcon className="login-passwordSvg" />
        <span
          onClick={() => navigate("/forget/password")}
          style={{
            alignSelf: "flex-end",
            fontSize: "0.7rem",
            color: "red",
            margin: "5px 0",
            cursor: "pointer",
          }}
        >
          Forgot Password ?
        </span>
        <button onClick={handleSubmit}>Sing In</button>
        <div className="guestLoginBox">
          <button onClick={handleGuestUser}>Guest User Credentials</button>
        </div>
        <div style={{ fontSize: "0.7rem" }}>
          Don't hava a account ?
          <span
            className="createAccount"
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer" }}
          >
            Create Account
          </span>{" "}
        </div>
      </form>
    </div>
  );
}
//

export default Login;
