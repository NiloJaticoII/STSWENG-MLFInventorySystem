import React, {Component} from 'react';

class LeftMenu extends Component {

    render(){
        return(
            <div id="leftMenu" class="card p-3" data-spy="scroll" data-offset="0" style="width: 20rem;">
                <div id="manageMenu" class="nav-item">
                    <h6 class="text-center">manage</h6>
                    <a id="manageArtists" href="#" class="nav-link" data-toggle="modal" data-target="#manageArtistsWindow">Manage artists</a>
                    <a id="manageItems" href="#" class="nav-link" data-toggle="modal" data-target="#manageItemsWindow">Manage items</a>
                    <a id="manageBundles" href="#" class="nav-link" data-toggle="modal" data-target="#manageBundlesWindow">Manage bundles</a>
                    <a id="manageEventss" href="#" class="nav-link" data-toggle="modal" data-target="#manageEventsWindow">Manage events</a>
                </div>
                <hr />
                <div id="salesReportSection" class="nav-item">
                    <h6 class="text-center">sales report</h6>
                    <a id="currentSalesReport" href="#" class="nav-link" data-toggle="modal" data-target="#salesReportWindow">Current sales report</a>
                </div>
            </div>
        );
    }
}

export default LeftMenu;