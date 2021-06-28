import React from "react";
import "./posts-preview.scss";

import { Link } from "react-router-dom";

function PostsPreview({ post, handle }) {
  console.log("🔎post preview: ", post);
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

  return (
    <div key={id} className="posts-preview">
      <div className="post-wrap">
        <div className="post-vote">
          <i class="fas fa-arrow-up upvote"></i>
          <span className="number-votes">100</span>
          <i class="fas fa-arrow-down downvote"></i>
        </div>
        <div className="post-body">
          <div className="post-title">
            <Link
              to={{
                pathname: `/r/${handle}/${subredditId}/posts/${id}/`,
                state: { id, handle, post },
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
        </div>
      </div>
    </div>
  );
}

export default PostsPreview;
