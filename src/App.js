import React from 'react'
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from './pages/home/home';
import Feed from './components/feed/feed';
import Post from './pages/post/post';

function App() {

  return (
    <div className="App">
      <Home />
      <BrowserRouter>
        <Switch>
          <Route exact path="/r/:id" component={Post} />
          <Route exact path="/r" component={Feed} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
