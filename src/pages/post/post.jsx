import React, { useState, useEffect } from "react";
import axios from "axios";

function Post({ id = 1, ...rest }) {
  const { location } = rest;
  id = location.state.id;
  console.log("id: ", id);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/${id}/posts`,
      responseType: "stream",
    })
      .then((res) => {
        setPosts(res.data);
        console.log("res.data", res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <li>{post.title}</li>
          <li>{post.body}</li>
          <li>{post.createdAt}</li>
          <li>{post.user}</li>
          <li>{post.upvotes}</li>
          <li>{post.downvotes}</li>
          <img src={post.image} />
        </div>
      ))}
    </div>
  );
}

export default Post;
