import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./ReplyBox.css";

function ReplyBox({ repliesArr }) {
  return (
    <div className="forRepliesUserContainer">
      {repliesArr &&
        repliesArr.map((reply) => (
          <div className="forRepliesBox" key={reply._id}>
            <div className="forRepliesUserBox">
              <div className="forRepliesUserImg">
                <img src={reply.user.avatar.url} alt="replies user" />
              </div>

              <span className="commentedUserName">{reply.user.name}</span>
              <div className="forRepliesTime">5 min ago</div>
            </div>
            <div className="replyCommentText">{reply.comment}</div>
            <div className="forReactAndReply">
              <span className="replyFavourite">
                <FavoriteBorderIcon /> 5
              </span>
              <span className="replyReply">reply</span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ReplyBox;
