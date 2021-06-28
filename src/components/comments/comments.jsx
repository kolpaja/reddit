import React from "react";

function Comments({ comment }) {
  return (
    <div className="comment-wrap">
      {console.log("on comment comp: ", comment)}
      <div>{comment.body}</div>
    </div>
  );
}

export default Comments;
