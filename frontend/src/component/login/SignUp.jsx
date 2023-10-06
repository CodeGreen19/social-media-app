import React, { useState } from "react";
import "./Signup.css";
import BoxText from "../utils/BoxText";
import { Light, LightBg } from "../utils/ThemeColor";
import EmailIcon from "@mui/icons-material/Email";
import PinIcon from "@mui/icons-material/Pin";
import HttpsIcon from "@mui/icons-material/Https";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../action/userAction";
import { useDispatch } from "react-redux";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const signup = ["S", "I", "G", "N", "U", "P"];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // to make the file visible
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // submit the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      name,
      email,
      password,
      confirmPassword,
      selectedImage,
    };
    dispatch(registerUser(userInfo));
  };

  return (
    <div className="signupContainer" style={{ backgroundColor: LightBg }}>
      <form className="signupBox" style={{ backgroundColor: Light }}>
        <BoxText text={signup} />
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="fileUpload"
        />
        {selectedImage && (
          <div className="preview-image">
            <img src={selectedImage} alt="profilePreview" />
          </div>
        )}
        <span className="addProfie"> add profile </span>

        <CoPresentIcon className="coPresentIcon" />
        <EmailIcon className="mailSvg" />
        <HttpsIcon className="passwordSvg" />
        <PinIcon className="pinIcon" />
        <ImageRoundedIcon className="imageRoundedIcon" />
        <button onClick={handleSubmit} type="submit">
          REGISTER
        </button>
        <div style={{ fontSize: "0.7rem" }}>
          Already Have an Account ?
          <span className="createAccount" onClick={() => navigate("/login")}>
            Login
          </span>{" "}
        </div>
      </form>
    </div>
  );
}
//

export default SignUp;
