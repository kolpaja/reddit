import React from "react";
import "./home.styles.scss";
import Subreddits from "../../pages/subreddits/subreddits.jsx";
import useSubreddits from "../../hooks/useSubreddits";
// import Header from "../../components/header/header";

function Home() {
  const { subreddits } = useSubreddits();
  return (
    <div>
      {/* <Header /> */}
      <Subreddits subreddits={subreddits} />
    </div>
  );
}
export default Home;
