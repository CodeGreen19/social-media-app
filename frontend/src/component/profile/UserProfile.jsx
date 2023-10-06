import React, { Fragment, useState } from "react";
import "./UserProfile.css";
import { Dark, ForDarkText, ForLightText, Light } from "../utils/ThemeColor";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AddIcon from "@mui/icons-material/Add";
import PageviewIcon from "@mui/icons-material/Pageview";
import BoxText from "../utils/BoxText";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimeAgo from "../utils/TimeAgo";
function UserProfile() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const text = ["P", "R", "O", "F", "I", "L", "E"];
  const DarkMode = false;
  const handleOpen = () => setOpen(true);

  return (
    <Fragment>
      {user && (
        <div className="profileContainer">
          <div
            className="profileBox"
            style={{
              backgroundColor: DarkMode ? Dark : Light,
              color: DarkMode ? ForDarkText : ForLightText,
            }}
          >
            <BoxText text={text} />
            <div className="profileImgBox">
              <div className="profileImg">
                <img src={user.avatar.url} alt="profile" />
              </div>
              <div className="profileInfo">
                <div className="name">{user.name}</div>
                <div className="joinedOn">
                  Joined On: <TimeAgo timestamp={user.joinedOn} />
                </div>
                <div className="emailAddress">{user.email}</div>

                <button
                  className="editProfile"
                  onClick={() => navigate("/profile/update")}
                >
                  <OpenInNewIcon />
                </button>
              </div>
            </div>
            <div className="follow">
              <div className="followers">
                <span>followers </span>
                <span>{user.followers.length}</span>
                <PageviewIcon />
              </div>
              <div className="following">
                <span>following</span>
                <span>{user.following.length}</span>
                <PageviewIcon />
              </div>
              <div className="posts">
                <span>posts</span>
                <span>{user.posts.length}</span>
                <PageviewIcon />
              </div>
            </div>
            <button className="createPost" onClick={handleOpen}>
              Create
              <AddIcon />
            </button>
            <CreatePost open={open} setOpen={setOpen} />
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default UserProfile;
