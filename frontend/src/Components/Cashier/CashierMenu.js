import React, { Component, useState, useEffect } from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap'
import newOrderWindow from "./newOrderWindow";
import financialWindow from "./financialWindow";
import salesReportWindow from "../Home/salesReportWindow";

const CashierMenu = (props) => {

    const [artists, setArtists] = useState([{artistName:"No Artists"}]);
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
                {newOrderWindow(handleNewOrderClose, newOrderShow, artists)}
                {financialWindow(handleFinancialClose, financialShow)}
                {salesReportWindow(handleSalesReportClose, salesReportShow)}
            </div>
        </>
    );

}






/* FOR LATER
function ArtistItems(props) {
    return(
    <tr>
        <th> <img src={props.itemPicture} className="card-img-top" alt="..."/> </th> 
        <th> {props.itemName}       </th>
        <th> PHP {props.itemPrice}  </th>
        <th> {props.stocksQuantity} </th>
    </tr>    
    );
}

const itemList = props.items.map(item => <ArtistCardItem        key={item.itemID}
    itemPicture={item.itemPicture}
    itemName={item.itemName} 
    itemPrice={item.itemPrice}
    stocksQuantity={item.stocksQuantity}/>)

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
*/

export default CashierMenu