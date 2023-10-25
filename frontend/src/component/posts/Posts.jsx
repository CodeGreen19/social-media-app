import React, { Fragment, useEffect, useState } from "react";
import "./Posts.css";
// import "./CommentShow.css";
import { Dark, ForDarkText, ForLightText, Light } from "../utils/ThemeColor";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Text from "../utils/Text";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  allCommentsPost,
  deletePost,
  editCaptionPost,
  getMyPosts,
  likeAndUnlikePost,
  reportPost,
} from "../../action/postAction";
import TimeAgo from "../utils/TimeAgo";
import { loadUser, selectUser } from "../../action/userAction";
import CommentShow from "./CommentShow";
import { getFollowingPosts } from "../../action/followAction";
import BoxText from "../utils/BoxText";

function Posts() {
  const {
    showMyPost,
    posts: myPosts,
    selectedUserPosts,
  } = useSelector((state) => state.post);
  const { posts: followingPosts } = useSelector((state) => state.follow);
  const { user, selectedUser, darkMode } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [editBox, setEditBox] = useState("");
  const [openModal, setOpenModal] = useState("");
  const [posts, setPosts] = useState(followingPosts);
  const [editCaption, setEditCaption] = useState("");
  const [editCaptionText, setEditCaptionText] = useState("");

  const Option = {
    backgroundColor: darkMode ? Dark : Light,
    color: darkMode ? ForDarkText : ForLightText,
  };
  const toggleLove = (postId) => {
    dispatch(likeAndUnlikePost(postId)).then(() => {
      if (selectedUser !== undefined && selectedUser._id !== user._id) {
        dispatch(getMyPosts(selectedUser._id));
      } else {
        dispatch(getFollowingPosts());
        dispatch(getMyPosts(user._id));
      }
    });
  };
  // delete posthandler
  const deletePostHandler = (post) => {
    dispatch(deletePost(post._id)).then(() => {
      dispatch(getMyPosts(user._id));
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

  // handle selected user
  const handleSelectUser = (userId) => {
    dispatch(selectUser(userId)).then(() => {
      dispatch(getMyPosts(userId)).then(() => {
        dispatch({ type: "myPostsTrue", payload: true });
      });
    });
  };

  // handle post update caption
  const handleUpdatePost = (post) => {
    const info = {
      postId: post._id,
      caption: editCaptionText,
    };
    dispatch(editCaptionPost(info)).then(() => {
      dispatch(getMyPosts(post.owner._id));
      setEditCaption("");
    });
  };

  // handle report
  const reportPostHandler = (postId) => {
    dispatch(reportPost(postId)).then(() => {
      dispatch(getFollowingPosts());
    });
  };
  useEffect(() => {
    if (user) {
      dispatch(getMyPosts(user._id));
    }
    if (selectedUserPosts) {
      dispatch(getMyPosts(user._id));
    }
  }, [dispatch, user, selectedUserPosts]);

  // fetch posts
  useEffect(() => {
    dispatch(getFollowingPosts());
  }, [dispatch]);

  useEffect(() => {
    if (showMyPost) {
      setPosts(myPosts);
    }
    if (showMyPost === false || showMyPost === undefined) {
      setPosts(followingPosts);
    }
  }, [showMyPost, followingPosts, myPosts]);
  return (
    <Fragment>
      {user && (
        <div
          className={`postsContainer ${darkMode && "darkMode"}`}
          style={Option}
        >
          {showMyPost &&
            (posts.length === 0 ? (
              <div style={{ marginLeft: "20px" }}>
                <BoxText text={["H", "E"]} />
                <BoxText text={["H", "A", "S"]} />
                <BoxText text={["N", "O"]} />
                <BoxText text={["P", "O", "S", "T", "S"]} />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginLeft: "20px",
                }}
              >
                <BoxText text={["M", "Y"]} />
                <BoxText text={["P", "O", "S", "T", "S"]} />
              </div>
            ))}
          {posts &&
            posts.map(
              (post) =>
                !post.reports.includes(user._id) && (
                  <div className="postsBox" style={Option} key={post._id}>
                    <div className="postedUserBox">
                      <div
                        className="postedUserImg"
                        onClick={() => handleSelectUser(post.owner._id)}
                      >
                        <img
                          src={post.owner.avatar.url}
                          alt="profile"
                          className="userProfileImg"
                        />
                      </div>
                      <div className="postedUserName">{post.owner.name}</div>
                      <div className="postedTimeAndDeleteBox">
                        <TimeAgo timestamp={post.createdAt} />
                        <MoreVertIcon
                          onClick={() =>
                            editBox === post._id
                              ? setEditBox("")
                              : setEditBox(post._id)
                          }
                        />
                        <ul
                          className={`postEditBox ${
                            editBox === post._id ? "editBoxVisible" : ""
                          }`}
                        >
                          {post.owner._id === user._id && (
                            <li
                              onClick={() => {
                                setEditCaption(post);
                                setEditCaptionText(post.caption);
                                setEditBox("");
                              }}
                            >
                              edit post
                            </li>
                          )}
                          {post.owner._id === user._id ? (
                            <li onClick={() => deletePostHandler(post)}>
                              delete post
                            </li>
                          ) : (
                            <li onClick={() => reportPostHandler(post._id)}>
                              report
                            </li>
                          )}
                          <li
                            style={{ color: "gray" }}
                            onClick={() => setEditBox("")}
                          >
                            cancel
                          </li>
                        </ul>
                      </div>
                    </div>
                    {editCaption._id === post._id ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingRight: "5px",
                        }}
                      >
                        <input
                          className="captionEdit"
                          value={editCaptionText}
                          onChange={(e) => setEditCaptionText(e.target.value)}
                        ></input>
                        <button
                          className="captionEditBtn"
                          onClick={() => handleUpdatePost(post)}
                        >
                          update
                        </button>
                      </div>
                    ) : (
                      <Text text={post.caption} />
                    )}

                    {post.image ? (
                      <div className="postedImg">
                        <img src={post.image.url} alt="postedPicture" />
                      </div>
                    ) : post.video ? (
                      <div className="postedVideo">
                        <video src={post.video.url} controls />
                      </div>
                    ) : (
                      ""
                    )}

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
                        <span>{post.likes.length}</span>
                      </span>
                      <span
                        style={{ fontSize: "0.75rem", cursor: "pointer" }}
                        onClick={() => commentShowHandler(post)}
                      >
                        {post.comments.length} comment{" "}
                        <AssignmentOutlinedIcon />
                      </span>
                      {openModal === post._id ? (
                        <CommentShow closeModal={handleClose} post={post} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )
            )}
        </div>
      )}
    </Fragment>
  );
}

export default Posts;
