import React, {Component} from 'react';

class testHome extends Component {
  
    constructor() {
        super()
        this.state = {
            
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:1337/login', {
          method: 'GET',
        });
        const body = await response.text();
        this.props.history.push("/");
      };

  render(){
    return (
        <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Logout" />
        </form>
    );
  }
}

export default testHome