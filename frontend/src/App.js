import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './Components/Login/Login'
import TestHome from './Components/Home/testHome';
import Admin from './Components/Admin/Admin';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      history: "/"
    }
  }
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/home" component={TestHome}/>
          <Route exact path="/admin" component={Admin}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
