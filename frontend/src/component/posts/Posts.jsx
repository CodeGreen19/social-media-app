import React, { useEffect, useState } from "react";
import "./Posts.css";
// import "./CommentShow.css";
import { Dark, ForDarkText, ForLightText, Light } from "../utils/ThemeColor";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmsIcon from "@mui/icons-material/Sms";
import Text from "../utils/Text";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  allCommentsPost,
  deletePost,
  getMyPosts,
  likeAndUnlikePost,
} from "../../action/postAction";
import TimeAgo from "../utils/TimeAgo";
import { loadUser } from "../../action/userAction";
import CommentShow from "./CommentShow";

function Posts() {
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const DarkMode = false;

  const [editBox, setEditBox] = useState("");
  const [openModal, setOpenModal] = useState("");

  const Option = {
    backgroundColor: DarkMode ? Dark : Light,
    color: DarkMode ? ForDarkText : ForLightText,
  };
  const toggleLove = (postId) => {
    dispatch(likeAndUnlikePost(postId)).then(() => dispatch(getMyPosts()));
  };
  // delete posthandler
  const deletePostHandler = (post) => {
    dispatch(deletePost(post._id)).then(() => {
      dispatch(getMyPosts());
      dispatch(loadUser());
    });
  };
  // comment show
  const commentShowHandler = (post) => {
    dispatch(allCommentsPost(post._id)).then(() => {
      setOpenModal(post._id);
    });
  };
  const handleClose = () => {
    setOpenModal("");
  };

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
  return (
    <div className="postsContainer">
      {posts &&
        posts.map((post) => (
          <div className="postsBox" style={Option} key={post._id}>
            <div className="postedUserBox">
              <div className="postedUserImg">
                <img
                  src={post.owner.avatar.url}
                  alt="profile"
                  className="userProfileImg"
                />{" "}
              </div>
              <div className="postedUserName">{post.owner.name}</div>
              <div className="postedTimeAndDeleteBox">
                <TimeAgo timestamp={post.createdAt} />
                <MoreVertIcon
                  onClick={() =>
                    editBox === post._id ? setEditBox("") : setEditBox(post._id)
                  }
                />
                <ul
                  className={`postEditBox ${
                    editBox === post._id ? "editBoxVisible" : ""
                  }`}
                >
                  <li>edit post</li>
                  <li onClick={() => deletePostHandler(post)}>delete post</li>
                </ul>
              </div>
            </div>
            <Text text={post.caption} />
            <div className="postedImg">
              <img src={post.image.url} alt="postedPicture" />
            </div>

            <div className="feedBackBox">
              <span
                onClick={() => toggleLove(post._id)}
                style={{ fontSize: "0.8rem" }}
              >
                {post.likes.includes(user._id) ? (
                  <FavoriteIcon sx={{ cursor: "pointer" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ cursor: "pointer" }} />
                )}
                {post.likes.length}
              </span>
              <span
                style={{ fontSize: "0.75rem" }}
                onClick={() => commentShowHandler(post)}
              >
                {post.comments.length} comment <SmsIcon />
              </span>
              {openModal === post._id ? (
                <CommentShow closeModal={handleClose} post={post} />
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Posts;
