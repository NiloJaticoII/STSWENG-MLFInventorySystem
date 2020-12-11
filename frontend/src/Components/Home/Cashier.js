// JavaScript source code
import React, { Component } from 'react';
import Header from './partials/Header'
//import ArtistCardsList from './partials/artistCard'

class Cashier extends Component{
    constructor() {
        super()
        this.state = {

        }
    }

    render(){
        return (
            <div class="Cashier">
                <Header/>
                <CashierLowerSection />
            </div>
        );
    }
}


function CashierLowerSection() {
    return (
        <div id="lowerSection" class="container d-flex flex-row mt-4">
            <div id="artistsList" class="card p-2" style="width: 60rem;">
                ArtistCardsList
                </div>

            <div id="leftMenu" class="card p-3" style="width: 20rem;">
                <div id="newOrderButtonSection" class="nav-item text-center mb-2">
                    <button id="newOrderButton" class="btn btn-secondary btn-md col-11" data-toggle="modal" data-target="#newOrderWindow">new order</button>
                </div>
                <hr />
                <div id="stocksSection" class="nav-item">
                    <h6 class="text-center">stocks</h6>
                    <a id="restockItem" href="#" class="nav-link" data-toggle="modal" data-target="#financialWindow">Restock item</a>
                </div>
                <hr />
                <div id="salesReportSection" class="nav-item">
                    <h6 class="text-center">sales report</h6>
                    <a id="currentSalesReport" href="#" class="nav-link" data-toggle="modal" data-target="#salesReportWindow">Current sales report</a>
                </div>
            </div>
        </div>
    );
}


export default Cashier