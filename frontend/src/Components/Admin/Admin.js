import React, {Component} from 'react';
import ArtistCardsList from '../Partials/artistCard';
import LeftMenu from './LeftMenu';
import Banner from '../Partials/Banner';

class Admin extends Component {
  
    constructor(){
      super();
      this.state = {
        history: "/"
      }
    }

    componentDidMount() {
      document.title = 'Malate Literary Folio - Admin'
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
        <div id="mainPageBox">
          <Banner />
          <div id="lowerSection" className="container d-flex flex-row mt-4">
              <div id="artistsList" className="card p-2" style={{width: "60rem"}}>
              <ArtistCardsList />
              </div>
          <LeftMenu />    
          </div>
        </div> 
      );
    }
  }
  
  export default Admin;