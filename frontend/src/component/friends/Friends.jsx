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
    user: mainUser,
    selectedUser,
    relation,
    darkMode,
  } = useSelector((state) => state.user);
  const {
    following,
    followers,
    unfollowingUsers: suggestedUser,
  } = useSelector((state) => state.follow);
  // open drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  // to show custion box text....
  const friends = ["F", "O", "I", "I", "O", "W", "I", "N", "G"];
  const suggested = ["F", "O", "L", "L", "0", "W"];
  const update = ["U", "P", "D", "A", "T", "E"];
  const followingArray = ["F", "O", "L", "L", "O", "W", "I", "N", "G"];
  const followerArray = ["F", "O", "L", "L", "O", "W", "E", "R"];
  const followArray = ["F", "O", "L", "L", "O", "W"];
  const to = ["T", "O"];
  const thisArray = ["T", "H", "I", "S"];
  const userArray = ["U", "S", "E", "R"];
  const you = ["Y", "O", "U"];
  const are = ["A", "R", "E"];

  const Option = {
    backgroundColor: darkMode ? Dark : Light,
    color: darkMode ? ForDarkText : ForLightText,
  };
  useEffect(() => {
    if (mainUser) {
      if (selectedUser) {
        dispatch(myFollow(selectedUser._id));
        dispatch(unFollowingUsers(selectedUser._id));
      } else {
        dispatch(myFollow(mainUser._id));
        dispatch(unFollowingUsers(mainUser._id));
      }
    }
  }, [dispatch, mainUser, selectedUser]);
  return (
    <Fragment>
      {!selectedUser || selectedUser._id === mainUser._id ? (
        <div className="friendsContainer" style={Option}>
          {following && following.length > 0 && <BoxText text={friends} />}

          {following &&
            following
              .slice(0, 3)
              .map((myFollowing) => (
                <UserBox info={myFollowing} key={myFollowing._id} />
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
            suggestedUser
              .slice(0, 6)
              .map((suggested) => (
                <UserBox
                  info={suggested}
                  key={suggested._id}
                  category={"follow"}
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
      ) : (
        <div className="friendsContainer" style={Option}>
          {relation === "follow" ? (
            <div>
              <BoxText text={followArray} />
              <BoxText text={thisArray} />
              <BoxText text={userArray} />
              <BoxText text={to} />
              <BoxText text={["G", "E", "T"]} />
              <BoxText text={update} />
            </div>
          ) : relation === "following" ? (
            <div>
              <BoxText text={you} />
              <BoxText text={are} />
              <BoxText text={followingArray} />
              <BoxText text={to} />
              <BoxText text={["T", "H", "E"]} />
              <BoxText text={userArray} />
            </div>
          ) : (
            <div>
              <BoxText text={thisArray} />
              <BoxText text={userArray} />
              <BoxText text={["I", "S"]} />
              <BoxText text={["Y", "O", "U", "R"]} />
              <BoxText text={followerArray} />
            </div>
          )}
        </div>
      )}
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
