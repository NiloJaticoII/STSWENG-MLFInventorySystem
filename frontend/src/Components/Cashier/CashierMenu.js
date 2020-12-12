import React, { Component } from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap'

class CashierMenu extends Component{
    constructor(props) {
        super(props)
        this.state = {
            newOrderShow: false,
            financialShow: false,
            salesReportShow: false
        };
    }

    render() {

        return (
            <>
                <Card id="leftMenu" className="card p-3" style={{ width: "20rem" }}>
                    <Nav.Item id="newOrderButtonSection" className="nav-item text-center mb-2">
                        <Button id="newOrderButton" className="btn btn-secondary btn-md col-11" data-toggle="modal" onClick={() => this.setState({ newOrderShow: true })} data-target="#newOrderWindow">new order</Button>
                    </Nav.Item>
                    <hr />
                    <Nav.Item id="stocksSection" className="nav-item">
                        <h6 className="text-center">stocks</h6>
                        <Nav.Link id="restockItem" href="#" className="nav-link" data-toggle="modal" onClick={() => this.setState({ financialShow: true })} data-target="#financialWindow">Restock item</Nav.Link>
                    </Nav.Item>
                    <hr />
                    <Nav.Item id="salesReportSection" className="nav-item">
                        <h6 className="text-center">sales report</h6>
                        <Nav.Link id="currentSalesReport" href="#" className="nav-link" data-toggle="modal" onClick={() => this.setState({ salesReportShow: true })} data-target="#salesReportWindow">Current sales report</Nav.Link>
                    </Nav.Item>
                </Card>

                <div id="modalSection">
                    {this.newOrderWindow()}
                    {this.financialWindow()}
                    {this.salesReportWindow()}
                </div>
            </>
            
            
        );
    }

    newOrderWindow() {
        return (
            <Modal onHide={() => this.setState({ newOrderShow: false })} show={this.state.newOrderShow} size="lg" id="newOrderWindow">
                <Form id="artistSelect" className="form" method='POST' action="/orderCheckOut">
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-body d-flex flex-col"> 
                        <Card id="buySection" className="card" style={{ width: "60rem", height: "30rem" }}>
                            <Card.Header id="buyArtistSection" className="card-header bg-secondary">
                                <select id="artistsListDropdown" className="form-control" name="selectedArtist">
                                    <option value="" className="defaultVal" disabled selected>select artist</option>
                                    <option value="{{artistID}}"></option>
                                </select>
                            </Card.Header>
                            <Card.Body id="buyItemSection" className="card-body overflow-auto">
                                <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 itemGrid" id="buyItem">
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

    financialWindow() {
        return (
            <Modal onHide={() => this.setState({ financialShow: false })} show={this.state.financialShow} size="lg" id="financialWindow">
                <Form>
                    <Modal.Header className="bg-secondary" closeButton>
                        <div id="artistSelectSection">
                            <select id="artistsListDropdown" class="form-control" name="financeSelectedArtist">
                                <option value="" class="defaultVal" disabled selected>select artist</option>
                                <option value="{{artistID}}"></option>
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
                                            </div>
                                        </Card>
                                    </Form.Group>
                                </div>
                                <div id="textFields">
                                    <Form.Group>
                                        <Form.Label for="newPriceStock" className="font-weight-normal">quantity to add</Form.Label>
                                        <Form.Control required id="newPriceStock" className="form-control" type="number" min={1} step="1"/>
                                    </Form.Group>
                                </div>

                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button id="addStocks" className="btn btn-secondary btn-sm col-2" value="save">save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }

    salesReportWindow() {
        return (
            <Modal onHide={() => this.setState({ salesReportShow: false })} show={this.state.salesReportShow} size="lg" id="salesReportWindow">
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title">Current sales report</Modal.Title>
                    </Modal.Header>

                    <Card.Header className="bg-secondary row mx-0 d-flex justify-content-around">
                        <select id="artistSalesListDropdown" className="form-control salesReportArtist col-md-7 col-sm-12 my-1" name="selectedArtistSales">
                            <option value="" className="defaultVal" disabled selected>select artist</option>
                            <option value="{{artistID}}"></option>
                        </select>
                        <select id="sortItemsDropdown" className="form-control salesReportSort d-md-inline-block col-md-4 col-sm-12 my-1" name="selectedArtistSales">
                            <option value="name" className="defaultVal" selected>sort by name</option>
                            <option value="price asc">sort by price (ascending)</option>
                            <option value="price desc">sort by price (descending)</option>
                            <option value="sold asc">sort by quantity sold (ascending)</option>
                            <option value="sold desc">sort by quantity sold (descending)</option>
                        </select>
                    </Card.Header>

                    <Modal.Body>
                        <table id="soldItemsTable" className="table table-bordered">
                            <thead className="thead bg-secondary text-light">
                                <tr className="row m-0">
                                    <th className="col-6">Item/Bundle</th>
                                    <th className="col-3">Price</th>
                                    <th className="col-3">Quantity sold</th>
                                </tr>
                            </thead>
                            <tbody id="salesList">
                                <tr className='row m-0'><td className='col'>Select an artist</td></tr>
                            </tbody>
                        </table>
                        <table id="totalSalesTable" className="table">
                            <tr className="row m-0">
                                <td className="font-weight-bold col-9">Total</td>
                                <td className="col-3" id="totalSoldSales">PHP 0.00</td>
                            </tr>
                            <tbody>
                            </tbody>
                        </table>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button id="saveOrder" className="btn btn-secondary btn-sm col-2" value="export data">check out</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default CashierMenu