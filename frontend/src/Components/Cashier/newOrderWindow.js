import React, {Component} from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import config from '../../config'

class NewOrderWindow extends Component{
  
  constructor(){
    super()
    this.state = {
        artists: [],
        currentArtistID: "",
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({currentArtistID: event.target.value});
}

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.artists !== prevProps.artists) {
      this.setState({artists: this.props.artists})
    }

    this.getArtistItems();
}

getArtistItems = async e => {

  for(let i=0; i < this.state.artists.length; i++)
  {
      const itemsResponse = await fetch(config.API_URI + '/getItems/?artistID='+this.state.artists[i].artistID + "&projection=_id itemName itemPrice stockQuantity itemPicture", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const itemsBody = await itemsResponse.json();
        this.state.artists[i].items = itemsBody;

        const bundlesResponse = await fetch(config.API_URI + '/getBundles/?artistID='+this.state.artists[i].artistID + "&projection=_id bundleName bundlePrice bundleStock bundlePicture", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const bundlesBody = await bundlesResponse.json();
        this.state.artists[i].bundles = bundlesBody;
  }
}
  
 

render(){

    var itemList = [];
    var bundleList = [];

    for(let i=0; i < this.state.artists.length; i++)
    {
            if(this.state.artists[i].artistID == this.state.currentArtistID)
            {
                if(this.state.artists[i].items)
                {
                    itemList = this.state.artists[i].items.filter(function(item){
                        if (typeof item === 'undefined' || item === false) {
                        return false; // skip
                        }
                        return true;
                    }).map(item => <LoadItemCards  key={item._id}
                        _id={item._id}
                        itemName={item.itemName} 
                        stocksQuantity={item.stockQuantity}
                        itemPrice={item.itemPrice}
                        itemPicture={item.itemPicture}/>)  
                }
                
                if(this.state.artists[i].bundles)
                {
                    bundleList = this.state.artists[i].bundles.filter(function(bundle){
                        if (typeof bundle === 'undefined' || bundle === false) {
                        return false; // skip
                        }
                        return true;
                    }).map(bundle=> <LoadItemCards  key={bundle._id}
                        _id={bundle._id}
                        itemName={bundle.bundleName} 
                        stocksQuantity={bundle.bundleStock}
                        itemPrice={bundle.bundlePrice}
                        itemPicture={bundle.bundlePicture}/>)  
                }
            }
    }

    const artistOptions = this.state.artists.map(artist =>
        <LoadNames artistID={artist.artistID}
            artistName={artist.artistName} />
    )

    return (
        <Modal onHide={this.props.handleClose} show={this.props.show} size="lg" id="newOrderWindow">
            <Form id="artistSelect" className="form" method='POST' action="/orderCheckOut">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="modal-body d-flex flex-col">
                    <Card id="buySection" className="card" style={{ width: "60rem", height: "30rem" }}>
                        <Card.Header id="buyArtistSection" className="card-header bg-secondary">
                            <select id="artistsListDropdown" className="form-control" name="selectedArtist" onChange={this.handleChange} value={this.state.currentArtistID}>
                                <option value="" className="defaultVal" disabled selected>select artist</option>
                                    {artistOptions}
                            </select>
                        </Card.Header>
                        <Card.Body id="buyItemSection" className="card-body overflow-auto">
                            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 itemGrid" id="buyItem">
                                {bundleList}
                                {itemList}
                            </div>
                        </Card.Body>
                    </Card>
                    <Card id="checkoutSection align-items-end" className="card p-4" style={{ width: "30rem", height: "30rem" }}>
                        <Card.Title>items</Card.Title>
                        <div style={{ 'overflow-y': "auto", 'overflow-x': "hidden" }}>
                            <table id="checkoutItemsList" className="table table-borderless table-sm">
                             
                            </table>
                        </div>
                        <div className="mt-auto">
                            <table id="totalItems" class="card-title table">
                                <tr>
                                    <th>total</th>
                                    <th id="totalPrice" className='text-right'>0</th>
                                </tr>
                            </table>
                            <Button className="btn btn-secondary col-sm-8" id="checkoutBtn" type="button" value="check out">check out</Button>
                        </div>
                    </Card>
                </Modal.Body>
            </Form>
        </Modal>
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
        <div class="col mb-3" id={props._id + "-buyItem"} style={{padding: "5px"}}>
            <div class="card">
                <img src={props.itemPicture} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title"> {props.itemName} </h5>
                    <p class="card-text">PHP {props.itemPrice.toFixed(2)}</p>
                    <p class="card-text">{props.stocksQuantity} left</p>
                </div>
            </div>
        </div>
    )
}

export default NewOrderWindow
