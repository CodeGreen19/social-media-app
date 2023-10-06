import React, { useState } from "react";
import "./ForgetPassword.css";
import BoxText from "../utils/BoxText";
import { Light, LightBg } from "../utils/ThemeColor";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch } from "react-redux";
import { PasswordForget } from "../../action/userAction";

function ForgetPassword() {
  const dispatch = useDispatch();

  const forget = ["F", "O", "R", "G", "E", "T"];

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(PasswordForget(email));
  };

  return (
    <div className="forgetPassContainer" style={{ backgroundColor: LightBg }}>
      <form className="forgetPassBox" style={{ backgroundColor: Light }}>
        <BoxText text={forget} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <EmailIcon className="login-mailSvg" />
        <button type="submit" onClick={handleSubmit}>
          SEND MAIL
        </button>
      </form>
    </div>
  );
}
//

export default ForgetPassword;
