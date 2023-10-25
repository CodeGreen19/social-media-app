import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  allCommentsPost,
  deletePostComment,
  forReplyComment,
  reactComment,
} from "../../action/postAction";
import "./CommentBox.css";
import ReplyBox from "./ReplyBox";
import TimeAgo from "../utils/TimeAgo";

function CommentBox({ comment, post }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [reply, setReply] = useState(false);
  const [modalShow, setModalSow] = useState(false);
  const [replyComment, setReplyComment] = useState("");
  const [replyToUser, setReplyToUser] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [reactExistUser, setReactExistUser] = useState(false);
  // if user allready react a spacific comment
  const isUserExistsOnReact = () => {
    if (comment.likes.includes(user._id)) {
      setReactExistUser(true);
    } else setReactExistUser(false);
  };
  // handle comment likes
  const handleCommentLike = (commentId) => {
    // add or remove comment's likes
    dispatch(reactComment(post._id, commentId)).then(() => {
      dispatch(allCommentsPost(post._id)).then(() => {
        setReactExistUser(!reactExistUser);
      });
    });
  };

  // to delete a specific comment
  const handleDeleteComment = (commentId) => {
    dispatch(deletePostComment(post._id, commentId)).then(() => {
      dispatch(allCommentsPost(post._id)).then(() => {
        setModalSow(!modalShow);
      });
    });
  };

  // toggle replied input box
  const replyToggleHandler = (commentId) => {
    setReplyToUser(commentId);
    setReply(!reply);
  };
  // to reply a spacific comment
  const handleReplyComment = () => {
    setReplyComment("");
    const info = {
      comment: replyComment,
      commentId: comment._id,
      replyToId: replyToUser,
    };
    dispatch(forReplyComment(post._id, info)).then(() => {
      dispatch(allCommentsPost(post._id));
    });
  };
  console.log("comments", comment);

  useEffect(() => {
    isUserExistsOnReact();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="commentBox">
      <div className="commentUserBox">
        <div className="commentUserImgBox">
          <img src={comment.user.avatar.url} alt="commentuser" />
        </div>
        <span>{comment.user.name}</span>
        <p className="commentTime">
          {comment.commentAt ? (
            <TimeAgo timestamp={comment.commentAt} />
          ) : (
            "just now"
          )}
          {comment.user._id === user._id ? (
            <MoreVertIcon onClick={() => setModalSow(!modalShow)} />
          ) : (
            <MoreVertIcon style={{ opacity: 0 }} />
          )}
        </p>
        {modalShow && (
          <ul className="editCommentUl">
            <li
              style={{ color: "tomato" }}
              onClick={() => handleDeleteComment(comment._id)}
            >
              delete
            </li>
            <li onClick={() => setModalSow(!modalShow)}>cancel</li>
          </ul>
        )}
      </div>
      <div className="CommentTextBox">{comment.comment}</div>
      <div className="reactAndRplyBox">
        <span
          className="loveReact"
          onClick={() => handleCommentLike(comment._id)}
        >
          {reactExistUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          {comment.likes.length}
        </span>
        <span
          className="replyTextBox"
          onClick={() => replyToggleHandler(comment.user._id)}
        >
          reply
        </span>
        <div
          className="repliesComment"
          onClick={() => setShowReplies(!showReplies)}
        >
          {comment.replies && comment.replies.length > 0
            ? `replies (${comment.replies.length})`
            : ""}
        </div>
      </div>
      {reply && (
        <div className="replyInputBox">
          <input
            type="text"
            placeholder="reply here...."
            value={replyComment}
            onChange={(e) => setReplyComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleReplyComment();
              }
            }}
          />{" "}
          <SendRoundedIcon onClick={handleReplyComment} />
        </div>
      )}
      {showReplies && <ReplyBox comment={comment} post={post} />}
    </div>
  );
}

export default CommentBox;
