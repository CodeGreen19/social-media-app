import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useDispatch, useSelector } from "react-redux";
import { forRepliedComments, forReplyComment } from "../../action/postAction";
import "./CommentBox.css";
import ReplyBox from "./ReplyBox";

function CommentBox({ comment, post }) {
  const { replyCommentsInfo } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [reply, setReply] = useState(false);
  const [replyComment, setReplyComment] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [repliesArr, setRepliesArr] = useState("");
  const [count, setCount] = useState(0);

  // show replies handler
  const showReplyHandler = (commentId) => {
    const info = {
      commentId,
    };
    dispatch(forRepliedComments(post._id, info)).then(() => {
      setShowReplies(!showReplies);
      setRepliesArr(replyCommentsInfo);
    });
    // console.log(post._id, commentId);
  };

  console.log(repliesArr);

  const handleReplyComment = () => {
    const info = {
      comment: replyComment,
      commentId: comment._id,
    };
    dispatch(forReplyComment(post._id, info)).then(() => {
      setCount(count + 1);
      const newmodifiedComment = {
        user,
        comment: replyComment,
        _id: count,
      };
      setRepliesArr([...repliesArr, newmodifiedComment]);
    });
  };
  return (
    <div className="commentBox">
      <div className="commentUserBox">
        <div className="commentUserImgBox">
          <img src={comment.user.avatar.url} alt="commentuser" />
        </div>
        <span>{comment.user.name}</span>
        <p className="commentTime">2 min ago</p>
      </div>
      <div className="CommentTextBox">{comment.comment}</div>
      <div className="reactAndRplyBox">
        <span className="loveReact">
          <FavoriteBorderIcon /> 2
        </span>
        <span className="replyTextBox" onClick={() => setReply(!reply)}>
          reply
        </span>
        <div
          className="repliesComment"
          onClick={() => showReplyHandler(comment._id)}
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
          />{" "}
          <SendRoundedIcon onClick={handleReplyComment} />
        </div>
      )}
      {showReplies && <ReplyBox repliesArr={repliesArr} />}
    </div>
  );
}

export default CommentBox;
