import React, {Component} from 'react';
import config from '../../../config';

class AddBundlesForm extends Component {
  
    constructor() {
        super()
        this.state = {
            artists: [],
            currentArtist: '',
            newBundleName: '',
            newBundlePriceStock: '',
            newBundleStockQuantity: '',
            src:"photo/item-photo.png",
            reponseToPost: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handlePhoto = this.handlePhoto.bind(this)
        this.getArtist = this.getArtist.bind(this)
        //this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handlePhoto(url){
        this.setState({src:url})
    }

    componentDidMount() {
      this.getArtist()
      .then(res => 
        this.setState({
        artists: res.artist,
      })); 
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
      
    /*
    handleSubmit = async e => {
        e.preventDefault();

        if (this.state.newArtistName !== '' && this.state.newArtistIDNo!== '' && this.state.newArtistPassword !== '') {

            const response = await fetch('/admin/getArtist/?artistID='+this.state.newArtistIDNo + "&projection=_id artistID artistName", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const body = await response.text();
              
              this.setState({ responseToPost: body });
              
              if(this.state.responseToPost === "false"){
                  this.addArtist();                
              }
              else {
                    alert('Error adding artist','Artist ID already exist. Please type in another artist ID'); //change to SWEET ALERT
                     e.preventDefault();
              } 
        }
      };

  addArtist = async e => {
    const addResponse = await fetch('/admin/addArtist', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({newArtistIDNo: this.state.newArtistIDNo, newArtistName: this.state.newArtistName, newArtistPassword: this.state.newArtistPassword}),
                  });
                  const body = await addResponse.text();
    
                  this.setState({ responseToPost: body });

                  if (this.state.responseToPost) {
                    window.location = '/admin';
                  }
  }
  */

  render(){

    const artistOptions = this.state.artists.map(artist =>
        <LoadNames key={artist.artistID} artistID={artist.artistID}
            artistName={artist.artistName} />
    )
    
    return (
        <div id="addBundlesSection" className="tab-pane fade" role="tabpanel" aria-labelledby="addBundleOption">
        <form id="addArtistSelectBundle" className="form" method='POST'  encType="multipart/form-data">
            <h5 className="modal-title">Add bundle</h5>
            <p id="manageReminder">Fill in the form below before adding a new bundle.</p>
            <div id="otherInputSection" className="mt-3">
                <div className="row">
                    <div className="col mt-2">
                        <div className="form-group mb-2">
                            <select id="artistsListDropdownBundleAdd" className="form-control" name="artistsListDropdownBundleAdd" required>
                                <option className="defaultVal" value="" disabled defaultValue>select artist</option>
                               {artistOptions}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row selectedSection">
                    <div id="textFields" className="col" style={{width: "500px"}}>
                        <div className="form-group mb-2">
                            <label htmlFor="newBundleName" className="font-weight-normal mr-2">bundle name</label>
                            <input name="newBundleName" id="newBundleName" className="form-control col-11 clearInput" type="text" value={this.state.newBundleName} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="newBundlePriceStock" className="font-weight-normal mr-2">price</label>
                            <input name="newBundlePriceStock" id="newBundlePriceStock" className="form-control col-11 clearInput" type="number"  value={this.state.newBundlePriceStock} onChange={this.handleChange} min="0" max="99999999" required />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="newBundleStockQuantity" className="font-weight-normal mr-2">quantity</label>
                            <input name="newBundleStockQuantity" id="newBundleStockQuantity" className="form-control col-11 clearInput" type="number" value={this.state.newBundleStockQuantity} onChange={this.handleChange} min="0" max="99999999" required />
                        </div>
                    </div>
                    <div id="BundlePhotoPicker2" className="col m-4">
                        <div className="d-flex justify-content-center">
                            <img name="newBundlePhoto" id="newBundlePhoto" className = "photos" src={this.state.src} />
                        </div>
                        <div className="custom-file mt-2">
                            <input name="addBundlePhotoPicker" id="addBundlePhotoPicker" type="file" className="custom-file-input clearInput"onChange={()=>this.handlePhoto(window.URL.createObjectURL(document.getElementById("addBundlePhotoPicker").files[0]))} required />
                            <label className="custom-file-label " htmlFor="addBundlePhotoPicker">Choose photo</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input type="hidden" id="addSelectedItems" name="addSelectedItems" value="" />
                        <div id="addBundleItemsSection">
                            <div className="form-group">
                                <label htmlFor="addBundleItemsSection" className="font-weight-normal">select bundle items</label>
                                <div id="addBundleItemsSection" className="card overflow-auto" style={{height: "10rem"}} data-spy="scroll" data-offset="0">
                                    <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 itemGrid" id="addSelectBundleItems">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button name="addBundleButton" id="addBundleButton" className="btn btn-secondary btn-md col-6 mt-4 mb-2 float-right" type="submit">save</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    );
  }
}

function LoadNames(props) {
    return (
        <option value={props.artistID}>{props.artistName}</option>
    );
}

export default AddBundlesForm