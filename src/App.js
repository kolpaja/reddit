import React from 'react'
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import Header from './components/header/header'
import Home from "./pages/home/home"
import Posts from './pages/posts/posts';
import SubredditPost from './components/subreddit-post/subreddit-post';

function App() {

  return (
    <div className="App">
      {/* <Header /> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/r/:handle/:subredditId/posts/:id" component={SubredditPost} />
          <Route exact path="/r/:id" component={Posts} />
          <Route exact path="/r" component={Home} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
