import React, { useState, useEffect } from "react";
import axios from "axios";
import PostsPreview from "../../components/posts-preview/posts-preview";

function Posts({ subredditId = 1, ...rest }) {
  const { location } = rest;
  console.log("Posts restProps: ", rest);
  subredditId = location.state.id;
  const { handle } = location.state;

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/${subredditId}/posts/`,
      responseType: "stream",
    })
      .then((res) => {
        setPosts(res.data);
        console.log("res.data: comments", res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <PostsPreview key={post.id} post={post} handle={handle} />
      ))}
    </div>
  );
}

export default Posts;
