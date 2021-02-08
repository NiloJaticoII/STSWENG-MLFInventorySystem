import React, {Component} from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import config from "../../config";

class FinancialWindow extends Component{
    constructor(){
        super()
        this.state = {
            artists: [],
            currentArtistID: "",
            Amount: "",
            currentItem: "",
            currentType: "",
        }
    
        this.handleChange = this.handleChange.bind(this)
        this.handleAmountChange = this.handleAmountChange.bind(this)
        this.handleFinancialItem = this.handleFinancialItem.bind(this)
        this.addStocks = this.addStocks.bind(this)
      }
    
      handleChange(event) {
        this.setState({currentArtistID: event.target.value});
      }

      handleAmountChange(event) {
        this.setState({Amount: event.target.value});
      }
    
      componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.artists !== prevProps.artists) {
          this.setState({artists: this.props.artists})
        }
    }

    handleFinancialItem(itemID, itemType) {
        if (itemID !== this.state.currentItem) {         
            this.setState({currentItem: itemID,
                            currentType: itemType})
        }
    }

    addStocks = async e => {
        if (this.state.Amount > 0 && this.state.currentItem != "") {
            var details = {
                item: this.state.currentItem,
                itemType: this.state.currentType,
                value: this.state.Amount
            }

            const response = await fetch(config.API_URI + "/restockItem", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(details)
              });

              
              this.props.handleClose();
              alert("Success");
        } else if (this.state.currentItem == "") {
            alert('Error adding stocks Please select an artist and their item to restock.');
        } else {
            alert('Error adding stocks Please input a valid number of stocks to add.');
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
                        }).map(item => {
                            if(item._id == this.state.currentItem){
                                return (<LoadItemCards  key={item._id}
                                _id={item._id}
                                itemName={item.itemName} 
                                stocksQuantity={item.stockQuantity}
                                itemPrice={item.itemPrice}
                                itemPicture={item.itemPicture}
                                handleFinancialItem={this.handleFinancialItem}
                                itemType="item"
                                class="col mb-3 bg-secondary"/>)
                            }
                            else{
                                return(<LoadItemCards  key={item._id}
                                    _id={item._id}
                                    itemName={item.itemName} 
                                    stocksQuantity={item.stockQuantity}
                                    itemPrice={item.itemPrice}
                                    itemPicture={item.itemPicture}
                                    handleFinancialItem={this.handleFinancialItem}
                                    itemType="item"
                                    class="col mb-3"/>)
                            }
                        })  
                    }
                    
                    if(this.state.artists[i].bundles)
                    {
                        bundleList = this.state.artists[i].bundles.filter(function(bundle){
                            if (typeof bundle === 'undefined' || bundle === false) {
                            return false; // skip
                            }
                            return true;
                        }).map(bundle=> {
                            if(bundle._id == this.state.currentItem){
                               return (<LoadItemCards  key={bundle._id}
                                _id={bundle._id}
                                itemName={bundle.bundleName} 
                                stocksQuantity={bundle.bundleStock}
                                itemPrice={bundle.bundlePrice}
                                itemPicture={bundle.bundlePicture}
                                handleFinancialItem={this.handleFinancialItem}
                                itemType="bundle"
                                class="col mb-3 bg-secondary"/>)
                            }
                            else{
                                return (<LoadItemCards  key={bundle._id}
                                    _id={bundle._id}
                                    itemName={bundle.bundleName} 
                                    stocksQuantity={bundle.bundleStock}
                                    itemPrice={bundle.bundlePrice}
                                    itemPicture={bundle.bundlePicture}
                                    handleFinancialItem={this.handleFinancialItem}
                                    itemType="bundle"
                                    class="col mb-3"/>)
                            }
                        })
                         
                    }
                }
        }
    
        const artistOptions = this.state.artists.map(artist =>
            <LoadNames artistID={artist.artistID}
                artistName={artist.artistName} />
        )
        return (
            <Modal onHide={this.props.handleClose} show={this.props.show} size="lg" id="financialWindow">
                <Form>
                    <Modal.Header className="bg-secondary" closeButton>
                        <div id="artistSelectSection">
                            <select id="artistsListDropdown" class="form-control" name="financeSelectedArtist" onChange={this.handleChange} value={this.state.currentArtistID}>
                                <option value="" class="defaultVal" disabled selected>select artist</option>
                                {artistOptions}
                            </select>
                        </div>
                        <Modal.Title className="modal-title"></Modal.Title>
                    </Modal.Header>
    
                    <Modal.Body>
                        <div id="artistItemsSection">
                            <div id="otherInputSection">
                                <div id="itemList">
                                    <Form.Group>
                                        <Form.Label for="financialItemList" className="font-weight-normal">select one item</Form.Label>
                                        <Card id="financialItemList" className="card overflow-auto" style={{ height: "20rem" }} data-spy="scroll" data-offset="0">
                                            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 itemGrid" id="financialItem">
                                            {bundleList}
                                            {itemList}
                                            </div>
                                        </Card>
                                    </Form.Group>
                                </div>
                                <div id="textFields">
                                    <Form.Group>
                                        <Form.Label for="newPriceStock" className="font-weight-normal">quantity to add</Form.Label>
                                        <Form.Control required id="newPriceStock" className="form-control" type="number" min={1} step="1" value={this.state.Amount} onChange={this.handleAmountChange} />
                                    </Form.Group>
                                </div>
    
                            </div>
                        </div>
                    </Modal.Body>
    
                    <Modal.Footer>
                        <Button id="addStocks" className="btn btn-secondary btn-sm col-2" value="save" onClick={this.addStocks}>save</Button>
                    </Modal.Footer>
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
        <div className={props.class} id={props._id + "-financialItem"} style={{padding: "5px"}}>
            <div className="card">
                <img src={props.itemPicture} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title"> {props.itemName} </h5>
                    <p className="card-text">PHP {props.itemPrice.toFixed(2)}</p>
                    <p className="card-text">{props.stocksQuantity} left</p>
                    <a href="#" class="stretched-link" onClick={()=>props.handleFinancialItem(props._id, props.itemType)} style={{size: "0px"}}></a>
                </div>
            </div>
        </div>
    )
}

export default FinancialWindow
