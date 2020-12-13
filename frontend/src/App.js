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
  }
  render(){
    return (
      <Router>
        <Switch>

          <Route exact path="/" component={Login}/>
          <Route exact path="/cashier" render={(props) => <Main {...props} isAdmin={false} />} />
          <Route exact path="/admin" render={(props) => <Main {...props} isAdmin={true} />} />

        </Switch>
      </Router>
    );
  }
}

export default App;
