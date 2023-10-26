import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, selectUser } from "../../action/userAction";
import {
  followAndUnFollow,
  myFollow,
  unFollowingUsers,
  removeFollower,
  getFollowingPosts,
} from "../../action/followAction";
import { searchUsersAction } from "../../action/searchAction";
import { getMyPosts } from "../../action/postAction";
import { useNavigate } from "react-router-dom";

function UserBox({ info, category }) {
  const navigate = useNavigate();
  const {
    user: mainUser,
    selectUser: selectedUser,
    darkMode,
    mobile,
  } = useSelector((state) => state.user);
  const [unfollowBox, setUnfollowBox] = useState(false);
  const [removeFollowers, setRemoveFollowers] = useState(false);
  const [userId, setUserId] = useState(false);
  const dispatch = useDispatch();
  const handleFollow = (userId) => {
    dispatch(followAndUnFollow(userId)).then(() => {
      dispatch(loadUser());
      dispatch(searchUsersAction());
      dispatch(getFollowingPosts());
      if (mainUser) {
        if (selectedUser) {
          dispatch(myFollow(selectedUser._id));
          dispatch(unFollowingUsers(selectedUser._id));
        } else {
          dispatch(myFollow(mainUser._id));
          dispatch(unFollowingUsers(mainUser._id));
        }
      }
    });
  };

  const handleUnfollow = (userID) => {
    setUnfollowBox(true);
    setUserId(userID);
  };
  const confirmUnfollowHandler = (userID) => {
    setUnfollowBox(false);
    dispatch(followAndUnFollow(userID)).then(() => {
      dispatch(loadUser());
      dispatch(searchUsersAction());
      if (mainUser) {
        if (selectedUser) {
          dispatch(myFollow(selectedUser._id));
          dispatch(unFollowingUsers(selectedUser._id));
        } else {
          dispatch(myFollow(mainUser._id));
          dispatch(unFollowingUsers(mainUser._id));
        }
      }
    });
  };

  // remove followers user
  const handleFollowersRemove = (userId) => {
    setRemoveFollowers(true);
    setUserId(userId);
  };
  // handle selected user
  const handleSelectUser = (userId) => {
    dispatch(selectUser(userId)).then(() => {
      dispatch(getMyPosts(userId)).then(() => {
        dispatch({ type: "myPostsTrue", payload: true });
      });
    });
    if (mobile) {
      navigate("/profile");
    }
  };

  // confirm remove followers
  const confirmRmoveFollowers = (userId) => {
    dispatch(removeFollower(userId)).then(() => {
      if (mainUser) {
        if (selectedUser) {
          dispatch(myFollow(selectedUser._id));
          dispatch(unFollowingUsers(selectedUser._id));
        } else {
          dispatch(myFollow(mainUser._id));
          dispatch(unFollowingUsers(mainUser._id));
        }
      }
      dispatch(loadUser());
    });
  };

  return (
    <div
      className="userProfileMainBox"
      style={{
        borderRadius: darkMode && "5px",
        backgroundColor: darkMode && "#313131",
      }}
    >
      <div className="userProfileBox">
        <div className="imgBox" onClick={() => handleSelectUser(info._id)}>
          <img src={info.avatar.url} alt="profile" className="userProfileImg" />{" "}
        </div>
        <div className="userProfileInfo">
          <div className="name">{info.name}</div>
        </div>
      </div>
      {category === "follow" ? (
        <button
          className="userFollow"
          onClick={() => handleFollow(info._id)}
          style={
            darkMode
              ? {
                  color: "white",
                  backgroundColor: "rgb(39 39 39)",
                }
              : {}
          }
        >
          follow
        </button>
      ) : category === "followers" ? (
        <button
          className="userFollowing"
          onClick={() => handleFollowersRemove(info._id)}
          style={
            darkMode
              ? {
                  backgroundColor: "rgb(39 39 39) !important",
                }
              : {}
          }
        >
          followers
        </button>
      ) : (
        <button
          className="userFollowing"
          onClick={() => handleUnfollow(info._id)}
          style={{
            backgroundColor: darkMode && "rgb(39 39 39)",
            cursor: "pointer",
          }}
        >
          following
        </button>
      )}
      {/* for show unfollow modal */}
      {
        <ul
          className={`unfollowLists ${
            unfollowBox && userId === info._id ? "add" : ""
          }`}
        >
          <li onClick={() => confirmUnfollowHandler(info._id)}>unfollow</li>
          <li onClick={() => setUnfollowBox(false)}>cancel</li>
        </ul>
      }
      {/* for show remove followers */}
      {
        <ul
          className={`removeFollowers ${
            removeFollowers && userId === info._id ? "add" : ""
          }`}
        >
          <li onClick={() => confirmRmoveFollowers(info._id)}>remove</li>
          <li onClick={() => setRemoveFollowers(false)}>cancel</li>
        </ul>
      }
    </div>
  );
}

export default UserBox;
