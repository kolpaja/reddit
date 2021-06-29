import React from "react";
import "./comments.styles.scss";

import { PostedTime } from "../../utilities/functions";

function Comments({ comment }) {
  return (
    <div className="comment-preview">
      <div className="comment-wrap">
        <div className="comment-vote">
          <i className="fas fa-arrow-up upvote"></i>
          <span className="number-votes">0</span>
          <i className="fas fa-arrow-down downvote"></i>
        </div>
        <div className="comment-body">
          <div className="comment-user">
            <div>
              <i className="fas fa-user"></i>
              <span>{comment.name}</span>
            </div>
            <span>{PostedTime(comment.createdAt)}</span>
          </div>
          <div className="comment-text">{comment.body}</div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
