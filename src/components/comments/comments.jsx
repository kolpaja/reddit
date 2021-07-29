import React, { useState } from "react";
import "./comments.styles.scss";

import { PostedTime } from "../../utilities/functions";

function Comments({ comment }) {
  const [upvoted, setUpvoted] = useState(0);
  const [downvoted, setDownvoted] = useState(0);
  let votes = upvoted - downvoted;

  const upVoteComment = () => {
    if (comment.isDownVoted === true) {
      comment.isDownVoted = false;
      setDownvoted(downvoted - 1);
      comment.isUpVoted = true;
      setUpvoted(upvoted + 1);
    } else if (comment.isUpVoted === true) {
      comment.isUpVoted = false;
      setUpvoted(upvoted - 1);
    } else if (comment.isUpVoted === false) {
      comment.isUpVoted = true;
      setUpvoted(upvoted + 1);
    }
  };

  const downVoteComment = () => {
    if (comment.isUpVoted === true) {
      comment.isUpVoted = false;
      setUpvoted(upvoted - 1);
      comment.isDownVoted = true;
      setDownvoted(downvoted + 1);
    } else if (comment.isDownVoted === true) {
      comment.isDownVoted = false;
      setDownvoted(downvoted - 1);
    } else {
      comment.isDownVoted = true;
      setDownvoted(downvoted + 1);
    }
  };

  return (
    <div className="comment-preview">
      <div className="comment-wrap">
        <div className="comment-vote">
          <i
            className={`fas fa-arrow-up upvote-comment ${
              comment.isUpVoted ? "upvoted-comment" : ""
            } `}
            onClick={upVoteComment}
          ></i>
          <span className="number-votes">{votes}</span>
          <i
            className={`fas fa-arrow-down downvote-comment ${
              comment.isDownVoted ? "downvoted-comment" : ""
            }`}
            onClick={downVoteComment}
          ></i>
        </div>
        <div className="comment-body">
          <div className="comment-user">
            <div>
              <i className="fas fa-user "></i>
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
