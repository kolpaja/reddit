import React, { useState } from "react";
import "./subreddit-post.styles.scss";

import Comments from "../comments/comments";
import { PostedTime } from "../../utilities/functions";

function SubredditPost({ ...props }) {
  const { post, comments } = props.location.state;

  const mappedComments = comments.map((comment) => ({
    ...comment,
    isUpVoted: false,
    isDownVoted: false,
  }));

  const upVotingClass = document.querySelector(`.postup${post.id}`);
  const downVotingClass = document.querySelector(`.postdown${post.id}`);

  const [upvoted, setUpvoted] = useState(post.upvotes);
  const [downvoted, setDownvoted] = useState(post.downvotes);
  let votes = upvoted - downvoted;

  const upVote = () => {
    if (post.isDownVoted === true) {
      post.isDownVoted = false;
      setDownvoted(downvoted - 1);
      post.isUpVoted = true;
      setUpvoted(upvoted + 1);
      upVotingClass.classList.add("upvoted");
      downVotingClass.classList.remove("downvoted");
    } else if (post.isUpVoted === true) {
      post.isUpVoted = false;
      setUpvoted(upvoted - 1);
      upVotingClass.classList.remove("upvoted");
    } else if (post.isUpVoted === false) {
      post.isUpVoted = true;
      setUpvoted(upvoted + 1);
      upVotingClass.classList.add("upvoted");
      downVotingClass.classList.remove("downvoted");
    }
  };
  const downVote = () => {
    if (post.isUpVoted === true) {
      post.isUpVoted = false;
      setUpvoted(upvoted - 1);
      post.isDownVoted = true;
      setDownvoted(downvoted + 1);
      upVotingClass.classList.remove("upvoted");
      downVotingClass.classList.add("downvoted");
    } else if (post.isDownVoted === true) {
      console.log("its downvoted mo!");
      post.isDownVoted = false;
      setDownvoted(downvoted - 1);
      downVotingClass.classList.remove("downvoted");
    } else {
      post.isDownVoted = true;
      setDownvoted(downvoted + 1);
      downVotingClass.classList.add("downvoted");
    }
  };

  return (
    <div key={post.id} className="subreddit-post">
      <div className="post-wrap">
        <div className="post-vote">
          <i
            className={`fas fa-arrow-up upvote postup${post.id}`}
            onClick={upVote}
          ></i>
          <span className="number-votes">{votes}</span>
          <i
            className={`fas fa-arrow-down downvote postdown${post.id}`}
            onClick={downVote}
          ></i>
        </div>
        <div className="post-body">
          <div className="post-title">{post.title}</div>
          <div className="post-details">
            <p>
              "{post.body}" - <span className="post-user">{post.user}</span>
            </p>
            <img src={post.image} />
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
  );
}

export default SubredditPost;
