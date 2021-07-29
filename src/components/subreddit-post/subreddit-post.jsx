import React, { useState, useEffect } from "react";
import "./subreddit-post.styles.scss";

import Comments from "../comments/comments";
import { PostedTime } from "../../utilities/functions";

function SubredditPost(props) {
  const post = props.unVotePost;
  const mappedComments = props.comments.map((comment) => ({
    ...comment,
    isUpVoted: false,
    isDownVoted: false,
  }));

  const [upvoted, setUpvoted] = useState(post.upvotes);
  const [downvoted, setDownvoted] = useState(post.downvotes);
  let votes = upvoted - downvoted;

  console.log("post.isDownVoted: ", post.isDownVoted);
  console.log("post.isUpVoted: ", post.isUpVoted);

  const upVotePost = () => {
    if (post.isDownVoted === true) {
      post.isDownVoted = false;
      setDownvoted(downvoted - 1);
      post.isUpVoted = true;
      setUpvoted(upvoted + 1);
    } else if (post.isUpVoted === true) {
      post.isUpVoted = false;
      setUpvoted(upvoted - 1);
    } else if (post.isUpVoted === false) {
      setUpvoted(upvoted + 1);
      post.isUpVoted = true;
    }
  };
  const downVotePost = () => {
    if (post.isUpVoted === true) {
      post.isUpVoted = false;
      setUpvoted(upvoted - 1);
      post.isDownVoted = true;
      setDownvoted(downvoted + 1);
    } else if (post.isDownVoted === true) {
      post.isDownVoted = false;
      setDownvoted(downvoted - 1);
    } else {
      post.isDownVoted = true;
      setDownvoted(downvoted + 1);
    }
  };

  return (
    <div className="Modal">
      <div className="modal__backdrop" onClick={props.onClose} />
      <div key={post.id} className="subreddit-post">
        <span className="close" onClick={props.onClose}>
          <i className="fas fa-times"></i> Close
        </span>
        <div className="post-wrap">
          <div className="post-vote">
            <i
              className={`fas fa-arrow-up upvote ${
                post.isUpVoted ? "post-upvoted" : ""
              }`}
              onClick={upVotePost}
            ></i>
            <span className="number-votes">{votes}</span>
            <i
              className={`fas fa-arrow-down downvote ${
                post.isDownVoted ? "post-downvoted" : ""
              }`}
              onClick={downVotePost}
            ></i>
          </div>
          <div className="post-body">
            <div className="post-title">{post.title}</div>
            <div className="post-details">
              <p>
                "{post.body}" - <span className="post-user">{post.user}</span>
              </p>
              <img src={post.image} alt="" />
            </div>
            <div className="post-footer">
              <span>posted {PostedTime(post.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="post-comments">
          {mappedComments.map((comment) => (
            <Comments comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubredditPost;
