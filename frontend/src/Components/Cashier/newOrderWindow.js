import React, {Component} from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import config from '../../config'

class NewOrderWindow extends Component{
  
  constructor(){
        super()
        this.state = {
            artists: [],
            purchases: [],
            currentQty: [],
            totalPrice: 0,
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
    }

    handleCloseModified() {
        this.setState({ purchases: [] })
        this.props.handleClose();
    }

    render(){
        var itemList = [];
        var bundleList = [];

        //var totalPrice = 0;

        const LoadItemCards = (props) => {
            const list = props.purchases
            const currentQty = props.currentQty;
            const totalPrice = props.totalPrice;

            return (
                <div class="col mb-3" id={props._id + "-buyItem"} style={{ padding: "5px" }}>
                    <Card>
                        <img src={props.itemPicture} className="card-img-top" alt="..." />
                        <Card.Body>
                            <Card.Title> {props.itemName} </Card.Title>
                            <Card.Text>PHP {props.itemPrice.toFixed(2)}</Card.Text>
                            <Card.Text>{props.stocksQuantity} left</Card.Text>
                            <a href="#" className="stretched-link" onClick={() => {
                                /*if (list.length != 0) {
                                    var cartItemFound = false;

                                    for (var i = 0; i < list.length; i++) {
                                        if (list[i].props._id == newPurchase._id) {
                                            currentQty[i] = currentQty[i] + 1;
                                            Object.assign(list[i].props.currentQty, currentQty[i]);
                                            cartItemFound = true;
                                        }
                                    }
                                    if (!cartItemFound) {
                                        currentQty.push(1);
                                        var newPurchase = <AddedItem _id={props._id} itemName={props.itemName} itemPrice={props.itemPrice} currentQty={currentQty[0]} purchases={list} />
                                        list.push(newPurchase)
                                        Object.assign(list[0].props.currentQty, currentQty[0]);
                                    }
                                }
                                else {
                                    currentQty.push(1);
                                    var newPurchase = <AddedItem _id={props._id} itemName={props.itemName} itemPrice={props.itemPrice} currentQty={currentQty[0]} purchases={list} />
                                    list.push(newPurchase)
                                    Object.assign(list[0].props.currentQty, currentQty[0]);
                                }*/
                                currentQty.push(1);
                                var newPurchase = <AddedItem _id={props._id} itemName={props.itemName} itemPrice={props.itemPrice} currentQty={currentQty[0]} purchases={list} totalPrice={totalPrice} />
                                list.push(newPurchase)
                                //totalPrice = newPurchase.showCurrentPrice + totalPrice;
;                            }}></a>
                        </Card.Body>
                    </Card>
                </div>
            )
        }

        const AddedItem2 = (props) => {
            var currentVar = props.currentQty;

            return (
                <tr id={props._id + "Cart"}>
                    <td>
                        <Button className='close' variant="light"><span>&times;</span></Button>
                    </td>
                    <td id={props._id + "Quantity"}>({currentVar}) {props.itemName} </td>
                    <td id={props._id + "Total"} className='text-right'> {props.itemPrice.toFixed(2)} </td>
                    <td><Button className='minusQuantity' onClick={() => { }} variant="light"><span className="font-weight-bold">-</span></Button></td>
                    <td><Button className='plusQuantity' onClick={() => {
                        currentVar = currentVar + 1;
                    }} variant="light"><span className="font-weight-bold">+</span></Button></td>
                </tr>
            );
        }

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
                        }).map(item => <LoadItemCards key={item._id}
                            _id={item._id}
                            itemName={item.itemName}
                            stocksQuantity={item.stockQuantity}
                            itemPrice={item.itemPrice}
                            itemPicture={item.itemPicture}
                            purchases={this.state.purchases}
                            currentQty={this.state.currentQty}
                            totalPrice={this.state.totalPrice}
                            />)  
                    }
                
                    if(this.state.artists[i].bundles)
                    {
                        bundleList = this.state.artists[i].bundles.filter(function (bundle) {
                            if (typeof bundle === 'undefined' || bundle === false) {
                                return false; // skip
                            }
                            return true;
                        }).map(bundle => <LoadItemCards key={bundle._id}
                            _id={bundle._id}
                            itemName={bundle.bundleName}
                            stocksQuantity={bundle.bundleStock}
                            itemPrice={bundle.bundlePrice}
                            itemPicture={bundle.bundlePicture}
                            purchases={this.state.purchases}
                            currentQty={this.state.currentQty}
                            totalPrice={this.state.totalPrice}
                            />)  
                    }
                }
        }

        const artistOptions = this.state.artists.map(artist =>
            <LoadNames artistID={artist.artistID}
                artistName={artist.artistName} />
        )

        /*for (var i = 0; i < this.state.purchases.length; i++) {
            totalPrice = totalPrice + (this.state.purchases[i].props.itemPrice * this.state.purchases[i].props.currentQty);
            console.log(this.state.purchases[i].props.currentQty)
        }*/

        /*function close(props) {
            props.setState({ purchases: [] })
        }*/
        var totalPrice = this.state.totalPrice;
        for (var i = 0; i < this.state.purchases.length; i++) {
            var currentPrice = this.state.purchases[i].showCurrentPrice;
            totalPrice = totalPrice + currentPrice;
            console.log(totalPrice)
        }

        return (
            <Modal onHide={this.handleCloseModified.bind(this)} show={this.props.show} size="xl" id="newOrderWindow">
                <Form id="artistSelect" className="form" method='POST' action="/orderCheckOut">
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-body d-flex flex-col">
                        <Card id="buySection" className="card" style={{ width: "60rem", height: "30rem" }}>
                            <Card.Header id="buyArtistSection" className="card-header bg-secondary">
                                <select id="artistsListDropdown" className="form-control" defaultValue={'select artist'} name="selectedArtist" onChange={this.handleChange} value={this.state.currentArtistID}>
                                    <option value="" className="defaultVal" value='select artist' disabled>select artist</option>
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
                            <div style={{ 'overflowY': "auto", 'overflowX': "hidden" }}>
                                <CheckoutTable>
                                    {this.state.purchases}
                                </CheckoutTable>
                            </div>
                            <div className="mt-auto">
                                <table id="totalItems" className="card-title table">
                                    <tbody>
                                        <tr>
                                            <th>total</th>
                                            <th id="totalPrice" className='text-right'>{totalPrice.toFixed(2)}</th>
                                        </tr>
                                    </tbody>
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

class CheckoutTable extends Component {
    render() {
        return (
            <table id="checkoutItemsList" className="table table-borderless table-sm" >
                {this.props.children}
            </table>
        )
    }
}

class AddedItem extends Component{
    constructor(props) {
        super(props);

        this.state = {
            currentQty: props.currentQty,
            currentPrice: props.itemPrice,
            totalPrice: props.totalPrice,
            isOpen: false
        };

        this.increaseValue = this.increaseValue.bind(this)
        this.decreaseValue = this.decreaseValue.bind(this)
        //this.newItemInit = this.newItemInit.bind(this)
    }

    increaseValue() {
        var currentQty = this.state.currentQty
        var currentPrice = this.state.currentPrice
        var totalPrice = this.state.totalPrice

        currentQty = currentQty + 1;
        currentPrice = this.props.itemPrice * currentQty
        totalPrice = totalPrice + currentPrice

        //console.log(totalPrice)
        
        this.setState({ currentQty: currentQty, currentPrice: currentPrice, totalPrice: totalPrice })
        this.showCurrentPrice.bind(this)
        
    }

    decreaseValue() {
        var currentQty = this.state.currentQty
        var currentPrice = this.state.currentPrice
        var totalPrice = this.state.totalPrice

        if (currentQty > 1) {
            currentQty = currentQty - 1;
        }

        currentPrice = this.props.itemPrice * currentQty
        totalPrice = totalPrice + currentPrice

        //console.log(totalPrice)

        this.setState({ currentQty: currentQty, currentPrice: currentPrice, totalPrice: totalPrice })
        this.showCurrentPrice.bind(this)
    }

    showCurrentPrice() {
        return this.state.currentPrice;
    }

    removeFromCart = () => {
        console.log("Removed?");
        console.log(this.props._id);

        var list = this.props.purchases;

        console.log(list);

        for (var i = 0; i < list.length; i++) {
            if (list[i].props._id == this.props._id) {
                console.log("Found!");
                list.splice(i, 1);
            }
        }

        this.handleClose();
    }

    handleClose = () => {
        this.setState({ isOpen: false })
    }

    
    render() {
        console.log("Changed value: " + this.state.currentQty)
        //console.log("List: " + this.props.purchases)
        //console.log("List: " + (this.props.purchases instanceof Array))
        var currentPrice = this.state.currentPrice
        var totalPrice = this.state.totalPrice;

        console.log(this.state.currentPrice)

        totalPrice = currentPrice + totalPrice;

        return (
            <tr id={this.props._id + "Cart"} >
                <td>
                    <Button className='close' onClick={this.removeFromCart.bind(this)} variant="light"><span>&times;</span></Button>
                </td>
                <td id={this.props._id + "Quantity"}>({this.state.currentQty}) {this.props.itemName} </td>
                <td id={this.props._id + "Total"} className='text-right'> {currentPrice.toFixed(2)} </td>
                <td><Button className='minusQuantity' onClick={this.decreaseValue.bind(this)} variant="light"><span className="font-weight-bold">-</span></Button></td>
                <td><Button className='plusQuantity' onClick={this.increaseValue.bind(this)} variant="light"><span className="font-weight-bold">+</span></Button></td>
            </tr>
        );
    }
}

export default NewOrderWindow
