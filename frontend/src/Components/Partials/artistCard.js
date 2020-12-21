// JavaScript source code
import React, { Component, useState } from 'react';
import { Modal,  Form, Card, Button, Nav } from 'react-bootstrap'

class ArtistCardsList extends Component {
    constructor(){
        super();
        this.state ={
            artist: [],
            artistItems:[]
        }
    }
    
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.artist !== prevProps.artist) {
          this.setState({artist: this.props.artist, artistItems: this.props.artistItems})
        }

        for(let i=0; i < this.state.artistItems.length; i++)
        {
            for(let j=0; j < this.state.artist.length; j++)
            {
                if(this.state.artistItems[i].artistID == this.state.artist[j].artistID)
                {
                    this.state.artist[j].items = this.state.artistItems[i].item
                }
            }
        }  
      }

    render() {
        console.log(this.state.artist)
        const artistCards = this.state.artist.map(artist => <ArtistCard   key={artist.artistID}
                                                                          artistName={artist.artistName}
                                                                          income={artist.income} 
                                                                          items={artist.items}/>)                                              
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
    var itemList = []

    if(props.items)
    {
        itemList = props.items.map(item => <ArtistCardItem  key={item.itemID}
            itemName={item.itemName} 
            itemPrice={item.itemPrice}
            stocksQuantity={item.stocksQuantity}/>)  
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
