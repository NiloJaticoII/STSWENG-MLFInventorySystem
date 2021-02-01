import React, { Component, useState, useEffect } from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap'

import NewOrderWindow from "./newOrderWindow";
import FinancialWindow from "./FinancialWindow";
import SalesReportWindow from "../Home/SalesReportWindow";


const CashierMenu = (props) => {

    const [artists, setArtists] = useState([]);
    useEffect(() => {
          setArtists(props.artist);
    });
    
    const [newOrderShow, setNewOrderShow] = useState(false);
    const [financialShow, setFinancialShow] = useState(false);
    const [salesReportShow, setSalesReportShow] = useState(false);

    const handleNewOrderClose = () => setNewOrderShow(false);
    const handleNewOrderShow = () => setNewOrderShow(true);

    const handleFinancialClose = () => setFinancialShow(false);
    const handleFinancialShow = () => setFinancialShow(true);

    const handleSalesReportClose = () => setSalesReportShow(false);
    const handleSalesReportShow = () => setSalesReportShow(true);

    return (
        <>
            <Card id="leftMenu" className="card p-3" style={{ width: "20rem" }}>
                <Nav.Item id="newOrderButtonSection" className="nav-item text-center mb-2">
                    <Button id="newOrderButton" className="btn btn-secondary btn-md col-11" onClick={handleNewOrderShow} data-target="#newOrderWindow">new order</Button>
                </Nav.Item>
                <hr />
                <Nav.Item id="stocksSection" className="nav-item">
                    <h6 className="text-center">stocks</h6>
                    <Nav.Link id="restockItem" href="#" className="nav-link" onClick={handleFinancialShow} data-target="#financialWindow">Restock item</Nav.Link>
                </Nav.Item>
                <hr />
                <Nav.Item id="salesReportSection" className="nav-item">
                    <h6 className="text-center">sales report</h6>
                    <Nav.Link id="currentSalesReport" href="#" className="nav-link" onClick={handleSalesReportShow} data-target="#salesReportWindow">Current sales report</Nav.Link>
                </Nav.Item>
            </Card>

            <div id="modalSection">
                <NewOrderWindow handleClose={handleNewOrderClose} show={newOrderShow} artists={artists}/>
                <FinancialWindow handleClose={handleFinancialClose} show={financialShow} artists={artists}/>
                <SalesReportWindow handleClose={handleSalesReportClose} show={salesReportShow} artists={artists}/>
            </div>
        </>
    );

}



export default CashierMenu