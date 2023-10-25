import React from "react";
import "./UserSearch.css";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import UserBox from "./UserBox";
import { useSelector } from "react-redux";
import BoxText from "./BoxText";

function UserSearch({ open, setOpen }) {
  const { followimgUsers, followUsers } = useSelector((state) => state.search);
  const results = ["R", "E", "S", "U", "L", "T", "S"];
  return (
    <div className={`userSearchContainer ${open ? "add" : ""}`}>
      <div className={`searchShowBox ${open ? "add" : ""}`}>
        <BoxText text={results} />
        {followimgUsers &&
          followimgUsers.map((user) => (
            <UserBox info={user} unfollowing={true} />
          ))}
        {followUsers &&
          followUsers.map((user) => (
            <UserBox
              info={user}
              unfollowing={true}
              category={"follow"}
              key={user._id}
            />
          ))}
        <div className="searchRemoveIcon" onClick={() => setOpen(false)}>
          <KeyboardDoubleArrowUpRoundedIcon />
        </div>
      </div>
    </div>
  );
}

export default UserSearch;
