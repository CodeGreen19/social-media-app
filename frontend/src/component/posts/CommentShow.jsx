import React, { useState } from "react";
import "./CommentShow.css";
import CommentBox from "./CommentBox";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { allCommentsPost, commentPost } from "../../action/postAction";
import Text from "../utils/Text";

export default function CommentShow({ closeModal, post }) {
  const { comments } = useSelector((state) => state.comments);
  const { mobile, darkMode } = useSelector((state) => state.user);
  const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();

  /// send a new comment

  const handleComment = () => {
    setNewComment("");
    if (newComment === "") return;
    dispatch(commentPost(post._id, newComment)).then(() => {
      dispatch(allCommentsPost(post._id));
    });
  };

  return (
    <div className={`commentMainContainer ${darkMode && "darkMode"}`}>
      <div className="commentContainer">
        <span className="closeIcon" onClick={closeModal}>
          {mobile ? <KeyboardDoubleArrowLeftIcon /> : <CloseRoundedIcon />}
        </span>
        {post.caption && <Text text={post.caption} />}
        {post.image?.url ? (
          <div className="commentPreviewPost">
            <img src={post.image.url} alt="commentImage" />
          </div>
        ) : (
          ""
        )}
        {post.video?.url ? (
          <div className="commentPreviewVideo">
            <video src={post.video.url} alt="commentVideo" />
          </div>
        ) : (
          ""
        )}
        {comments &&
          comments.map((comment) => (
            <CommentBox comment={comment} key={comment._id} post={post} />
          ))}
        <div className="commentInputBox">
          <input
            type="text"
            placeholder="comment here...."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleComment();
              }
            }}
          />{" "}
          <SendRoundedIcon onClick={handleComment} />
        </div>
      </div>
    </div>
  );
}
