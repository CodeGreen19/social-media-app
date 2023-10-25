import React, { Fragment, useEffect, useState } from "react";

import "./Navbar.css";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
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
import { selectUser } from "../../action/userAction";
import {
  getFollowingPosts,
  myFollow,
  unFollowingUsers,
} from "../../action/followAction";
import BoxText from "../utils/BoxText";
import { getMyPosts } from "../../action/postAction";

function Navbar() {
  const { user, selectedUser, mobile, darkMode } = useSelector(
    (state) => state.user
  );
  const Option = {
    backgroundColor: darkMode ? Dark : Light,
    color: darkMode ? ForDarkText : ForLightText,
  };
  const mainBackground = {
    backgroundColor: darkMode ? DarkBg : LightBg,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  // mesure the screen width
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const mobileDevice = screenWidth <= 1200 ? true : false;

  // to open the modal
  const [searchClicked, setSearchClicked] = useState(false);
  // input change function
  const handleChangeInput = (e) => {
    setSearchText(e.target.value);
  };
  // handle search
  const searchUsers = () => {
    dispatch(searchUsersAction(searchText));
  };
  // handle selected user
  const handleSelectUser = (userId) => {
    dispatch(selectUser(userId)).then(() => {
      dispatch(myFollow(userId));
      dispatch(unFollowingUsers(userId));
      dispatch({ type: "myPostsTrue", payload: false });
    });
  };
  // toggle darkMOde
  const toggleDarkMode = () => {
    if (darkMode) {
      dispatch({ type: "toggleDarkMode", payload: false });
    } else {
      dispatch({ type: "toggleDarkMode", payload: true });
    }
  };
  /// hanlde mobile home
  const handleMobileHome = () => {
    dispatch(getFollowingPosts()).then(() => {
      dispatch({ type: "myPostsTrue", payload: false });
      navigate("/");
    });
  };
  /// hanlde mobile home
  const handleMobileProfile = () => {
    dispatch(getMyPosts(user._id)).then(() => {
      dispatch({ type: "myPostsTrue", payload: true });
      navigate("/profile");
    });
  };

  useEffect(() => {
    if (searchText) {
      dispatch(searchUsersAction(searchText));
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
  // to find the width of the screen
  useEffect(() => {
    if (mobileDevice) {
      dispatch({ type: "mobileDevice", payload: true });
    } else {
      dispatch({ type: "mobileDevice", payload: false });
    }
  }, [mobileDevice, dispatch]);

  return (
    <Fragment>
      {user && (
        <div
          className={`navbarContainer ${darkMode && "darkMode"}`}
          style={mainBackground}
        >
          {mobile ? (
            <div className="mobileNavbar" style={mainBackground}>
              <h2
                className="logo"
                onClick={handleMobileHome}
                style={{ color: darkMode && Light }}
              >
                <BoxText text={["S"]} />
                hareSpace
              </h2>
              <div className="options">
                <SearchIcon />
                {darkMode ? (
                  <WbSunnyOutlinedIcon onClick={toggleDarkMode} />
                ) : (
                  <DarkModeOutlinedIcon onClick={toggleDarkMode} />
                )}
                <NotificationsOutlinedIcon />
                <div className="mobileProfile" onClick={handleMobileProfile}>
                  <img src={user.avatar.url} alt="userProfile" />
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar" style={Option}>
              <div>
                {selectedUser && selectedUser._id !== user._id && (
                  <div
                    className="myProfile"
                    onClick={() => handleSelectUser(user._id)}
                  >
                    <img src={user.avatar.url} alt="" />
                  </div>
                )}
                <h2
                  className="logo"
                  onClick={() => handleSelectUser(user._id)}
                  style={{ color: darkMode && Light }}
                >
                  <BoxText text={["S"]} />
                  hareSpace
                </h2>
                <div className="searchBox">
                  <input
                    type="text"
                    value={searchText}
                    placeholder="search"
                    onChange={handleChangeInput}
                    onClick={() => setSearchClicked(true)}
                  />
                  <SearchIcon onClick={searchUsers} />
                  <UserSearch open={searchClicked} setOpen={setSearchClicked} />
                </div>
              </div>
              <div className="menuIcons">
                <span>
                  0 notification
                  <NotificationsOutlinedIcon />
                </span>
                <span onClick={toggleDarkMode}>
                  {darkMode ? (
                    <WbSunnyOutlinedIcon />
                  ) : (
                    <DarkModeOutlinedIcon />
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
}

export default Navbar;
