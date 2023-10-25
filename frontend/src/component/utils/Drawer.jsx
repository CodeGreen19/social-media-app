import React, { useState } from "react";
import "./Drawer.css";
import UserBox from "./UserBox";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import { useSelector } from "react-redux";
import { Dark, ForDarkText, ForLightText, Light } from "./ThemeColor";

function Drawer({ Open, setDrawerOpen, follow, category }) {
  const { darkMode } = useSelector((state) => state.user);
  const [followersText, setFollowerText] = useState("");
  const [followingText, setFollowingText] = useState("");
  const Option = {
    backgroundColor: darkMode ? Dark : Light,
    color: darkMode ? ForDarkText : ForLightText,
  };
  return (
    <div
      className={`customDrawerContainer ${Open && "add"} ${
        darkMode && "darkMode"
      }`}
    >
      <div className={`drawerBox ${Open && "add"}`} style={Option}>
        <div
          className="searchFollow"
          style={{ backgroundColor: darkMode && "#121212" }}
        >
          <PersonSearchIcon style={{ color: darkMode && "white" }} />
          {category === "followers" ? (
            <input
              type="text"
              placeholder="search"
              value={followersText}
              onChange={(e) => setFollowerText(e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder="search"
              value={followingText}
              onChange={(e) => setFollowingText(e.target.value)}
            />
          )}
        </div>
        {follow &&
          follow.map((myFollow) => (
            <UserBox info={myFollow} key={myFollow._id} category={category} />
          ))}
        <div className="crossDrawer" onClick={() => setDrawerOpen(false)}>
          <KeyboardDoubleArrowRightRoundedIcon />
        </div>
      </div>
    </div>
  );
}

export default Drawer;
