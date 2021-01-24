import React, { Component, useState } from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import manageArtistsWindow from "./Artists/manageArtistsWindow";
import manageItemsWindow from "./manageItemsWindow";
import manageBundlesWindow from "./manageBundlesWindow";
import manageEventsWindow from "./manageEventsWindow";
import salesReportWindow from "../Home/salesReportWindow";

const AdminMenu = () => {
    const [manageArtistsShow, setManageArtistsShow] = useState(false);
    const [manageItemsShow, setManageItemsShow] = useState(false);
    const [manageBundlesShow, setManageBundlesShow] = useState(false);
    const [manageEventsShow, setManageEventsShow] = useState(false);
    const [salesReportShow, setSalesReportShow] = useState(false);

    const handleManageArtistsClose = () => setManageArtistsShow(false);
    const handleManageArtistsShow = () => setManageArtistsShow(true);

    const handleManageItemsClose = () => setManageItemsShow(false);
    const handleManageItemsShow = () => setManageItemsShow(true);

    const handleManageBundlesClose= () => setManageBundlesShow(false);
    const handleManageBundlesShow = () => setManageBundlesShow(true);

    const handleManageEventsClose = () => setManageEventsShow(false);
    const handleManageEventsShow = () => setManageEventsShow(true);

    const handleSalesReportClose = () => setSalesReportShow(false);
    const handleSalesReportShow = () => setSalesReportShow(true);
    return(
        <div>
            <Card id="leftMenu" className="card p-3" style={{ width: "20rem" }}>
                <Nav.Item  id="manageMenu" className="nav-item">
                    <h6 className="text-center">manage</h6>
                    <Nav.Item id="manageArtistsItem" className="text-center">
                        <Nav.Link id="manageArtists" href="#a" className="nav-link" onClick={handleManageArtistsShow} data-target="#manageArtistsWindow">Manage artists</Nav.Link>
                    </Nav.Item>
                    <Nav.Item id="manageItemsItem" className="text-center">
                        <Nav.Link id="manageItems" href="#" className="nav-link"  onClick={handleManageItemsShow} data-target="#manageItemsWindow">Manage items</Nav.Link>
                    </Nav.Item>
                    <Nav.Item id="manageBundlesItem" className="text-center">
                        <Nav.Link id="manageBundles" href="#" className="nav-link"  onClick={handleManageBundlesShow} data-target="#manageBundlesWindow">Manage bundles</Nav.Link>
                    </Nav.Item>
                    <Nav.Item id="manageEventsItem" className="text-center">
                        <Nav.Link id="manageEvents" href="#" className="nav-link" onClick={handleManageEventsShow}   data-target="#manageEventsWindow">Manage events</Nav.Link>
                    </Nav.Item>
                    
                </Nav.Item>
                <hr />
                <Nav.Item id="salesReportSection" className="nav-item">
                    <h6 className="text-center">sales report</h6>
                    <Nav.Item id="salesReportItem" className="text-center">
                    <Nav.Link id="currentSalesReport" href="#" className="nav-link" onClick={handleSalesReportShow} data-target="#salesReportWindow">Current sales report</Nav.Link>
                    </Nav.Item>
                    
                </Nav.Item>
            </Card>

            <div id="modalSection">
                {manageArtistsWindow(handleManageArtistsClose, manageArtistsShow)}
                {manageItemsWindow(handleManageItemsClose, manageItemsShow)}
                {manageBundlesWindow(handleManageBundlesClose, manageBundlesShow)}
                {manageEventsWindow(handleManageEventsClose, manageEventsShow)}
                {salesReportWindow(handleSalesReportClose, salesReportShow)}
            </div>
        </div>
    );
}
/*   
*/











export default AdminMenu