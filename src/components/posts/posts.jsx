import React, { useState, useEffect } from "react";
import "./posts.styles.scss";

import usePosts from "../../hooks/usePosts";
import moment from "moment";
import PostsPreview from "../posts-preview/posts-preview";
import Spinner from "../spinner/spinner";
import Header from "../header/header";

function Posts({ location }) {
  const { subreddit } = location.state;
  const subredditId = subreddit.id;
  const createdAt = moment(subreddit.createdAt).format("MMMM Do, YYYY");

  //fetch posts from endpoint
  const { posts } = usePosts(subredditId);
  console.log("🚀 posts: ", posts);
  const [sortType, setSortType] = useState();

  const dateDesc = () => {
    posts.sort((a, b) => new moment(a.createdAt) - new moment(b.createdAt));
  };

  const dateAsc = () => {
    posts.sort((a, b) => new moment(b.createdAt) - new moment(a.createdAt));
  };

  const titleAsc = () => {
    posts.sort(function (a, b) {
      return a.title > b.title.toUpperCase()
        ? -1
        : a.title.toUpperCase() < b.title.toUpperCase()
        ? 1
        : 0;
    });
  };

  const titleDesc = () => {
    posts.sort(function (a, b) {
      return a.title.toUpperCase() > b.title.toUpperCase()
        ? 1
        : a.title.toUpperCase() < b.title.toUpperCase()
        ? -1
        : 0;
    });
  };
  // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [sortType]);

  const mappedPosts = posts.map((post) => ({
    ...post,
    isUpVoted: false,
    isDownVoted: false,
  }));

  return (
    <div>
      <Header />
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

          {mappedPosts && mappedPosts.length > 0 ? (
            mappedPosts.map((post) => (
              <PostsPreview
                key={post.id}
                post={post}
                handle={subreddit.handle}
              />
            ))
          ) : (
            <Spinner />
          )}
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
    </div>
  );
}

export default Posts;
