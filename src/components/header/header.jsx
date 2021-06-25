import React from "react";
import reddit_logo from "../../assets/reddit_social media_icon.svg";
import reddit_text from "../../assets/Reddit_logo_text.svg";
import search_icon from "../../assets/search_icon.svg";

import "./header.styles.scss";

function Header() {
  return (
    <div className="header">
      <div className="header_nav_left">
        <div className="header_logo">
          <a href="/home">
            <img src={reddit_logo} alt="" className="reddit_logo" />
            <img src={reddit_text} alt="" className="reddit_text" />
          </a>
        </div>
        <div className="header_search">
          <input type="text" placeholder="search" className="search" />
          <img src={search_icon} alt="" className="search_icon" />
        </div>
      </div>
    </div>
  );
}

export default Header;
