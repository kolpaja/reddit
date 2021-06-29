import React, { useEffect, useState } from "react";

import useSubreddits from "../../hooks/useSubreddits";
import { Link } from "react-router-dom";
import "./subreddits.styles.scss";
import Spinner from "../../components/spinner/spinner";

function Subreddits() {
  const { subReddits } = useSubreddits();
  return (
    <div className="subreddits-page">
      {subReddits && subReddits.length > 0 ? (
        subReddits.map((subreddit) => {
          return (
            <div className="subreddit-wrap" key={subreddit.id}>
              <div key={subreddit.id} className="subreddit-item">
                <Link
                  to={{
                    pathname: `/r/${subreddit.handle}/`,
                    state: { id: subreddit.id, subreddit },
                  }}
                  className="item"
                >
                  <h5>{subreddit.handle.toUpperCase()}</h5>
                </Link>
                <p>This is the official subreddit for {subreddit.handle}</p>
              </div>
            </div>
          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Subreddits;
