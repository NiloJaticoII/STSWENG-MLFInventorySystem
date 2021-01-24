// JavaScript source code
import React, { Component, useState } from 'react';
import { Modal} from 'react-bootstrap'
import config from '../../config'

class ArtistCardsList extends Component {
    constructor(){
        super();
        this.state ={
            artist: [],
        }
    }
    
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.artist !== prevProps.artist) {
          this.setState({artist: this.props.artist})
        }
        this.getArtistItems();
      }

    getArtistItems = async e => {

        for(let i=0; i < this.state.artist.length; i++)
        {
            const itemsResponse = await fetch(config.API_URI + '/getItems/?artistID='+this.state.artist[i].artistID + "&projection=itemName itemPrice itemsSold stockQuantity", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const itemsBody = await itemsResponse.json();
              this.state.artist[i].items = itemsBody;

              const bundlesResponse = await fetch(config.API_URI + '/getBundles/?artistID='+this.state.artist[i].artistID + "&projection=bundleName bundlePrice bundleSold bundleStock", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const bundlesBody = await bundlesResponse.json();
              this.state.artist[i].bundles = bundlesBody;
        }
    }

    render() {
        const artistCards = this.state.artist.map(artist => <ArtistCard   key={artist.artistID}
                                                                          artistName={artist.artistName}
                                                                          income={artist.income} 
                                                                          items={artist.items}
                                                                          bundles={artist.bundles}/>)                                           
        return (
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 p-2 mx-1 w-100">
                {artistCards}
            </div>
        );
    }
}

function ArtistCard(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var itemList = [];
    var bundleList = [];

    if(props.items)
    {
        itemList = props.items.filter(function(item){
            if (typeof item === 'undefined' || item === false) {
              return false; // skip
            }
            return true;
          }).map(item => <ArtistCardItem  key={item._id}
            itemName={item.itemName} 
            stocksQuantity={item.stockQuantity}
            itemPrice={item.itemPrice}
            itemsSold={item.itemsSold}/>)  
    }
    
    if(props.bundles)
    {
        bundleList = props.bundles.filter(function(bundle){
            if (typeof bundle === 'undefined' || bundle === false) {
              return false; // skip
            }
            return true;
          }).map(bundle=> <ArtistCardItem  key={bundle._id}
            itemName={bundle.bundleName} 
            stocksQuantity={bundle.bundleStock}
            itemPrice={bundle.bundlePrice}
            itemsSold={bundle.bundleSold}/>)  
    }

    return (
        <>
            <div className="col mb-2 px-2" id="{{artistID}}-card">
                <div className="card mx-0">
                    <div className="card-body">
                        <h5>{props.artistName}</h5>
                        <p className="card-text"><b>PHP {props.income} </b> </p>
                        <a href="#" className="stretched-link" onClick={handleShow} style={{ size: "0px"}}></a>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} id="artistModal">
                <Modal.Header closeButton>
                    <Modal.Title id="artistModalTitle">{props.artistName}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <table className="table table-bordered">
                        <thead className="thead bg-secondary text-light">
                            <tr>
                                <th scope="col">Item/Bundle</th>
                                <th scope="col">Stocks</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity sold</th>
                            </tr>
                        </thead>
                        <tbody id="artistSales" >
                            {itemList}
                            {bundleList}
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    );
}

function ArtistCardItem(props) {
    return(
    <tr>
        <td> {props.itemName}       </td>
        <td> {props.stocksQuantity} </td>
        <td> PHP {props.itemPrice}  </td>
        <td> {props.itemsSold} </td>
    </tr>    
    );
}

export default ArtistCardsList;
