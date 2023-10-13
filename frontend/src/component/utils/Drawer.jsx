import React from "react";
import "./Drawer.css";
import UserBox from "./UserBox";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";

function Drawer({ Open, setDrawerOpen, follow }) {
  return (
    <div className={`customDrawerContainer ${Open && "add"}`}>
      <div className={`drawerBox ${Open && "add"}`}>
        <div className="searchFollow">
          <PersonSearchIcon />
          <input type="text" placeholder="search" />
        </div>
        {follow &&
          follow.map((myFollow) => (
            <UserBox myFollowing={myFollow} key={myFollow._id} />
          ))}
        <div className="crossDrawer" onClick={() => setDrawerOpen(false)}>
          <KeyboardDoubleArrowRightRoundedIcon />
        </div>
      </div>
    </div>
  );
}

export default Drawer;
