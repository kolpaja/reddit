import React, { useEffect, useState } from "react";
import axios from "axios";
import Comments from "../comments/comments";

function SubredditPost({ ...props }) {
  console.log("🚀from subreddit-post", props);
  const { post } = props.location.state;

  const [comments, setcomments] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/${post.subredditId}/posts/${post.id}/comments`,
      responseType: "stream",
    })
      .then((res) => {
        setcomments(res.data);
        console.log("comments", res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1>Title: {post.title}</h1>
      <div>
        {comments.map((comment) => (
          <Comments comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default SubredditPost;
