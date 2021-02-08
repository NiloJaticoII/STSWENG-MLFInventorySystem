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
            totalPriceArray: [],
            currentArtistID: "",
            responseToPost: "",
        }

      this.handleChange = this.handleChange.bind(this)

      this.updateTotalPrice = this.updateTotalPrice.bind(this)
      this.decreaseTotalPrice = this.decreaseTotalPrice.bind(this)
      this.updateQty = this.updateQty.bind(this)
      this.removeCartItem = this.removeCartItem.bind(this)
      this.checkOut=this.checkOut.bind(this)
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
        this.setState({ purchases: [], totalPriceArray: [] })
        this.props.handleClose();
    }

    updateTotalPrice(curTotalPrice) {
        var totalPrice = this.state.totalPrice;

        totalPrice = totalPrice + curTotalPrice;
        this.setState({totalPrice: totalPrice })
    }

    decreaseTotalPrice(itemPrice) {
        var totalPrice = this.state.totalPrice;

        totalPrice = totalPrice - itemPrice;

        this.setState({ totalPrice: totalPrice })
    }

    updateQty(itemId, curQty) {
        for (let i = 0; i < this.state.purchases.length; i++) {
            if (itemId == this.state.purchases[i]._id) {
                this.state.purchases[i].currentQty += curQty;
            }
        }
    }

    removeCartItem(itemId) {
        var totalPrice = this.state.totalPrice;
        for (let i = 0; i < this.state.purchases.length; i++) {
            if (itemId == this.state.purchases[i]._id) {
                console.log("Removed!")
                totalPrice = totalPrice - (this.state.purchases[i].itemPrice * this.state.purchases[i].currentQty)

                this.state.purchases.splice(i, 1);
                break;
            }
        }

        this.setState({ purchases: this.state.purchases, totalPrice: totalPrice })
    }

    checkOut = async e =>{
        e.preventDefault();
        const response = await fetch(config.API_URI + '/orderCheckout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({items: this.state.purchases}),
        });
        const body = await response.text();

        this.setState({ responseToPost: body });

        if (this.state.responseToPost) {
            window.location = '/admin';
          }
    }

    render(){
        var itemList = [];
        var bundleList = [];

        const LoadItemCards = (props) => {
            const list = props.purchases

            return (
                <div class="col mb-3" id={props._id + "-buyItem"} style={{ padding: "5px" }}>
                    <Card>
                        <img src={props.itemPicture} className="card-img-top" alt="..." />
                        <Card.Body>
                            <Card.Title> {props.itemName} </Card.Title>
                            <Card.Text>PHP {props.itemPrice.toFixed(2)}</Card.Text>
                            <Card.Text>{props.stocksQuantity} left</Card.Text>
                            <a href="#" className="stretched-link" onClick={() => {
                                var itemIsInList = false;
                                for (let i = 0; i < list.length; i++) {
                                    if (list[i]._id == props._id) {
                                        itemIsInList = true
                                        list[i].updateQty(list[i]._id, 1)
                                        list[i].updateTotalPrice(props.itemPrice)
                                    }
                                }

                                if (itemIsInList != true) {
                                    var newPurchase = { _id: props._id, itemName: props.itemName, itemPrice: props.itemPrice, currentQty: 1, updateTotalPrice: props.updateTotalPrice, decreaseTotalPrice: props.decreaseTotalPrice, updateQty: props.updateQty, removeCartItem: props.removeCartItem }

                                    list.push(newPurchase)
                                    props.updateTotalPrice(props.itemPrice)
                                }

;                            }}></a>
                        </Card.Body>
                    </Card>
                </div>
            )
        }

        const AddedItem = (props) => {
            const currentPrice = props.itemPrice
            var currentQty = props.currentQty;

            return (
                <tr id={props._id + "Cart"} >
                    <td>
                        <Button className='close' onClick={() => { props.removeCartItem(props._id) }} variant="light"><span>&times;</span></Button>
                    </td>
                    <td id={props._id + "Quantity"}>({currentQty}) {props.itemName} </td>
                    <td id={props._id + "Total"} className='text-right'> {currentPrice.toFixed(2) * currentQty} </td>
                    <td>
                        <Button className='minusQuantity'
                            onClick={() => {
                                if (currentQty > 1) {
                                    props.decreaseTotalPrice(props.itemPrice);
                                    props.updateQty(props._id, -1)
                                }
                            }} variant="light"><span className="font-weight-bold">-</span>
                        </Button>
                    </td>

                    <td>
                        <Button className='plusQuantity'
                            onClick={() => {
                                props.updateTotalPrice(currentPrice);
                                props.updateQty(props._id, 1)
                            }} variant="light"><span className="font-weight-bold">+</span>
                        </Button>
                    </td>
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
                            updateTotalPrice={this.updateTotalPrice}
                            decreaseTotalPrice={this.decreaseTotalPrice}
                            updateQty={this.updateQty}
                            removeCartItem={this.removeCartItem}
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
                            updateTotalPrice={this.updateTotalPrice}
                            decreaseTotalPrice={this.decreaseTotalPrice}
                            updateQty={this.updateQty}
                            removeCartItem={this.removeCartItem}
                            />)  
                    }
                }
        }

        const artistOptions = this.state.artists.map(artist =>
            <LoadNames artistID={artist.artistID}
                artistName={artist.artistName} />
        )

        var totalPrice = this.state.totalPrice;
        /*for (var i = 0; i < this.state.totalPriceArray.length; i++) {
            var currentPrice = this.state.totalPriceArray[i];
            totalPrice = totalPrice + currentPrice;
            console.log(totalPrice)
        }*/

        var purchaseRender = this.state.purchases.map(purchase =>
            <AddedItem
                _id={purchase._id}
                itemName={purchase.itemName}
                itemPrice={purchase.itemPrice}
                currentQty={purchase.currentQty}
                updateTotalPrice={purchase.updateTotalPrice}
                updateQty={purchase.updateQty}
                decreaseTotalPrice={purchase.decreaseTotalPrice}
                removeCartItem={purchase.removeCartItem}
            />
            )

        return (
            <Modal onHide={this.handleCloseModified.bind(this)} show={this.props.show} size="xl" id="newOrderWindow">
                <Form id="artistSelect" className="form">
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
                                <CheckoutTable>
                                    {purchaseRender}
                                </CheckoutTable>
                            </div>
                            <div className="mt-auto">
                                <table id="totalItems" class="card-title table">
                                    <tr>
                                        <th>total</th>
                                        <th id="totalPrice" className='text-right'>{this.state.totalPrice.toFixed(2)}</th>
                                    </tr>
                                </table>
                                <Button className="btn btn-secondary col-sm-8" id="checkoutBtn" type="button" value="check out" onClick={this.checkOut}>check out</Button>
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

export default NewOrderWindow
