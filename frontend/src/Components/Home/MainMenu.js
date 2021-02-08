import React, {Component} from 'react';
import ArtistCardsList from '../Partials/artistCard';
import LeftMenu from './LeftMenu';
import Banner from '../Partials/Banner';
import config from '../../config';

class MainMenu extends Component {
  
    constructor(){
      super();
      this.state = {
        history: "/",
        artist: [],
        artistItems: [],
        daysLeft: 0,
        hoursLeft: 0,
        minutesLeft:0,
        secondsLeft: 0,
        totalSeconds: 0,
        totalSold: 0,
        event: [],
        isAdmin: false
      }

      this.getArtist = this.getArtist.bind(this)
      this.getItems = this.getItems.bind(this)
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
        this.setState({isAdmin:this.props.isAdmin, history: this.props.history}))
      .catch(err => console.log(err)); 
    }

    componentDidUpdate(){
      this.getItems()
    }

    getArtist = async () => {
      const response = await fetch(config.API_URI + '/admin/getHome', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const body = await response.json();
      return body;
    };

    getItems = async () => {
      for(let i=0; i < this.state.artist.length; i++)
      {
          const itemsResponse = await fetch(config.API_URI + '/getItems/?artistID='+this.state.artist[i].artistID + "&projection=itemName itemPrice itemsSold stockQuantity itemPicture", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const itemsBody = await itemsResponse.json();
            this.state.artist[i].items = itemsBody;

            const bundlesResponse = await fetch(config.API_URI + '/getBundles/?artistID='+this.state.artist[i].artistID + "&projection=bundleName bundlePrice bundleSold bundleStock bundlePicture", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const bundlesBody = await bundlesResponse.json();
            this.state.artist[i].bundles = bundlesBody;
      }
    }
    
    render(){
      return (
        <div id="mainPageBox">
          <Banner history={this.state.history} totalSold={this.state.totalSold}/>
              <div id="lowerSection" className="container d-flex flex-row mt-4">

                <div id="artistsList" className="card p-2" style={{width: "60rem"}}>
                    <ArtistCardsList artist={this.state.artist} artistItems={this.state.artistItems}/>
                </div>

                <LeftMenu admin={this.state.isAdmin} artist={this.state.artist} />    
            </div>
        </div> 
      );
    }
  }
  
  export default MainMenu;