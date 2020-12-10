import React, {Component} from 'react';
import ArtistCard from './Components/Admin/ArtistCard';
import LeftMenu from './Components/Admin/LeftMenu';
import Banner from './Components/Admin/Banner';
import Counter from './Components/Admin/Counter';

class Admin extends Component {
  
    constructor(){
      super();
      this.state = {
        history: "/"
      }
    }
    handleSubmit = async e => {
      e.preventDefault();
      const response = await fetch('http://localhost:1337/postAdmin', {
        method: 'GET',
      });
      const body = await response.text();
      this.props.history.push("/admin");
      console.log(this.state);
    };

    render(){
      return (
        <div id="mainPageBox">
            <Banner />
            <div id="lowerSection" class="container d-flex flex-row mt-4">
                <div id="artistsList" class="card p-2" style="width: 60rem;">
                    <ArtistCard />
                </div>
            <LeftMenu />    
            </div>
        </div> 
      );
    }
  }
  
  export default Admin;
  