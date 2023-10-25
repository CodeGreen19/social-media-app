import React, { Fragment, useEffect } from "react";
// import "./MobileProfile.css";

import UserProfile from "./UserProfile";
import Posts from "../posts/Posts";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../../action/postAction";
import { useNavigate } from "react-router-dom";

function MobileProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, mobile } = useSelector((state) => state.user);

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
      <div className="mobileProfilePage">
        <UserProfile />
        <Posts />
      </div>
    </Fragment>
  );
}

export default MobileProfile;
