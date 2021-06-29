import React, { useState, useEffect } from "react";
import "./posts.styles.scss";
import axios from "axios";
import moment from "moment";
import PostsPreview from "../../components/posts-preview/posts-preview";

function Posts({ location }) {
  const { subreddit } = location.state;
  const subredditId = subreddit.id;
  const createdAt = moment(subreddit.createdAt).format("MMMM Do, YYYY");

  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState("titleAsc");

  useEffect(() => {
    axios({
      method: "get",
      url: `https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/${subredditId}/posts/`,
    })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log("posts: ", posts);

  const dateAsc = () =>
    setPosts(
      posts.sort(function (a, b) {
        return a.createdAt > b.createdAt
          ? -1
          : a.createdAt < b.createdAt
          ? 1
          : 0;
      })
    );

  const dateDesc = () =>
    setPosts(
      posts.sort(function (a, b) {
        return a.createdAt > b.createdAt
          ? 1
          : a.createdAt < b.createdAt
          ? -1
          : 0;
      })
    );

  const titleAsc = () =>
    setPosts(
      posts.sort(function (a, b) {
        return a.title > b.title.toUpperCase()
          ? -1
          : a.title.toUpperCase() < b.title.toUpperCase()
          ? 1
          : 0;
      })
    );
  const titleDesc = () =>
    setPosts(
      posts.sort(function (a, b) {
        return a.title.toUpperCase() > b.title.toUpperCase()
          ? 1
          : a.title.toUpperCase() < b.title.toUpperCase()
          ? -1
          : 0;
      })
    );

  useEffect(() => {
    switch (sortType) {
      case "dateAsc":
        return dateAsc();
      case "dateDesc":
        return dateDesc();
      case "titleAsc":
        return titleAsc();
      case "titleDesc":
        return titleDesc();
      default:
        break;
    }
  }, [sortType]);

  return (
    <div key={subredditId} className="posts-page">
      <div className="subreddit-posts">
        <div className="posts-sort">
          <div className="sort-select">
            <label htmlFor="sort-by">Sort by:</label>
            <select
              name="sort"
              id="sort-by"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="titleAsc">Title asc</option>
              <option value="titleDesc">Title desc</option>
              <option value="dateAsc">Date asc</option>
              <option value="dateDesc">Date desc</option>
            </select>
          </div>
        </div>

        {posts && posts.length > 0
          ? posts.map((post) => (
              <PostsPreview
                key={post.id}
                post={post}
                handle={subreddit.handle}
              />
            ))
          : "...loading"}
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
