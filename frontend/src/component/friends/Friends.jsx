import React from "react";
import "./Friends.css";
import { Dark, ForDarkText, ForLightText, Light } from "../utils/ThemeColor";
import BoxText from "../utils/BoxText";
import UserBox from "../utils/UserBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Friends() {
  const friends = ["F", "O", "I", "I", "O", "W", "I", "N", "G"];
  const suggested = ["F", "O", "L", "L", "0", "W"];
  const DarkMode = false;
  return (
    <div
      className="friendsContainer"
      style={{
        backgroundColor: DarkMode ? Dark : Light,
        color: DarkMode ? ForDarkText : ForLightText,
      }}
    >
      <BoxText text={friends} />
      <UserBox follow={true} />
      <UserBox follow={true} />
      <UserBox follow={true} />
      <div className="seeAll">
        <button>
          see all <KeyboardArrowDownIcon />
        </button>
      </div>
      <BoxText text={suggested} />
      <UserBox follow={false} />
      <UserBox follow={false} />
      <UserBox follow={false} />
      <UserBox follow={false} />
      <UserBox follow={false} />
      <div className="seeAll">
        <button>
          see all <KeyboardArrowDownIcon />
        </button>
      </div>
    </div>
  );
}

export default Friends;
