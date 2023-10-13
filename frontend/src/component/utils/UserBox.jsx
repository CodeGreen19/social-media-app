import React from "react";

function UserBox({ myFollowing, unfollowing }) {
  return (
    <div className="userProfileMainBox">
      <div className="userProfileBox">
        <div className="imgBox">
          <img
            src={myFollowing.avatar.url}
            alt="profile"
            className="userProfileImg"
          />{" "}
        </div>
        <div className="userProfileInfo">
          <div className="name">{myFollowing.name}</div>
        </div>
      </div>
      {unfollowing ? (
        <button className="userFollow">follow</button>
      ) : (
        <button className="userFollowing">following</button>
      )}
    </div>
  );
}

export default UserBox;
