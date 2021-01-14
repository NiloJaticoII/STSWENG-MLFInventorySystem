import React, {Component} from 'react';
import ArtistCardsList from '../Partials/artistCard';
import LeftMenu from './LeftMenu';
import Banner from '../Partials/Banner';

class Admin extends Component {
  
    constructor(){
      super();
      this.state = {
        history: "/",
        artist: {},
        artistItems: {},
        daysLeft: 0,
        hoursLeft: 0,
        minutesLeft:0,
        secondsLeft: 0,
        totalSeconds: 0,
        totalSold: 0,
        event: {},
        isAdmin: false
      }
    }

    componentDidMount() {
      document.title = 'Malate Literary Folio - Admin'
      this.getArtist()
      .then(res => 
        this.setState({
        artist: res.artist,
        artistItems: res.artistItems,
        daysLeft: res.daysLeft,
        hoursLeft: res.hoursLeft,
        minutesLeft:res.minutesLeft,
        secondsLeft: res.secondsLeft,
        totalSeconds: res.totalSeconds,
        totalSold: res.totalSold,
        event: res.event
      }), 
        this.setState({isAdmin:this.props.isAdmin, history: this.props.history} ))
      .catch(err => console.log(err)); 
    }

    getArtist = async () => {
      const response = await fetch('http://localhost:1337/admin');
      const body = await response.json();
      return body;
    };
    
    render(){
      return (
        <div id="mainPageBox">
          <Banner history={this.state.history}/>
              <div id="lowerSection" className="container d-flex flex-row mt-4">

                <div id="artistsList" className="card p-2" style={{width: "60rem"}}>
                    <ArtistCardsList artist={this.state.artist} artistItems={this.state.artistItems}/>
                </div>

                <LeftMenu admin={this.state.isAdmin} artist={this.state.artist} artistItems={this.state.artistItems}/>    
            </div>
        </div> 
      );
    }
  }
  
  export default Admin;