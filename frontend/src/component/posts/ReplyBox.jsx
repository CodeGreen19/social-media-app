import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./ReplyBox.css";
import TimeAgo from "../utils/TimeAgo";
import { useDispatch, useSelector } from "react-redux";
import {
  ReplyOfRepliedComment,
  allCommentsPost,
  deleteRepliedComment,
  forReplyReactComment,
} from "../../action/postAction";

function ReplyBox({ comment, post }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const [replyToReply, setReplyToReply] = useState("");
  const [repliedEdit, setRepliedEdit] = useState(false);
  const [replyToReplyInput, setReplyToReplyInput] = useState("");

  // react a spacifiq comments
  const handleReplyReact = (replyId) => {
    let info = {
      commentId: comment._id,
      replyCommentId: replyId,
    };
    dispatch(forReplyReactComment(post._id, info)).then(() => {
      dispatch(allCommentsPost(post._id));
    });
  };
  // toggle reply to reply box
  const toggleReplyInput = (replyId) => {
    if (replyToReply !== "") {
      setReplyToReply("");
    } else {
      setReplyToReply(replyId);
    }
  };
  // reply to reply comment
  const handleReplyToReplyComment = (replyId, replyTo) => {
    setReplyToReplyInput("");
    const info = {
      comment: replyToReplyInput,
      replyCommentId: replyId,
      commentId: comment._id,
      replyTo,
    };
    console.log(info);
    dispatch(ReplyOfRepliedComment(post._id, info)).then(() => {
      dispatch(allCommentsPost(post._id));
    });
  };
  // delete reply handler
  const deleteReplyHandler = (replyId) => {
    let info = {
      commentId: comment._id,
      replyId,
    };
    dispatch(deleteRepliedComment(post._id, info)).then(() => {
      dispatch(allCommentsPost(post._id));
    });
  };
  return (
    <div className="forRepliesUserContainer">
      {comment &&
        comment.replies.map((reply) => (
          <div className="forRepliesBox" key={reply._id}>
            <div className="forRepliesUserBox">
              <div className="forRepliesUserImg">
                <img src={reply.user.avatar.url} alt="replies user" />
              </div>

              <span className="commentedUserName">{reply.user.name}</span>
              <div className="forRepliesTime">
                {reply.replyAt && <TimeAgo timestamp={reply.replyAt} />}
                {reply.user._id === user._id ? (
                  <MoreVertIcon onClick={() => setRepliedEdit(reply._id)} />
                ) : (
                  <MoreVertIcon style={{ opacity: 0 }} />
                )}
                {repliedEdit === reply._id && (
                  <ul className="editRepliedComment">
                    <li
                      style={{ color: "tomato" }}
                      onClick={() => deleteReplyHandler(reply._id)}
                    >
                      delete
                    </li>
                    <li onClick={() => setRepliedEdit("")}>cancel</li>
                  </ul>
                )}
              </div>
            </div>
            <div className="replyCommentText">
              <span>@{reply.replyTo?.name}</span>
              {reply.comment}
            </div>
            <div className="forReactAndReply">
              <span className="replyFavourite">
                {reply && reply.likes.includes(user._id) ? (
                  <FavoriteIcon onClick={() => handleReplyReact(reply._id)} />
                ) : (
                  <FavoriteBorderIcon
                    onClick={() => handleReplyReact(reply._id)}
                  />
                )}
                {reply.likes.length}
              </span>
              <span
                className="replyReply"
                onClick={() => toggleReplyInput(reply._id)}
              >
                reply
              </span>
            </div>
            {replyToReply === reply._id && (
              <div className="replyToReplyInputBox">
                <input
                  type="text"
                  placeholder="reply here...."
                  value={replyToReplyInput}
                  onChange={(e) => setReplyToReplyInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleReplyToReplyComment(reply._id, reply.user._id);
                    }
                  }}
                />{" "}
                <SendRoundedIcon
                  onClick={() =>
                    handleReplyToReplyComment(reply._id, reply.user._id)
                  }
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default ReplyBox;
