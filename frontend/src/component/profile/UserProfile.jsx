import React, { Fragment, useEffect, useState } from "react";
import "./UserProfile.css";
import { Dark, ForDarkText, ForLightText, Light } from "../utils/ThemeColor";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import AddIcon from "@mui/icons-material/Add";
// import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import BoxText from "../utils/BoxText";
import CreatePost from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimeAgo from "../utils/TimeAgo";
import { logoutUser } from "../../action/userAction";
import Drawer from "../utils/Drawer";
import { myFollow } from "../../action/followAction";
import UserBox from "../utils/UserBox";
import { getMyPosts } from "../../action/postAction";
// import Navbar from "../navbar/Navbar";
function UserProfile() {
  const {
    user: mainUser,
    selectedUser,
    relation,
    darkMode,
  } = useSelector((state) => state.user);
  const { following, followers } = useSelector((state) => state.follow);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const text = ["P", "R", "O", "F", "I", "L", "E"];
  const DarkMode = false;
  const handleOpen = () => setOpen(true);
  const logout = ["L", "O", "G", "O", "U", "T"];

  const user = selectedUser ? selectedUser : mainUser;
  // open drawer

  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  const Option = {
    backgroundColor: darkMode ? Dark : Light,
    color: darkMode ? ForDarkText : ForLightText,
  };
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
    navigate("/login");
  };
  useEffect(() => {
    if (mainUser) {
      if (selectedUser) {
        dispatch(myFollow(selectedUser._id));
      } else {
        dispatch(myFollow(mainUser._id));
      }
    }
  }, [dispatch, mainUser, selectedUser]);

  return (
    <Fragment>
      {user && mainUser && (
        <div className={`profileContainer ${darkMode && "darkMode"}`}>
          <div
            className="profileBox"
            style={{
              backgroundColor: darkMode ? Dark : Light,
              color: darkMode ? ForDarkText : ForLightText,
              height: mainUser._id === user._id ? "300px" : "unset",
            }}
          >
            <BoxText text={text} />
            <div
              className="profileImgBox"
              style={{ backgroundColor: darkMode && "rgb(34 34 34)" }}
            >
              <div className="profileImg">
                <img src={user.avatar.url} alt="profile" />
              </div>
              <div className="profileInfo">
                <div className="name">{user.name}</div>
                <div className="joinedOn">
                  Joined On: <TimeAgo timestamp={user.joinedOn} />
                </div>
                <div className="emailAddress">{user.email}</div>
                {mainUser._id === user._id && (
                  <button
                    className="editProfile"
                    onClick={() => navigate("/profile/update")}
                  >
                    <EditCalendarOutlinedIcon />
                  </button>
                )}
              </div>
            </div>
            <div className="follow">
              <div className="followers">
                <span>followers </span>
                <span>{user.followers?.length}</span>
                <OpenInNewOutlinedIcon
                  onClick={() => handleFolloweShow("followers")}
                />
              </div>
              <div className="following">
                <span>following</span>
                <span>{user.following?.length}</span>
                <OpenInNewOutlinedIcon
                  onClick={() => handleFolloweShow("following")}
                />
              </div>
              <div className="posts">
                <span>posts</span>
                <span>{user.posts.length}</span>
                <OpenInNewOutlinedIcon
                  onClick={() => {
                    dispatch(getMyPosts(user._id));
                    dispatch({ type: "myPostsTrue", payload: true });
                  }}
                />
              </div>
            </div>
            {mainUser._id === user._id && (
              <button className="createPost" onClick={handleOpen}>
                Create
                <AddIcon />
              </button>
            )}
            <CreatePost open={open} setOpen={setOpen} />
          </div>
          {mainUser._id === user._id ? (
            <div className="logoutBox" style={Option}>
              <BoxText text={logout} />
              <LogoutIcon onClick={handleLogout} />
            </div>
          ) : (
            selectedUser && (
              <div className="relationUser">
                {" "}
                <UserBox info={selectedUser} category={relation} />{" "}
              </div>
            )
          )}
        </div>
      )}
      {
        <Drawer
          Open={followersOpen}
          setDrawerOpen={setFollowersOpen}
          follow={followers}
          category={"followers"}
        />
      }
      {
        <Drawer
          Open={followingOpen}
          setDrawerOpen={setFollowingOpen}
          follow={following}
          category={"following"}
        />
      }
    </Fragment>
  );
}

export default UserProfile;
