import React, {Component} from 'react';

class Login extends Component {
  
    constructor() {
        super()
        this.state = {
            userName: '',
            password: '',
            responseToPost: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
          
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:1337/postlogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: this.state.userName, pw: this.state.password }),
        });
        const body = await response.text();
        
        this.setState({ responseToPost: body });
        if (this.state.responseToPost === "/admin" || this.state.responseToPost === "/main"){
            this.props.history.push('/home');
        }    
        else{
            this.props.history.push('/');
        }
        console.log(this.state)
      };

  render(){
    return (
        <div id="loginPage" className="Login">
           <div id="loginBox" className="container">
               <form id="loginForm" onSubmit={this.handleSubmit}>
                   <div className="text-center">
                       <img id="logoImage" src="photo/logo.png" alt="Malate Logo" /> 
                   </div>
   
                   <div className="form-group">
                       <label htmlFor="userName" className="font-weight-normal">username</label>
                       <input id="userName" name="userName" value={this.state.userName} type="text" className="form-control" onChange={this.handleChange} />
                   </div>
                   <div className="form-group">
                       <label htmlFor="password" className="font-weight-normal">password</label>
                       <input id="password" name="password" value={this.state.password} type="password" className="form-control" onChange={this.handleChange} />
                   </div>
                   <div className="text-right">
                       <input id="loginButton" value="LOGIN" type="submit" className="btn btn-secondary btn-lg col-5" />
                   </div>
               </form>
           </div>
       </div>
    );
  }
}

export default Login