import React, { Fragment, useEffect } from "react";
// import "./MobileProfile.css";

import UserProfile from "./UserProfile";
import Posts from "../posts/Posts";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../../action/postAction";
import { useNavigate } from "react-router-dom";
import { DarkBg } from "../utils/ThemeColor";

function MobileProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, mobile, darkMode } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(getMyPosts(user._id));
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (mobile !== undefined) {
      if (!mobile) {
        navigate("/notfound");
      }
    }
  }, [mobile, navigate]);
  return (
    <Fragment>
      <Navbar />
      <div
        className="mobileProfilePage"
        style={{ backgroundColor: darkMode && DarkBg }}
      >
        <UserProfile />
        <Posts />
      </div>
    </Fragment>
  );
}

export default MobileProfile;
