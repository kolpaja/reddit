import React, { useState, useEffect } from "react";
import "./posts-preview.scss";

import { PostedTime } from "../../utilities/functions";
import { Link } from "react-router-dom";
import useComments from "../../hooks/useComments";

function PostsPreview({ post, handle }) {
  const {
    id,
    subredditId,
    title,
    createdAt,
    upvotes,
    downvotes,
    image,
    user,
    body,
  } = post;
  const { comments } = useComments(subredditId, id);

  const upVotingClass = document.querySelector(`.postup${id}`);
  const downVotingClass = document.querySelector(`.postdown${id}`);

  const [upvoted, setUpvoted] = useState(upvotes);
  const [downvoted, setDownvoted] = useState(downvotes);
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
    <div key={id} className="posts-preview">
      <div className="post-wrap">
        <div className="post-vote">
          <i
            className={`fas fa-arrow-up upvote postup${id}`}
            onClick={upVote}
          ></i>
          <span className="number-votes">{votes}</span>
          <i
            className={`fas fa-arrow-down downvote postdown${id}`}
            onClick={downVote}
          ></i>
        </div>
        <div className="post-body">
          <div className="post-title">
            <Link
              to={{
                pathname: `/r/${handle}/${subredditId}/posts/${id}/`,
                state: { id, handle, post, comments },
              }}
            >
              <h1 key={id}>{title}</h1>
            </Link>
          </div>
          <div className="post-details">
            <p>
              "{body}" - <span className="post-user">{user}</span>
            </p>
            <img src={image} />
          </div>
          <div className="post-footer">
            <span className="post-comments-nr">
              <span className="number-comments">{comments.length}</span> comment
              {comments.length > 1 ? "s" : ""}
            </span>
            <span>posted {PostedTime(createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsPreview;
