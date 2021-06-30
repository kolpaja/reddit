import React, { useState, useEffect } from "react";
import "./home.styles.scss";
import Subreddits from "../../pages/subreddits/subreddits.jsx";
// import useSubreddits from "../../hooks/useSubreddits";
import Header from "../../components/header/header";
import axios from "axios";
import Spinner from "../../components/spinner/spinner";

function Home() {
  // const { subreddits } = useSubreddits();

  const [loading, setLoading] = useState(false);
  const [subreddits, setSubreddits] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredSubreddits, setFilteredSubreddits] = useState([]);

  const handleChange = (e) => setSearch(e.target.value);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/",
    })
      .then((res) => {
        setSubreddits(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    setFilteredSubreddits(
      subreddits.filter((subreddit) =>
        subreddit.handle.toLowerCase().includes(search.trim().toLowerCase())
      )
    );
  }, [search, subreddits]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Header handleChange={handleChange} />
      <Subreddits subreddits={filteredSubreddits} />
    </div>
  );
}
export default Home;
