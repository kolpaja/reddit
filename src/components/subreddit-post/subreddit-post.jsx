import React from "react";
import "./subreddit-post.styles.scss";

import Comments from "../comments/comments";
import { PostedTime } from "../../utilities/functions";

function SubredditPost({ ...props }) {
  const { post, comments } = props.location.state;
  const votes = post.upvotes - post.downvotes;

  return (
    <div key={post.id} className="subreddit-post">
      <div className="post-wrap">
        <div className="post-vote">
          <i className="fas fa-arrow-up upvote"></i>
          <span className="number-votes">{votes}</span>
          <i className="fas fa-arrow-down downvote"></i>
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
        {comments.map((comment) => (
          <Comments comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}

export default SubredditPost;
