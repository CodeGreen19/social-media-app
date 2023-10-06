import React, { useState } from "react";
import "./Posts.css";
import { Dark, ForDarkText, ForLightText, Light } from "../utils/ThemeColor";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmsIcon from "@mui/icons-material/Sms";
import profile from "../../image/aman.jpg";
import Text from "../utils/Text";

function Posts() {
  const [love, setLove] = useState(false);
  const picture =
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZGl2ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";
  const picture2 =
    "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFsZGl2ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";

  const text =
    "The component will initially render the first 100 characters of the text, with a see morebutton. When the user clicks the button, the full text will be rendered. The user can then click the see less button to hide the full text againYou can customize the component to suit your needs, such as changing the number of characters that are initially shown, or the text of the buttons. You can also add additional features, such as an animation when the text is toggled";
  const DarkMode = false;
  const Option = {
    backgroundColor: DarkMode ? Dark : Light,
    color: DarkMode ? ForDarkText : ForLightText,
  };
  const toggleLove = () => {
    setLove(!love);
  };
  return (
    <div className="postsContainer">
      <div className="postsBox" style={Option}>
        <div className="postedUserBox">
          <div className="postedUserImg">
            <img src={profile} alt="profile" className="userProfileImg" />{" "}
          </div>
          <div className="postedUserName">aman dardarwal</div>
          <div className="postedTime" style={{ fontSize: "13px" }}>
            4 min ago
          </div>
        </div>
        <Text text={text} />
        <div className="postedImg">
          <img src={picture2} alt="postedPicture" />
        </div>

        <div className="feedBackBox">
          <span onClick={toggleLove}>
            {love ? <FavoriteIcon /> : <FavoriteBorderIcon />} 5
          </span>
          <span style={{ fontSize: "0.9rem" }}>
            5 comment <SmsIcon />
          </span>
        </div>
      </div>
      <div className="postsBox" style={Option}>
        <div className="postedUserBox">
          <div className="postedUserImg">
            <img src={profile} alt="profile" className="userProfileImg" />{" "}
          </div>
          <div className="postedUserName">aman dardarwal</div>
          <div className="postedTime" style={{ fontSize: "13px" }}>
            4 min ago
          </div>
        </div>
        <Text text={text} />

        <div className="feedBackBox">
          <span onClick={toggleLove}>
            {love ? <FavoriteIcon /> : <FavoriteBorderIcon />} 5
          </span>
          <span style={{ fontSize: "0.9rem" }}>
            comment <SmsIcon />
          </span>
        </div>
      </div>
      <div className="postsBox" style={Option}>
        <div className="postedUserBox">
          <div className="postedUserImg">
            <img src={profile} alt="profile" className="userProfileImg" />{" "}
          </div>
          <div className="postedUserName">aman dardarwal</div>
          <div className="postedTime" style={{ fontSize: "13px" }}>
            4 min ago
          </div>
        </div>
        <Text text={text} />
        <div className="postedImg">
          <img src={picture} alt="postedPicture" />
        </div>

        <div className="feedBackBox">
          <span onClick={toggleLove}>
            {love ? <FavoriteIcon /> : <FavoriteBorderIcon />} 5
          </span>
          <span>
            comment <SmsIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Posts;
