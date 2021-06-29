import React, { useState } from "react";
import "./comments.styles.scss";

import { PostedTime } from "../../utilities/functions";

function Comments({ comment }) {
  const [upvoted, setUpvoted] = useState(0);
  const [downvoted, setDownvoted] = useState(0);

  const upVote = () => {
    setUpvoted(upvoted + 1);
    console.log("⬆ upvoted");
  };
  const downVote = () => {
    setDownvoted(downvoted + 1);
    console.log("⬆ downvoted");
  };

  let votes = upvoted - downvoted;
  return (
    <div className="comment-preview">
      <div className="comment-wrap">
        <div className="comment-vote">
          <i className="fas fa-arrow-up upvote-comment" onClick={upVote}></i>
          <span className="number-votes">{votes}</span>
          <i
            className="fas fa-arrow-down downvote-comment"
            onClick={downVote}
          ></i>
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
