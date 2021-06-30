import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "./subreddits.styles.scss";
import Spinner from "../../components/spinner/spinner";

function Subreddits({ subreddits }) {
  return (
    <div className="subreddits-page">
      {subreddits && subreddits.length > 0 ? (
        subreddits.map((subreddit) => {
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
