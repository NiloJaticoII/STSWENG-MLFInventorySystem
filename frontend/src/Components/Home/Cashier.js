// JavaScript source code
import React, { Component } from 'react';
import Header from './partials/Header'
import ArtistCardsList from './partials/artistCard'
import { Modal } from 'bootstrap-4-react'

class Cashier extends Component{
    constructor() {
        super()
        this.state = {

        }
    }

    render(){
        return (
            <div className="Cashier">
                <Header/>
                <CashierLowerSection />
            </div>

            
        );
    }
}


function CashierLowerSection() {
    return (
        <div id="lowerSection" className="container d-flex flex-row mt-4">
            <div id="artistsList" className="card p-2" style={{width: "60rem"}}>
                <ArtistCardsList />
                </div>

            <div id="leftMenu" className="card p-3" style={{ width: "20rem" }}>
                <div id="newOrderButtonSection" className="nav-item text-center mb-2">
                    <button id="newOrderButton" className="btn btn-secondary btn-md col-11" data-toggle="modal" data-target="#newOrderWindow">new order</button>
                </div>
                <hr />
                <div id="stocksSection" className="nav-item">
                    <h6 className="text-center">stocks</h6>
                    <a id="restockItem" href="#" className="nav-link" data-toggle="modal" data-target="#financialWindow">Restock item</a>
                </div>
                <hr />
                <div id="salesReportSection" className="nav-item">
                    <h6 className="text-center">sales report</h6>
                    <a id="currentSalesReport" href="#" className="nav-link" data-toggle="modal" data-target="#salesReportWindow">Current sales report</a>
                </div>
            </div>
        </div>
    );
}

class CashierModal extends Component {
    /*newOrderWindow() {
        return (
            
        );
    }

    financialWindow() {
        return (
            
        );
    }*/

    salesReportWindow() {
        return (
            <Modal id="salesReportWindow" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" fade>
                <Modal.Dialog class="modal-dialog modal-lg" role="document">
                    <form id="salesReportForm" method='' action="">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Current sales report</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div id="salesReportSection" class="card-header bg-secondary row mx-0 d-flex justify-content-around">
                                <select id="artistSalesListDropdown" class="form-control salesReportArtist col-md-7 col-sm-12 my-1" name="selectedArtistSales">
                                    <option value="" class="defaultVal" disabled selected>select artist</option>
                                    <option value="{{artistID}}"> artistName </option>
                        </select>
                                <select id="sortItemsDropdown" class="form-control salesReportSort d-md-inline-block col-md-4 col-sm-12 my-1" name="selectedArtistSales">
                                    <option value="name" class="defaultVal" selected>sort by name</option>
                                    <option value="price asc">sort by price (ascending)</option>
                                    <option value="price desc">sort by price (descending)</option>
                                    <option value="sold asc">sort by quantity sold (ascending)</option>
                                    <option value="sold desc">sort by quantity sold (descending)</option>
                                </select>
                            </div>
                            <div class="modal-body bg-light">
                                <table id="soldItemsTable" class="table table-bordered">
                                    <thead class="thead bg-secondary text-light">
                                        <tr class="row m-0">
                                            <th class="col-6">Item/Bundle</th>
                                            <th class="col-3">Price</th>
                                            <th class="col-3">Quantity sold</th>
                                        </tr>
                                    </thead>
                                    <tbody id="salesList">
                                        <tr class='row m-0'><td class='col'>Select an artist</td></tr>
                                    </tbody>
                                </table>
                                <table id="totalSalesTable" class="table">
                                    <tr class="row m-0">
                                        <td class="font-weight-bold col-9">Total</td>
                                        <td class="col-3" id="totalSoldSales">PHP 0.00</td>
                                    </tr>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-footer bg-light">
                                <input id="saveOrder" class="btn btn-secondary btn-sm col-2" value="export data" type="button" />
                            </div>
                        </div>
                    </form>
                </Modal.Dialog>
            </Modal>
        );
    }
}

export default Cashier