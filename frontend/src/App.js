import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './Components/Login/Login'
import Main from './Components/Home/MainMenu';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
        history: "/",
        session: {}
    }
    this.connecToServer = this.connecToServer.bind(this); 
  }

  connecToServer() {    fetch('/');  }

  componentDidMount() {    this.connecToServer();  }

  render(){
    return (
      <Router>
        <Switch>

          <Route exact path="/" component={Login}/>
          <Route exact path="/cashierWindow" render={(props) => <Main {...props} isAdmin={false} />} />
          <Route exact path="/adminWindow" render={(props) => <Main {...props} isAdmin={true} />} />

        </Switch>
      </Router>
    );
  }
}

export default App;
