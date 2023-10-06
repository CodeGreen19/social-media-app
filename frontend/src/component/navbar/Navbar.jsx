import React, { Fragment, useEffect, useState } from "react";
import "./Navbar.css";
import mainLogo from "../../image/main-logo.png";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import {
  Dark,
  DarkBg,
  ForDarkText,
  ForLightText,
  Light,
  LightBg,
} from "../utils/ThemeColor";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
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
      {user && (
        <div
          className="navbarContainer"
          style={{ backgroundColor: DarkMode ? DarkBg : LightBg }}
        >
          {mobile ? (
            <div
              className="mobileNavbar"
              style={{
                backgroundColor: DarkMode ? Dark : Light,
                color: DarkMode ? ForDarkText : ForLightText,
              }}
            >
              <h2 className="logo">
                <div>
                  <img src={mainLogo} alt="mainlogo" />
                </div>
                hareSpace
              </h2>
              <SearchIcon />
              <DarkModeIcon />
              <NotificationsIcon />
              <div
                className="mobileProfile"
                onClick={() => navigate("/profile")}
              >
                <img src={user.avatar.url} alt="userProfile" />
              </div>
            </div>
          ) : (
            <div
              className="navbar"
              style={{
                backgroundColor: DarkMode ? Dark : Light,
                color: DarkMode ? ForDarkText : ForLightText,
              }}
            >
              <div>
                <h2 className="logo">
                  <div>
                    <img src={mainLogo} alt="mainlogo" />
                  </div>
                  hareSpace
                </h2>
                <div className="searchBox">
                  <input type="text" />
                  <SearchIcon />
                </div>
                <DarkModeIcon />
              </div>
              <div className="menuIcons">
                <NotificationsIcon />
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
}

export default Navbar;
