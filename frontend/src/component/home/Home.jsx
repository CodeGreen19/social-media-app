import React, { Fragment, useEffect, useState } from "react";
import Friends from "../friends/Friends";
import Posts from "../posts/Posts";
import UserProfile from "../profile/UserProfile";
import "./Home.css";
import Navbar from "../navbar/Navbar";
import { DarkBg, LightBg } from "../utils/ThemeColor";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, darkMode } = useSelector((state) => state.user);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const mobile = screenWidth <= 1200 ? true : false;

  // to masure the screen size and update
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // redirect to login if the user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Fragment>
      <Navbar />
      <div
        className="home"
        style={{ backgroundColor: darkMode ? DarkBg : LightBg }}
      >
        {!mobile && <UserProfile />}

        <Posts />
        {!mobile && <Friends />}
      </div>
    </Fragment>
  );
}

export default Home;
