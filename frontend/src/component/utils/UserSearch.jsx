import React from "react";
import "./UserSearch.css";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import UserBox from "./UserBox";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import BoxText from "./BoxText";

function UserSearch({ open, setOpen, searchText, handleChangeInput }) {
  const { followimgUsers, followUsers } = useSelector((state) => state.search);
  const { mobile, darkMode } = useSelector((state) => state.user);
  const results = ["R", "E", "S", "U", "L", "T", "S"];
  return (
    <div
      className={`userSearchContainer ${open ? "add" : ""} ${
        darkMode && "darkMode"
      }`}
    >
      <div className={`searchShowBox ${open ? "add" : ""}`}>
        {mobile ? (
          <div className="mobileSearchBox">
            <input
              type="text"
              value={searchText}
              placeholder="search"
              onChange={handleChangeInput}
              className="mobileSearchInput"
            />
            <SearchIcon />
          </div>
        ) : (
          <BoxText text={results} />
        )}
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
