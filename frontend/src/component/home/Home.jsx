import React, { Fragment, useEffect, useState } from "react";
import Friends from "../friends/Friends";
import Posts from "../posts/Posts";
import UserProfile from "../profile/UserProfile";
import "./Home.css";
import Navbar from "../navbar/Navbar";
import { DarkBg, LightBg } from "../utils/ThemeColor";
function Home() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const DarkMode = false;
  const mobile = screenWidth <= 1200 ? true : false;

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Fragment>
      <Navbar />
      <div
        className="home"
        style={{ backgroundColor: DarkMode ? DarkBg : LightBg }}
      >
        {!mobile && <UserProfile />}

        <Posts />
        {!mobile && <Friends />}
      </div>
    </Fragment>
  );
}

export default Home;
