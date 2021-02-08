import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from './Components/Login/Login'
import Main from './Components/Home/MainMenu';
import {ProtectedRoute} from './ProtectedRoute'

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
          <ProtectedRoute exact path="/cashier" render={(props) => <Main {...props} isAdmin={false} />} />
          <ProtectedRoute exact path="/admin" render={(props) => <Main {...props} isAdmin={true} />} />
          <ProtectedRoute exact path="*" component={()=> "404 NOT FOUND"}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
