import React, { useState } from "react";
import "./posts-preview.scss";
import moment from "moment";

import { PostedTime } from "../../utilities/functions";
import useComments from "../../hooks/useComments";
import SubredditPost from "../subreddit-post/subreddit-post";

function PostsPreview({ post, handle }) {
  const { comments } = useComments(post.subredditId, post.id);

  const [upvoted, setUpvoted] = useState(post.upvotes);
  const [downvoted, setDownvoted] = useState(post.downvotes);
  let votes = upvoted - downvoted;

  const createdDate = moment(post.createdAt).format("MMMM Do YYYY, h:mm A");

  const upVote = () => {
    if (post.isDownVoted === true) {
      post.isDownVoted = false;
      setDownvoted(downvoted - 1);
      post.isUpVoted = true;
      setUpvoted(upvoted + 1);
    } else if (post.isUpVoted === true) {
      post.isUpVoted = false;
      setUpvoted(upvoted - 1);
    } else if (post.isUpVoted === false) {
      post.isUpVoted = true;
      setUpvoted(upvoted + 1);
    }
  };

  const downVote = () => {
    if (post.isUpVoted === true) {
      post.isUpVoted = false;
      setUpvoted(upvoted - 1);
      post.isDownVoted = true;
      setDownvoted(downvoted + 1);
    } else if (post.isDownVoted === true) {
      post.isDownVoted = false;
      setDownvoted(downvoted - 1);
    } else {
      post.isDownVoted = true;
      setDownvoted(downvoted + 1);
    }
  };

  const unVotePost = { ...post, isUpVoted: false, isDownVoted: false };

  const [openModal, setOpenModal] = useState(false);
  const onClose = () => {
    setOpenModal(false);
  };
  const modalHandler = () => {
    setOpenModal(true);
  };

  return (
    <div key={post.id} className="posts-preview">
      <div className="post-wrap">
        <div className="post-vote">
          <i
            className={`fas fa-arrow-up upvote ${
              post.isUpVoted ? "upvoted-post" : ""
            }`}
            onClick={upVote}
          ></i>
          <span className="number-votes">{votes}</span>
          <i
            className={`fas fa-arrow-down downvote ${
              post.isDownVoted ? "downvoted-post" : ""
            }`}
            onClick={downVote}
          ></i>
        </div>
        <div className="post-body">
          <div className="post-title">
            <h1 onClick={modalHandler} key={post.id}>
              {post.title}
            </h1>
          </div>
          {openModal && (
            <SubredditPost
              handle={handle}
              unVotePost={unVotePost}
              comments={comments}
              onClose={onClose}
            />
          )}

          <div className="post-details">
            <p>
              "{post.body}" - <span className="post-user">{post.user}</span>
              <span> ~ {PostedTime(post.createdAt)}</span>
            </p>
            <img src={post.image} alt="" />
          </div>
          <div className="post-footer">
            <span className="post-comments-nr">
              <span className="number-comments">{comments.length}</span> comment
              {comments.length > 1 ? "s" : ""}
            </span>
            <span>{createdDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsPreview;
