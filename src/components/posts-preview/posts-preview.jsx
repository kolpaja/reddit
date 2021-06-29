import React, { useState, useEffect } from "react";
import "./posts-preview.scss";
import axios from "axios";
import { PostedTime } from "../../utilities/functions";
import { Link, useParams } from "react-router-dom";

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

  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/${subredditId}/posts/${id}/comments`,
    })
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const votes = upvotes - downvotes;
  return (
    <div key={id} className="posts-preview">
      <div className="post-wrap">
        <div className="post-vote">
          <i className="fas fa-arrow-up upvote"></i>
          <span className="number-votes">{votes}</span>
          <i className="fas fa-arrow-down downvote"></i>
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
