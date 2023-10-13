import React, { Fragment, useEffect, useRef, useState } from "react";
import { LightBg } from "../utils/ThemeColor";
import BoxText from "../utils/BoxText";
import "./EditProfile.css";
import { useDispatch, useSelector } from "react-redux";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import EmailIcon from "@mui/icons-material/Email";
import { Light } from "../utils/ThemeColor";
import { updateUser } from "../../action/userAction";

function EditProfile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [changePass, setChangePass] = useState(false);

  // for custom text
  const editText = ["E", "D", "I", "T"];
  const editProfile = ["P", "R", "O", "F", "I", "L", "E"];

  const fileInputRef = useRef();
  // handle submission
  const handleUpdate = () => {
    const updateInfo = {
      name,
      email,
      password,
      newPassword,
      confirmPassword,
      profileImg,
    };
    dispatch(updateUser(updateInfo));
  };
  // handle button to change image
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // handle image change
  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setProfileImg(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // set existing profile information
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfileImg(user.avatar.url);
    }
  }, [user]);
  return (
    <Fragment>
      {user && (
        <div
          className="editProfileContainer"
          style={{ backgroundColor: LightBg }}
        >
          <div className="editProfileBox" style={{ backgroundColor: Light }}>
            <div className="boxTextBox">
              <BoxText text={editText} />
              <BoxText text={editProfile} />
            </div>
            <div className="editProfileImgBox">
              <img src={profileImg} alt="profileImg" />
              <CameraAltRoundedIcon
                onClick={handleButtonClick}
                sx={{ cursor: "pointer" }}
              />
              {/* upload image */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleChangeImage}
                  hidden
                />
              </div>
              {/* upload image */}
            </div>
            <span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <AccountBoxIcon />
            </span>
            <span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <EmailIcon />
            </span>
            <span
              onClick={() => setChangePass(!changePass)}
              style={{
                textAlign: "right",
                fontSize: "0.8rem",
                color: "tomato",
                margin: "5px 0",
              }}
            >
              change password ?
            </span>
            {changePass ? (
              <span>
                <span>
                  <input
                    type="text"
                    value={password}
                    placeholder="old  password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <LockOpenIcon />
                </span>
                <span>
                  <input
                    type="text"
                    value={newPassword}
                    placeholder="new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <LockIcon />
                </span>
                <span>
                  <input
                    type="text"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <PhonelinkLockIcon />
                </span>
              </span>
            ) : (
              ""
            )}
            <button className="profileUpdate" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default EditProfile;
