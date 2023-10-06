import React from "react";
import profile from "../../image/bala.jpeg";

function UserBox({ follow }) {
  return (
    <div className="userProfileMainBox">
      <div className="userProfileBox">
        <div className="imgBox">
          <img src={profile} alt="profile" className="userProfileImg" />{" "}
        </div>
        <div className="userProfileInfo">
          <div className="name">aman dardarwal</div>
        </div>
      </div>
      {follow ? (
        <button className="userFollowing">following</button>
      ) : (
        <button className="userFollow">follow</button>
      )}
    </div>
  );
}

export default UserBox;
