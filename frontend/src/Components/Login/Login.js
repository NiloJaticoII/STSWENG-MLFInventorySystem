import React, {Component} from 'react';
import { Form, Button } from 'bootstrap-4-react';
import{login} from '../../actions/login'
import {useSelector} from 'react-redux';



class Login extends Component {
  
    constructor() {
        super()
        this.state = {
            userName: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    
    handleSubmit(e){
      e.preventDefault();
      login(this.state);
    }
  render(){
    return (
        <div id="loginPage" class="App">
           <div id="loginBox" class="container">
               <form id="loginForm" method="POST" action="/login">
                   <div class="text-center">
                       <img id="logoImage" src="photo/logo.png" /> 
                   </div>
   
                   <div class="form-group">
                       <label for="userName" class="font-weight-normal">username</label>
                       <input id="userName" name="userName" type="text" class="form-control" />
                   </div>
                   <div class="form-group">
                       <label for="userName" class="font-weight-normal">password</label>
                       <input id="password" name="password" type="password" class="form-control" />
                   </div>
                   <div class="text-right">
                       <input id="loginButton" value="LOGIN" type="submit" class="btn btn-secondary btn-lg col-5" />
                   </div>
               </form>
           </div>
       </div>
    );
  }
}

export default Login