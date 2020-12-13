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
      }

    render() {
      
        console.log(this.state.artist)
        const artistCards = this.state.artist.map(artist => <ArtistCard   key={artist.artistID}
                                                                          artistName={artist.artistName}
                                                                          income={artist.income} 
                                                                          items= {[]}/>)                                              
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
                    <table class="table table-bordered">
                        <thead class="thead bg-secondary text-light">
                            <tr>
                                <th scope="col">Item/Bundle</th>
                                <th scope="col">Stocks</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity sold</th>
                            </tr>
                        </thead>
                        <tbody id="artistSales" >
                            
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    );
}

function ArtistItems(props) {
    return(
    <tr>
        <th> <img src={props.itemPicture} className="card-img-top" alt="..."/> </th> 
        <th> {props.itemName}       </th>
        <th> PHP {props.itemPrice}  </th>
        <th> {props.itemsSold} </th>
    </tr>    
    );
}

export default ArtistCardsList;
