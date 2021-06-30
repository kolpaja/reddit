import React, { useState, useEffect } from "react";
import "./subreddit-post.styles.scss";

import Comments from "../comments/comments";
import { PostedTime } from "../../utilities/functions";

function SubredditPost({ location }) {
  const { comments } = location.state;
  const post = location.state.unVotePost;

  const mappedComments = comments.map((comment) => ({
    ...comment,
    isUpVoted: false,
    isDownVoted: false,
  }));
  const upVotingPostClass = document.querySelector(".fa-arrow-up");
  const downVotingPostClass = document.querySelector(".fa-arrow-down");

  const [upvoted, setUpvoted] = useState(post.upvotes);
  const [downvoted, setDownvoted] = useState(post.downvotes);
  let votes = upvoted - downvoted;

  const upVotePost = () => {
    if (post.isDownVoted === true) {
      post.isDownVoted = false;
      setDownvoted(downvoted - 1);
      post.isUpVoted = true;
      setUpvoted(upvoted + 1);
      upVotingPostClass.classList.add("post-upvoted");
      downVotingPostClass.classList.remove("post-downvoted");
    } else if (post.isUpVoted === true) {
      post.isUpVoted = false;
      setUpvoted(upvoted - 1);
      upVotingPostClass.classList.remove("post-upvoted");
    } else if (post.isUpVoted === false) {
      post.isUpVoted = true;
      setUpvoted(upvoted + 1);
      upVotingPostClass.classList.add("post-upvoted");
      downVotingPostClass.classList.remove("post-downvoted");
    }
  };
  const downVotePost = () => {
    if (post.isUpVoted === true) {
      post.isUpVoted = false;
      setUpvoted(upvoted - 1);
      post.isDownVoted = true;
      setDownvoted(downvoted + 1);
      upVotingPostClass.classList.remove("post-upvoted");
      downVotingPostClass.classList.add("post-downvoted");
    } else if (post.isDownVoted === true) {
      post.isDownVoted = false;
      setDownvoted(downvoted - 1);
      downVotingPostClass.classList.remove("post-downvoted");
    } else {
      post.isDownVoted = true;
      setDownvoted(downvoted + 1);
      downVotingPostClass.classList.add("post-downvoted");
    }
  };
  useEffect(() => {
    console.log("useeffect");
  }, []);
  return (
    <div key={post.id} className="subreddit-post">
      <div className="post-wrap">
        <div className="post-vote">
          <i className="fas fa-arrow-up upvote" onClick={upVotePost}></i>
          <span className="number-votes">{votes}</span>
          <i className="fas fa-arrow-down downvote" onClick={downVotePost}></i>
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
  );
}

export default SubredditPost;
