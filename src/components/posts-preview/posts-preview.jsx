import React from "react";

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
    <div key={id}>
      <Link
        to={{
          pathname: `/r/${handle}/${subredditId}/posts/${id}/`,
          state: { id, handle, post },
        }}
      >
        <li key={id}>{title}</li>
      </Link>

      <li>Title: {title}</li>
      <li>Body: {body}</li>
      <li>Post Date: {createdAt}</li>
      <li>Posted by: {user}</li>
      <li>Upvotes: {upvotes}</li>
      <li>Downvotes: {downvotes}</li>
      <img src={image} width="100px" height="100px" />
    </div>
  );
}

export default PostsPreview;
