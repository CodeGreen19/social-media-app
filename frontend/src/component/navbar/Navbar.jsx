import React, { Fragment, useEffect, useState } from "react";
import "./Navbar.css";
import mainLogo from "../../image/main-logo.png";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import UserSearch from "../utils/UserSearch";

import {
  Dark,
  DarkBg,
  ForDarkText,
  ForLightText,
  Light,
  LightBg,
} from "../utils/ThemeColor";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchUsersAction } from "../../action/searchAction";

function Navbar() {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  // mesure the screen width
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const mobile = screenWidth <= 1200 ? true : false;

  // to open the modal
  const [searchClicked, setSearchClicked] = useState(false);
  const DarkMode = false;
  // input change function
  const handleChangeInput = (e) => {
    setSearchText(e.target.value);
  };
  // handle search
  const searchUsers = () => {
    dispatch(searchUsersAction(searchText)).then(() => {});
  };

  useEffect(() => {
    if (searchText) {
      dispatch(searchUsersAction(searchText)).then(() => {});
    }
    // eslint-disable-next-line
  }, [dispatch, searchText]);

  // to find the width of the screen
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
                  <input
                    type="text"
                    value={searchText}
                    onChange={handleChangeInput}
                    onClick={() => setSearchClicked(true)}
                  />
                  <SearchIcon onClick={searchUsers} />
                  <UserSearch open={searchClicked} setOpen={setSearchClicked} />
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
