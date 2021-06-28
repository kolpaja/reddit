import React, { useState, useEffect } from "react";
import "./posts.styles.scss";
import axios from "axios";
import moment from "moment";
import PostsPreview from "../../components/posts-preview/posts-preview";

function Posts({ location }) {
  const { subreddit } = location.state;
  const subredditId = subreddit.id;
  console.log("Posts restProps: ", subreddit);

  const createdAt = moment(subreddit.createdAt).format("MMMM Do, YYYY");

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/${subredditId}/posts/`,
      responseType: "stream",
    })
      .then((res) => {
        setPosts(res.data);
        console.log("posts", res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div key={subredditId} className="posts-page">
      <div className="subreddit-posts">
        <div className="posts-sort">
          <div className="sort-select">
            <label for="sort-by">Sort by:</label>
            <select name="sort" id="sort-by">
              <option value="title-asc">Title asc</option>
              <option value="title-desc">Title desc</option>
              <option value="date-asc">Date asc</option>
              <option value="date-desc">Date desc</option>
            </select>
          </div>
        </div>

        {posts.map((post) => (
          <PostsPreview key={post.id} post={post} handle={subreddit.handle} />
        ))}
      </div>
      <div className="subreddit-wrap">
        <h1>Subreddit {subreddit.title}</h1>
        <p>
          In this subreddit anyone can ask anything about {subreddit.handle}.
          You can share photos, videos and links. Please be respectful!
        </p>
        <div>
          <span>
            admin <span className="subreddit-admin">{subreddit.admin}</span>
          </span>
          <span>created on {createdAt}</span>
        </div>
      </div>
    </div>
  );
}

export default Posts;
