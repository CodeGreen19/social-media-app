import React, { useEffect, useState } from "react";
import "./ForgetPassword.css";
import BoxText from "../utils/BoxText";
import { Light, LightBg } from "../utils/ThemeColor";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch, useSelector } from "react-redux";
import { PasswordForget } from "../../action/userAction";

function ForgetPassword() {
  const dispatch = useDispatch();
  const { forget: forgetPassword } = useSelector(
    (state) => state.updatePassword
  );

  const forget = ["F", "O", "R", "G", "E", "T"];

  const [email, setEmail] = useState("");
  const [forgetMessage, setForgetMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(PasswordForget(email));
  };
  useEffect(() => {
    if (forgetPassword) {
      setForgetMessage(true);
    } else {
      setForgetMessage(false);
    }
  }, [forgetPassword]);

  return (
    <div className="forgetPassContainer" style={{ backgroundColor: LightBg }}>
      {forgetMessage ? (
        <div style={{ padding: "10px", color: "tomato" }}>
          NOTE: a mail send to {email}. cleck the mail and click the link to set
          your new password...
        </div>
      ) : (
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
      )}
    </div>
  );
}
//

export default ForgetPassword;
