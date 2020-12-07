import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import Login from './Components/Login/Login'

class App extends Component {
  
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/">
              <Login />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
