import React, { Fragment, useEffect, useState } from "react";
import "./Friends.css";
import { Dark, ForDarkText, ForLightText, Light } from "../utils/ThemeColor";
import BoxText from "../utils/BoxText";
import UserBox from "../utils/UserBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { myFollow, unFollowingUsers } from "../../action/followAction";
import Drawer from "../utils/Drawer";

function Friends() {
  const dispatch = useDispatch();
  const {
    following,
    followers,
    unfollowingUsers: suggestedUser,
  } = useSelector((state) => state.follow);
  const friends = ["F", "O", "I", "I", "O", "W", "I", "N", "G"];
  // open drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const suggested = ["F", "O", "L", "L", "0", "W"];
  // const suggested = ["S", "U", "G", "G", "E", "S", "T", "E", "D"];

  const DarkMode = false;
  useEffect(() => {
    dispatch(myFollow());
    dispatch(unFollowingUsers());
  }, [dispatch]);
  return (
    <Fragment>
      <div
        className="friendsContainer"
        style={{
          backgroundColor: DarkMode ? Dark : Light,
          color: DarkMode ? ForDarkText : ForLightText,
        }}
      >
        <BoxText text={friends} />
        {following &&
          following
            .slice(0, 3)
            .map((myFollowing) => (
              <UserBox myFollowing={myFollowing} key={myFollowing._id} />
            ))}
        {following && following.length > 3 ? (
          <div className="seeAll">
            <button onClick={() => setDrawerOpen(!drawerOpen)}>
              see all <KeyboardArrowDownIcon />
            </button>
          </div>
        ) : (
          ""
        )}
        <BoxText text={suggested} />
        {suggestedUser &&
          suggestedUser.map((suggested) => (
            <UserBox
              myFollowing={suggested}
              key={suggested._id}
              unfollowing={true}
            />
          ))}
        {followers && followers.length > 3 ? (
          <div className="seeAll">
            <button onClick={() => setDrawerOpen(!drawerOpen)}>
              see all <KeyboardArrowDownIcon />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {
        <Drawer
          Open={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          follow={following}
        />
      }
    </Fragment>
  );
}

export default Friends;
