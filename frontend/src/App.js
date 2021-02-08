import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from './Components/Login/Login'
import Main from './Components/Home/MainMenu';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
        history: "/",
        session: false
    }
    this.connecToServer = this.connecToServer.bind(this); 
  }

  connecToServer() {    fetch('/');  }

  componentDidMount() {    
    this.connecToServer();
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props}/>}/>
          <Route exact path="/cashier" render={(props) => <Main {...props} isAdmin={false} />} />
          <Route exact path="/admin" render={(props) => <Main {...props} isAdmin={true} />} />
          <Route exact path="*" component={()=> "404 NOT FOUND"}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
