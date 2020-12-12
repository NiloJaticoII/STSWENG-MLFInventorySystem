import React, {Component} from 'react';
import CashierMenu from "../Cashier/CashierMenu"

class LeftMenu extends Component {

    render(){
        if(this.props.admin)
            return(
                <div id="leftMenu" className="card p-3" data-spy="scroll" data-offset="0" style={{width: "20rem"}}>
                    <div id="manageMenu" className="nav-item">
                        <h6 className="text-center">manage</h6>
                        <a id="manageArtists" href="#" className="nav-link" data-toggle="modal" data-target="#manageArtistsWindow">Manage artists</a>
                        <a id="manageItems" href="#" className="nav-link" data-toggle="modal" data-target="#manageItemsWindow">Manage items</a>
                        <a id="manageBundles" href="#" className="nav-link" data-toggle="modal" data-target="#manageBundlesWindow">Manage bundles</a>
                        <a id="manageEventss" href="#" className="nav-link" data-toggle="modal" data-target="#manageEventsWindow">Manage events</a>
                    </div>
                    <hr />
                    <div id="salesReportSection" className="nav-item">
                        <h6 className="text-center">sales report</h6>
                        <a id="currentSalesReport" href="#" className="nav-link" data-toggle="modal" data-target="#salesReportWindow">Current sales report</a>
                    </div>
                </div>
        );
        return <CashierMenu />
    }
}

export default LeftMenu;