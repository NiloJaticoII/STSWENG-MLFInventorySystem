import React, {Component} from 'react';
//import ArtistCard from './Components/Admin/ArtistCard';
<<<<<<< Updated upstream
//import LeftMenu from './Components/Admin/LeftMenu';
//import Banner from './Components/Admin/Banner';
//import Counter from './Components/Admin/Counter';
=======
import LeftMenu from './LeftMenu';
import Banner from './Banner';
>>>>>>> Stashed changes

class Admin extends Component {
  
    constructor(){
      super();
      this.state = {
        history: "/"
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
        <div id="mainPageBox">
<<<<<<< Updated upstream
            /*Banner */
            <div id="lowerSection" class="container d-flex flex-row mt-4">
                <div id="artistsList" class="card p-2" style="width: 60rem;">
                    /*ArtistCard */
                </div>
            /*LeftMenu */    
            </div>
=======
          <Banner />
          <div id="lowerSection" className="container d-flex flex-row mt-4">
              <div id="artistsList" className="card p-2" style={{width: "60rem"}}>
                 
              </div>
          <LeftMenu />    
          </div>
>>>>>>> Stashed changes
        </div> 
      );
    }
  }
  
  export default Admin;