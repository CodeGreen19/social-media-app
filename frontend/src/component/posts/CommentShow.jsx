import React, { useState } from "react";
import "./CommentShow.css";
import CommentBox from "./CommentBox";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../action/postAction";

export default function CommentShow({ closeModal, post }) {
  const { comments } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.user);
  const [newComment, setNewComment] = useState("");
  const [modifiedComment, setModifiedComment] = useState(comments);

  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  // modified comment
  /// send a new comment
  const handleComment = () => {
    setNewComment("");
    if (newComment === "") return;
    dispatch(commentPost(post._id, newComment)).then(() => {
      setCount(count + 1);
      const newmodifiedComment = {
        user,
        comment: newComment,
        _id: count,
      };
      setModifiedComment([...modifiedComment, newmodifiedComment]);
    });
  };
  return (
    <div className={`commentMainContainer`}>
      <div className="commentContainer">
        <span className="closeIcon" onClick={closeModal}>
          <CloseRoundedIcon />
        </span>
        {post.image?.url ? (
          <div className="commentPreviewPost">
            <img src={post.image.url} alt="commentImage" />
          </div>
        ) : (
          ""
        )}
        {comments &&
          modifiedComment.map((comment) => (
            <CommentBox comment={comment} key={comment._id} post={post} />
          ))}
        <div className="commentInputBox">
          <input
            type="text"
            placeholder="comment here...."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />{" "}
          <SendRoundedIcon onClick={handleComment} />
        </div>
      </div>
    </div>
  );
}
