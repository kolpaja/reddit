import React, { useState, useEffect } from "react";
import "./posts-preview.scss";

import { PostedTime } from "../../utilities/functions";
import { Link } from "react-router-dom";
import useComments from "../../hooks/useComments";
import Modal from "../Modal/Modal";
import SubredditPost from "../subreddit-post/subreddit-post";

function PostsPreview({ post, handle }) {
  const { comments } = useComments(post.subredditId, post.id);
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
      post.isDownVoted = false;
      setDownvoted(downvoted - 1);
      downVotingClass.classList.remove("downvoted");
    } else {
      post.isDownVoted = true;
      setDownvoted(downvoted + 1);
      downVotingClass.classList.add("downvoted");
    }
  };

  useEffect(() => {}, []);

  const unVotePost = { ...post, isUpVoted: false, isDownVoted: false };

  const [openModal, setOpenModal] = useState(false);
  const onClose = () => {
    setOpenModal(false);
  };
  const modalHandler = () => {
    setOpenModal(true);
  };

  return (
    <div key={post.id} className="posts-preview">
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
          <div className="post-title">
            <h1 key={post.id}>{post.title}</h1>
          </div>
          {openModal && (
            <SubredditPost
              handle={handle}
              unVotePost={unVotePost}
              comments={comments}
              onClose={onClose}
            />
          )}
          <button onClick={modalHandler}>Open MOdal</button>
          <div className="post-details">
            <p>
              "{post.body}" - <span className="post-user">{post.user}</span>
            </p>
            <img src={post.image} alt="" />
          </div>
          <div className="post-footer">
            <span className="post-comments-nr">
              <span className="number-comments">{comments.length}</span> comment
              {comments.length > 1 ? "s" : ""}
            </span>
            <span>posted {PostedTime(post.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsPreview;
