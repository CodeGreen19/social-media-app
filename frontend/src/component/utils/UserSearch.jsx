import React from "react";
import "./UserSearch.css";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import UserBox from "./UserBox";
import { useSelector } from "react-redux";
import BoxText from "./BoxText";

function UserSearch({ open, setOpen }) {
  const { searchedUsers: users } = useSelector((state) => state.search);
  const results = ["R", "E", "S", "U", "L", "T", "S"];
  return (
    <div className={`userSearchContainer ${open ? "add" : ""}`}>
      <div className={`searchShowBox ${open ? "add" : ""}`}>
        <BoxText text={results} />
        {users &&
          users.map((user) => (
            <UserBox myFollowing={user} unfollowing={true} />
          ))}
        <div className="searchRemoveIcon" onClick={() => setOpen(false)}>
          <KeyboardDoubleArrowUpRoundedIcon />
        </div>
      </div>
    </div>
  );
}

export default UserSearch;
