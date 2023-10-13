import React, { Fragment, useEffect, useState } from "react";
import "./UserProfile.css";
import { Dark, ForDarkText, ForLightText, Light } from "../utils/ThemeColor";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AddIcon from "@mui/icons-material/Add";
import PageviewIcon from "@mui/icons-material/Pageview";
import LogoutIcon from "@mui/icons-material/Logout";
import BoxText from "../utils/BoxText";
import CreatePost from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimeAgo from "../utils/TimeAgo";
import { logoutUser } from "../../action/userAction";
import Drawer from "../utils/Drawer";
import { myFollow } from "../../action/followAction";
function UserProfile() {
  const { user } = useSelector((state) => state.user);
  const { following, followers } = useSelector((state) => state.follow);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const text = ["P", "R", "O", "F", "I", "L", "E"];
  const DarkMode = false;
  const handleOpen = () => setOpen(true);
  const logout = ["L", "O", "G", "O", "U", "T"];

  // open drawer

  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  // handle following and followers show
  const handleFolloweShow = (e) => {
    if (e === "followers") {
      setFollowersOpen(true);
      setFollowingOpen(false);
    } else {
      setFollowingOpen(true);
      setFollowersOpen(false);
    }
  };
  // logout handler
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(myFollow());
  }, [dispatch]);

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
                <PageviewIcon onClick={() => handleFolloweShow("followers")} />
              </div>
              <div className="following">
                <span>following</span>
                <span>{user.following.length}</span>
                <PageviewIcon onClick={() => handleFolloweShow("following")} />
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
          <div className="logoutBox" style={{ backgroundColor: Light }}>
            <BoxText text={logout} />
            <LogoutIcon onClick={handleLogout} />
          </div>
        </div>
      )}
      {
        <Drawer
          Open={followersOpen}
          setDrawerOpen={setFollowersOpen}
          follow={followers}
        />
      }
      {
        <Drawer
          Open={followingOpen}
          setDrawerOpen={setFollowingOpen}
          follow={following}
        />
      }
    </Fragment>
  );
}

export default UserProfile;
