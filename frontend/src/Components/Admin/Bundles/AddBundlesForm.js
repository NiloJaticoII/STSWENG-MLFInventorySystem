import React, {Component} from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import config from '../../../config';

class AddBundlesForm extends Component {
  
    constructor() {
        super()
        this.state = {
            artists:[],
            currentArtistID: '',
            eventID: '',
            includedItems: [],
            newBundleName: '',
            newBundlePriceStock: 0.0,
            newBundleSold: 0,
            newBundleStockQuantity: 0,
            newBundlePicture: 'photo/item-photo.png',
            reponseToPost: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeArtist = this.handleChangeArtist.bind(this)
        this.handlePhoto = this.handlePhoto.bind(this)
        this.getArtist = this.getArtist.bind(this)
        this.getItems = this.getItems.bind(this)
        this.handleItem = this.handleItem.bind(this)
        this.addToBundle = this.addToBundle.bind(this)
    }

    handleItem(/*itemID, itemType*/) {
        console.log('hi')
        /*
        if (itemID !== this.state.currentItem) {         
            this.setState({currentItem: itemID,
                            currentType: itemType})
        } */
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleChangeArtist(event) {
        this.setState({currentArtistID: event.target.value});
    }
    handlePhoto(url){
        this.setState({newBundlePicture:url})
    }


    addToBundle(props){
        var items = this.state.includedItems
        var goOut = false
        for(let i=0; i < items.length; i++){
            if(props._id == items[i]._id)
                goOut = true
        }
        if(!goOut){
            var item = {_id: props._id,
            itemName: props.itemName,
            stockQuantity: props.stocksQuantity,
            itemPrice: props.itemPrice,
            itemPicture: props.itemPicture,
            artistID: this.state.currentArtistID,
            eventID: this.state.eventID,
            itemSold: 0,
            }
            items.push(item)
            this.setState({includedItems: items})

        }
        
    }
    handleSubmit = async e => {
        e.preventDefault();
       /*
        if (this.state.newBundleName !== '' && this.state.newBundlePriceStock && this.state.newBundlePicture !== '') {
            alert('add event')
            const response = await fetch('/admin/getBundle/?bundleName='+this.state.newBundleName+ "&projection=_id newBundleName", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              const body = await response.text();
              
              this.setState({ responseToPost: body });
              
              if(this.state.responseToPost === "false"){
                  this.addBundle();                
              }
              else {
                    alert('Error adding Bundle','Bundle already exist. Please type in another bundle'); //change to SWEET ALERT
                     e.preventDefault();
              } 
        }
        */
    };

    addBundle = async e => {
        const addResponse = await fetch('/admin/addBundle', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({artistID: this.state.currentArtistID, eventID: this.state.eventID, includedItems: this.state.includedItems, bundleName: this.state.newBundleName, bundlePrice: this.state.newBundlePriceStock, bundleSold: this.state.newBundleSold, bundleStock: this.state.newBundleStockQuantity, bundlePicture: this.state.newBundlePicture}),
                      });
                      const body = await addResponse.text();
        
                      this.setState({ responseToPost: body });
    
                      if (this.state.responseToPost) {
                        window.location = '/admin';
                      }
      }

    componentDidMount() {
      this.getArtist()
      .then(res => 
        this.setState({
        artists: res.artist,
      })); 
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
        for(let i=0; i < this.state.artists.length; i++)
        {
            const itemsResponse = await fetch(config.API_URI + '/getItems/?artistID='+this.state.artists[i].artistID + "&projection=itemName itemPrice itemsSold stockQuantity itemPicture", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const itemsBody = await itemsResponse.json();
              this.state.artists[i].items = itemsBody;
        }
      }
    
  render(){

    const artistOptions = this.state.artists.map(artist =>
        <LoadNames key={artist.artistID} artistID={artist.artistID}
            artistName={artist.artistName} />
    )

    var itemList = [];
    var bundleList = [];
        
    for(let i=0; i < this.state.artists.length; i++)
        {
            
                if(this.state.artists[i].artistID == this.state.currentArtistID)
                {
                    /*
                    console.log("items:")
                    console.log(this.state.artists[i].items) */
                    if(this.state.artists[i].items)
                    {
                        itemList = this.state.artists[i].items.filter(function(item){
                            if (typeof item === 'undefined' || item === false) {
                            return false; // skip
                            }
                            return true;
                        }).map(item => <LoadItemCards key={item._id}
                            _id={item._id}
                            itemName={item.itemName}
                            stocksQuantity={item.stockQuantity}
                            itemPrice={item.itemPrice}
                            itemPicture={item.itemPicture}
                            purchases={this.state.purchases}
                            currentQty={this.state.currentQty}
                            totalPrice={this.state.totalPrice}
                            addToBundle = {this.addToBundle}
                            />)
                    }
                }
        }
    
        console.log(this.state.includedItems)
    return (
        <div id="addBundlesSection" className="tab-pane fade" role="tabpanel" aria-labelledby="addBundleOption">
        <form id="addArtistSelectBundle" className="form" method='POST' action="/admin/addBundle" encType="multipart/form-data">
            <h5 className="modal-title">Add bundle</h5>
            <p id="manageReminder">Fill in the form below before adding a new bundle.</p>
            <div id="otherInputSection" className="mt-3">
                <div className="row">
                    <div className="col mt-2">
                        <div className="form-group mb-2">
                            <select id="artistsListDropdownBundleAdd" className="form-control" name="artistsListDropdownBundleAdd" value={this.state.currentArtistID} onChange={this.handleChangeArtist} required>
                                <option className="defaultVal" disabled defaultValue >select artist</option>
                               {artistOptions}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row selectedSection">
                    <div id="textFields" className="col" style={{width: "500px"}}>
                        <div className="form-group mb-2">
                            <label htmlFor="newBundleName" className="font-weight-normal mr-2">bundle name</label>
                            <input name="newBundleName" id="newBundleName" className="form-control col-11 clearInput" value={this.state.newBundleName} onChange={this.handleChange} type="text" required  />
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
                            <img name="newBundlePhoto" id="newBundlePhoto" className = "photos" src={this.state.newBundlePicture} />
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
                                        
                                        {itemList}
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

function LoadItemCards(props) {
    return (
        <div className={props.class} id={props._id + "-financialItem"} style={{padding: "5px"}}>
            <div className="card">
                <img src={props.itemPicture} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title"> {props.itemName} </h5>
                    <p className="card-text">PHP {props.itemPrice.toFixed(2)}</p>
                    <p className="card-text">{props.stocksQuantity} left</p>
                    <a href="#" class="stretched-link" onClick={()=> props.addToBundle(props)}style={{size: "0px"}}></a>
                </div>
            </div>
        </div>
    )
}
/* onClick={()=> props.handleItem(props._id, props.itemType)}  */

export default AddBundlesForm