import React, { useEffect, useState } from "react";
import "./ResetPasword.css";
import BoxText from "../utils/BoxText";
import { Light, LightBg } from "../utils/ThemeColor";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { passwordReset } from "../../action/userAction";

function ResetPassword() {
  const navigate = useNavigate();
  const { updatedPassword } = useSelector((state) => state.updatePassword);
  const { token } = useParams();
  const dispatch = useDispatch();
  const reset = ["R", "E", "S", "E", "T"];
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = { newPassword, confirmPassword };
    dispatch(passwordReset(token, info));
  };

  useEffect(() => {
    if (updatedPassword) {
      navigate("/login");
    }
  }, [updatedPassword, navigate]);
  return (
    <div
      className="resetPasswordContainer"
      style={{ backgroundColor: LightBg }}
    >
      <form className="resetPasswordBox" style={{ backgroundColor: Light }}>
        <BoxText text={reset} />
        <input
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="new password"
        />
        <input
          type="text"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
        />

        <LockOpenIcon className="lockSvg1" />
        <LockIcon className="lockSvg2" />
        <button type="submit" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
