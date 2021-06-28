import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./subreddits.styles.scss";

function Subreddits() {
  const [subReddits, setSubReddits] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/",
      responseType: "stream",
    })
      .then((res) => {
        setSubReddits(res.data);
        console.log("Subreddits: ", res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="subreddits-page">
      {subReddits.map((subreddit) => {
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
      })}
    </div>
  );
}

export default Subreddits;
