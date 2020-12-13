import React, { Component, useState } from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import CashierMenu from "../Cashier/CashierMenu";



class LeftMenu extends Component{
    render(){
        if(this.props.admin)
            return(
                <AdminMenu />
            );
        return <CashierMenu />
    }
}

/*

*/
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
                    <Nav.Link id="manageArtists" href="#" className="nav-link" onClick={handleManageArtistsShow} data-toggle="modal" data-target="#manageArtistsWindow">Manage artists</Nav.Link>
                    <Nav.Link id="manageItems" href="#" className="nav-link"  onClick={handleManageItemsShow} data-toggle="modal" data-target="#manageItemsWindow">Manage items</Nav.Link>
                    <Nav.Link id="manageBundles" href="#" className="nav-link"  onClick={handleManageBundlesShow} data-toggle="modal" data-target="#manageBundlesWindow">Manage bundles</Nav.Link>
                    <Nav.Link id="manageEventss" href="#" className="nav-link" onClick={handleManageEventsShow}  data-toggle="modal" data-target="#manageEventsWindow">Manage events</Nav.Link>
                </Nav.Item>
                <hr />
                <Nav.Item id="salesReportSection" className="nav-item">
                    <h6 className="text-center">sales report</h6>
                    <Nav.Link id="currentSalesReport" href="#" className="nav-link" onClick={handleSalesReportShow} data-target="#salesReportWindow">Current sales report</Nav.Link>
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

function manageArtistsWindow(handleClose, show){
 return (
    <Modal onHide={handleClose} id="manageArtistsWindow" show={show} size="lg">
    <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title">Manage artists</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div className="modal-body">
            <ul className="nav nav-tabs mb-3 mt-2" id="manageArtistsNav" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="editArtistsOption" data-toggle="tab" href="#editArtistsSection" role="tab" aria-controls="editArtistsSection" aria-selected="true">Edit</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="addArtistsOption" data-toggle="tab" href="#addArtistsSection" role="tab" aria-controls="addArtistsSection" aria-selected="false">Add</a>
                </li>
            </ul>

            <div className="tab-content p-2" id="manageArtistList">
                <div id="editArtistsSection" className="tab-pane fade show active pb-4" role="tabpanel" aria-labelledby="editArtistsOption">
                    <h5 className="modal-title">Edit artist</h5>
                    <p id="manageReminder">Select the artist you want to edit or delete.</p>

                    <div className="form-group mb-4">
                        <form id="editArtist" className="form" action="javascript:editArtist(event);">
                            <div className="form-row mb-4">
                                <div className="col">
                                    <select id="artistsListDropdownEdit" className="form-control col-14" name="artistsListDropdownEdit" required>
                                        <option className="defaultVal" value="" disabled defaultValue>select artist</option>
                                        
                                        <option value="{{artistID}}"></option>
                                        
                                    </select>
                                </div>
                                <div className="col">
                                    <button name="deleteArtistButton" id="deleteArtistButton" className="btn btn-secondary " type="button" onClick="deleteArtist(event);"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                </div>
                            </div>
                                    
                            <div className="form-group mb-2">
                                <label htmlFor="editArtistName" className="font-weight-normal">artist name</label>
                                <input id="editArtistName" className="form-control clearInput" name="editArtistName" type="text" required />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="editArtistIDNo" className="font-weight-normal">artist ID number</label>
                                <input id="editArtistIDNo" className="form-control clearInput" name="editArtistIDNo" type="number" min="0" max="99999999" required />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="editArtistPassword" className="font-weight-normal">artist password (leave blank for unchanged password)</label>
                                <input id="editArtistPassword" className="form-control clearInput" name="editArtistPassword" type="text"/>
                            </div>
                            <button name="editArtistButton" id="editArtistButton" className="btn btn-secondary btn-md col-4 mt-4 mb-2 float-right" type="submit">save</button>
                        </form>

                    </div>
                </div>
                <div id="addArtistsSection" className="tab-pane fade" role="tabpanel" aria-labelledby="addArtistsOption">
                    <form id="artistSelectaddArtist" className="form" action="javascript:addArtist(event);">
                        <h5 className="modal-title">Add artist</h5>
                        <p id="manageReminder">Fill in the form below before adding a new artist.</p>
                        <div className="mt-2">
                            <div className="form-group mb-2">
                                <label htmlFor="newArtistName" className="font-weight-normal">artist name</label>
                                <input id="newArtistName" className="form-control clearInput" name="newArtistName" type="text" required />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="newArtistIDNo" className="font-weight-normal">artist ID number</label>
                                <input id="newArtistIDNo" className="form-control clearInput" name="newArtistIDNo" type="number" min="0" max="99999999" required />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="newArtistPassword" className="font-weight-normal">artist password</label>
                                <input id="newArtistPassword" className="form-control clearInput" name="newArtistPassword" type="text" required />
                            </div>
                        </div>
                        <button name="addArtistButton" id="addArtistButton" className="btn btn-secondary btn-md col-4 mt-4 mb-2 float-right" type="submit">save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
        
    </Modal>
 );
}

function manageItemsWindow(handleClose, show){
    return (
       <Modal onHide={handleClose} id="manageItemsWindow" show={show} size="lg">
           <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Manage items</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <ul className="nav nav-tabs mb-3 mt-2" id="manageArtistsNav" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="editItemOption" data-toggle="tab" href="#editItemSection" role="tab" aria-controls="editItemSection" aria-selected="true">Edit</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="addItemOption" data-toggle="tab" href="#addItemSection" role="tab" aria-controls="addItemSection" aria-selected="false">Add</a>
                        </li>
                    </ul>

                    <div className="tab-content p-2" id="manageItemList">
                        <div id="editItemSection" className="tab-pane fade show active" role="tabpanel" aria-labelledby="editItemOption">
                            <h5 className="modal-title">Edit item</h5>
                            <p id="manageReminder">Select the artist and their item you want to edit or delete.</p>

                            <form id="artistSelectEdit" className="form" method="POST" action="/admin/editItem" encType="multipart/form-data">
                                <div id="otherInputSection" className="mt-2">
                                    <div id="editSelectorsSection" className="row mb-2">
                                        <div className="col">
                                            <div className="form-group">
                                                <select id="artistsListDropdownItemEdit" className="form-control col-11 manageItemsArtist" name="artistsListDropdownItemEdit" required>
                                                    <option className="defaultVal" value="" disabled defaultValue>select artist</option>
                                                    
                                                    <option value="{{artistID}}"></option>
                                                    
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col ml-2">
                                            <div className="form-row">
                                                <div className="col">
                                                    <select id="artistsListDropdownItem" className="form-control manageItemsList" name="artistsListDropdownItem" required>
                                                        <option className="defaultVal" value="" disabled defaultValue>select item of artist</option>
                                                    </select>
                                                </div>
                                                <div className="col">
                                                    <button name="deleteItemButton" id="deleteItemButton" className="btn btn-secondary " type="button" onClick="deleteItem(event);"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div id="" className="row selectedSection">
                                        <div id="editItemsSection" className="col mt-2">
                                            <div className="form-group mb-2">
                                                <label htmlFor="editItemName" className="font-weight-normal mr-2">item name</label>
                                                <input name="editItemName" id="editItemName" className="form-control col-11 clearInput" type="text" required />
                                            </div>
                                            <div className="form-group mb-2">
                                                <label htmlFor="editItemStockQuantity" className="font-weight-normal mr-2">quantity</label>
                                                <input name="editItemStockQuantity" id="editItemStockQuantity" className="form-control col-11 clearInput" type="number" min="0" max="99999999" required />
                                            </div>
                                            
                                        </div>
                                        <div className="col">
                                            <div id="" className="col itemPhotoPicker">
                                                <div className="d-flex justify-content-center">
                                                    <img name="editItemPhoto" id="editItemPhoto" className="photos" src="photo/item-photo.png" />
                                                </div>
                                                <div className="custom-file mt-2">
                                                    <input name="editItemPhotoPickerInput" id="editItemPhotoPickerInput" type="file" className="custom-file-input clearInput" onChange="document.getElementById('editItemPhoto').src = window.URL.createObjectURL(this.files[0])" />
                                                    <label className="custom-file-label " htmlFor="editItemPhotoPickerInput">Choose photo</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <button name="editItemButton" id="editItemButton" className="btn btn-secondary btn-md col-6 mt-3 float-right" type="submit">save</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            
                        </div>
                        <div id="addItemSection" className="tab-pane fade" role="tabpanel" aria-labelledby="addItemOption">
                            <h5 className="modal-title">Add item</h5>
                            <p id="manageReminder">Fill in the form below before adding a new item.</p>
                            <form id="artistSelectaddItem" className="form" method="POST" action="/admin/addItem" encType="multipart/form-data">
                                <div id="otherInputSection" className="mt-2">
                                    <div id="editSelectorsSection" className="row">
                                        <div className="col">
                                            <div className="form-group mb-2">
                                            
                                                <select id="artistsListDropdownItemAdd" className="form-control" name="artistsListDropdownItemAdd" required>
                                                    <option className="defaultVal" value="" disabled defaultValue>select artist</option>
                                                    
                                                    <option value="{{artistID}}"></option>
                                                    
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row selectedSection">
                                        <div id="textFields" className="col" style={{width: "500px"}}>
                                            <div className="form-group mb-2">
                                                <label htmlFor="newItemName" className="font-weight-normal mr-2">item name</label>
                                                <input name="newItemName" id="newItemName" className="form-control col-11 clearInput" type="text" required />
                                            </div>
                                            <div className="form-group mb-2">
                                                <label htmlFor="newItemPriceStock" className="font-weight-normal mr-2">price</label>
                                                <input name="newItemPriceStock" id="newItemPriceStock" className="form-control col-11 clearInput" type="number" min="0" max="99999999" required />
                                            </div>
                                            <div className="form-group mb-2">
                                                <label htmlFor="newItemStockQuantity" className="font-weight-normal mr-2">quantity</label>
                                                <input name="newItemStockQuantity" id="newItemStockQuantity" className="form-control col-11 clearInput" type="number" min="0" max="99999999" required />
                                            </div>
                                        </div>
                                        <div className="col itemPhotoPicker">
                                            <div className="d-flex justify-content-center">
                                                <img name="newItemPhoto" id="newItemPhoto" className = "photos" src="photo/item-photo.png" />
                                            </div>
                                            <div className="custom-file mt-2">
                                                <input name="addItemPhotoPickerInput" id="addItemPhotoPickerInput" type="file" className="custom-file-input clearInput" onChange="document.getElementById('newItemPhoto').src = window.URL.createObjectURL(this.files[0])" required />
                                                <label className="custom-file-label " htmlFor="addItemPhotoPickerInput">Choose photo</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <button name="addItemButton" id="addItemButton" className="btn btn-secondary btn-md col-6 mt-3 float-right" type="submit">save</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
       </Modal>
    );
}

function manageBundlesWindow(handleClose, show){
    return (
       <Modal onHide={handleClose} id="manageBundlesWindow" show={show} size="lg">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Manage bundles</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <ul className="nav nav-tabs mb-3 mt-2" id="manageBundlesNav" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="editBundleOption" data-toggle="tab" href="#editBundlesSection" role="tab" aria-controls="editBundlesSection" aria-selected="true">Edit</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="addBundleOption" data-toggle="tab" href="#addBundlesSection" role="tab" aria-controls="addBundlesSection" aria-selected="false">Add</a>
                    </li>
                </ul>
                <div className="tab-content p-2" id="manageBundleList">
                    <div id="editBundlesSection" className="tab-pane fade show active pb-4" role="tabpanel" aria-labelledby="editBundleOption">
                        <h5 className="modal-title">Edit bundle</h5>
                        <p id="manageReminder">Select the artist and their bundle you want to edit or delete.</p>

                        <form id="editArtistSelectBundle" className="form" method='POST' action="/admin/editBundle" encType="multipart/form-data">
                            <div id="otherInputSection" className="mt-3">
                                <div id="editSelectorsSection" className="row mb-2">
                                    <div className="col">
                                        <div className="form-group">
                                            <select id="artistsListDropdownBundleEdit" className="form-control col-11" name="artistsListDropdownBundleEdit" required>
                                                <option className="defaultVal" value="" disabled defaultValue>select artist</option>
                                                
                                                <option value="{{artistID}}"></option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col ml-2">
                                        <div className="form-row">
                                            <div className="col">
                                                <select id="artistsListDropdownBundle" className="form-control" name="artistsListDropdownBundle" required>
                                                    <option className="defaultVal" value="" disabled defaultValue>select bundle</option>
                                                </select>
                                            </div>
                                            <div className="col">
                                                <button name="deleteBundleButton" id="deleteBundleButton" className="btn btn-secondary " type="button" onClick="deleteBundle(event);"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="row selectedSection">
                                    <div id="textFields" className="col" style={{width: "500px"}}>
                                        <div className="form-group mb-2">
                                            <label htmlFor="editBundleName" className="font-weight-normal mr-2">bundle name</label>
                                            <input name="editBundleName" id="editBundleName" className="form-control col-11 clearInput" type="text" required />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="editBundleStockQuantity" className="font-weight-normal mr-2">quantity</label>
                                            <input name="editBundleStockQuantity" id="editBundleStockQuantity" className="form-control col-11 clearInput" type="number" min="0" max="99999999" required />
                                        </div>
                                    </div>
                                    <div id="BundlePhotoPicker1" className="col mt-2">
                                        <div className="d-flex justify-content-center">
                                            <img name="editBundlePhoto" id="editBundlePhoto" className="photos" src="photo/item-photo.png" />
                                        </div>
                                        <div className="custom-file mt-2">
                                            <input name="editBundlePhotoPicker" id="editBundlePhotoPicker" type="file" className="custom-file-input clearInput" onChange="document.getElementById('editBundlePhoto').src = window.URL.createObjectURL(this.files[0])" />
                                            <label className="custom-file-label " htmlFor="editBundlePhotoPicker">Choose photo</label>
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" id="editSelectedItems" name="editSelectedItems" value="" />
                                <div className="row">
                                    <div className="col">
                                        <div id="editBundleItemsSection">
                                            <div className="form-group">
                                                <label htmlFor="editBundleItemsList" className="font-weight-normal">select bundle items</label>
                                                <div id="editBundleItemsList" className="card overflow-auto" style={{height: "10rem"}} data-spy="scroll" data-offset="0">
                                                    <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 itemGrid" id="editSelectBundleItems">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button name="addBundleButton" id="editBundleButton" className="btn btn-secondary btn-md col-6 mt-4 mb-2 float-right" type="submit">save</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                    <div id="addBundlesSection" className="tab-pane fade" role="tabpanel" aria-labelledby="addBundleOption">
                        <form id="addArtistSelectBundle" className="form" method='POST' action="/admin/addBundle" encType="multipart/form-data">
                            <h5 className="modal-title">Add bundle</h5>
                            <p id="manageReminder">Fill in the form below before adding a new bundle.</p>
                            <div id="otherInputSection" className="mt-3">
                                <div className="row">
                                    <div className="col mt-2">
                                        <div className="form-group mb-2">
                                            <select id="artistsListDropdownBundleAdd" className="form-control" name="artistsListDropdownBundleAdd" required>
                                                <option className="defaultVal" value="" disabled defaultValue>select artist</option>
                                                
                                                <option value="{{artistID}}"></option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row selectedSection">
                                    <div id="textFields" className="col" style={{width: "500px"}}>
                                        <div className="form-group mb-2">
                                            <label htmlFor="newBundleName" className="font-weight-normal mr-2">bundle name</label>
                                            <input name="newBundleName" id="newBundleName" className="form-control col-11 clearInput" type="text" required />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="newBundlePriceStock" className="font-weight-normal mr-2">price</label>
                                            <input name="newBundlePriceStock" id="newBundlePriceStock" className="form-control col-11 clearInput" type="number" min="0" max="99999999" required />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="newBundleStockQuantity" className="font-weight-normal mr-2">quantity</label>
                                            <input name="newBundleStockQuantity" id="newBundleStockQuantity" className="form-control col-11 clearInput" type="number" min="0" max="99999999" required />
                                        </div>
                                    </div>
                                    <div id="BundlePhotoPicker2" className="col m-4">
                                        <div className="d-flex justify-content-center">
                                            <img name="newBundlePhoto" id="newBundlePhoto" className = "photos" src="photo/item-photo.png" />
                                        </div>
                                        <div className="custom-file mt-2">
                                            <input name="addBundlePhotoPicker" id="addBundlePhotoPicker" type="file" className="custom-file-input clearInput" onChange="document.getElementById('newBundlePhoto').src = window.URL.createObjectURL(this.files[0])" required />
                                            <label className="custom-file-label " htmlFor="addBundlePhotoPicker">Choose photo</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="hidden" id="addSelectedItems" name="addSelectedItems" value="" />
                                        <div id="addBundleItemsSection">
                                            <div className="form-group">
                                                <label htmlFor="addBundleItemsSection" className="font-weight-normal">select bundle items</label>
                                                <div id="addBundleItemsSection" className="card overflow-auto" style={{height: "10rem"}} data-spy="scroll" data-offset="0">
                                                    <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 itemGrid" id="addSelectBundleItems">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button name="addBundleButton" id="addBundleButton" className="btn btn-secondary btn-md col-6 mt-4 mb-2 float-right" type="submit">save</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
       </Modal>
    );
}

function manageEventsWindow(handleClose, show){
    return (
       <Modal onHide={handleClose} id="manageEventsWindow" show={show} size="lg">
                <div className="modal-header">
                    <h5 className="modal-title">Manage events</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <ul className="nav nav-tabs mb-3 mt-2" id="manageEventsNav" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="editEventsOption" data-toggle="tab" href="#editEventsSection" role="tab" aria-controls="editEventsSection" aria-selected="true">Edit</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="addEventsOption" data-toggle="tab" href="#addEventsSection" role="tab" aria-controls="addEventsSection" aria-selected="false">Add</a>
                        </li>
                    </ul>
                    <div className="tab-content p-2" id="manageBundleList">
                        <div div id="editEventsSection" className="tab-pane fade show active pb-4" role="tabpanel" aria-labelledby="editEventsOption">
                            <h5 className="modal-title">Edit event</h5>
                            <p id="manageReminder">Select the event you want to set as current. You can also edit and delete an event.</p>
                            <span className="font-weight-bold">Current event name and time span: </span><span>name at HH:MM - HH:MM</span>
                            <form className="form mt-3" method="post" action="/admin/editEvent">
                                <div className="form-row mb-2">
                                    <div className="col mb-3">
                                        <select id="selectedEvent" className="form-control col-12" name="selectedEvent" required>
                                            <option className="defaultVal" value="" disabled defaultValue>select event</option>
                                            
                                            <option value="{{eventID}}"></option>
                                            
                                        </select>
                                        
                                    </div>
                                    <div className="col">
                                        <button name="deleteEventButton" id="deleteEventButton" className="btn btn-secondary" type="button" onClick="deleteEvent(event);"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                <div className="form-group ml-1 mb-2">
                                    <div className="col mb-2">
                                        <input name="editSetCurrentEvent" id="editSetCurrentEvent" className="form-check-input clearInput" value="1" type="checkbox" />
                                        <label htmlFor="editSetCurrentEvent" className="form-check-label">Set as current event</label>
                                    </div>
                                </div>
                                <div className="form-row mb-2">
                                    <div className="col mb-2">
                                        <label htmlFor="editEventName" className="font-weight-normal mr-2">event name</label>
                                        <input name="editEventName" id="editEventName" className="form-control col-14 clearInput" type="text" required />
                                    </div>
                                </div>
                                <div className="form-row mb-2">
                                    <div className="col mb-2">
                                        <label htmlFor="editStartEventDate" className="font-weight-normal mr-2">start date</label>
                                        <input name="editStartEventDate" id="editStartEventDate" className="form-control clearInput" type="date" required />
                                    </div>
                                </div>
                                <div className="form-row mb-2">
                                    <div className="col mb-2">
                                        <label htmlFor="editEndEventDate" className="font-weight-normal mr-2">end date</label>
                                        <input name="editEndEventDate" id="editEndEventDate" className="form-control clearInput" type="date" required />
                                    </div>
                                </div>
                                <input type="hidden" id='editCurrentEvent' name = 'editCurrentEvent' value='0'/>
                                <button name="editEventButton" id="editEventButton" className="btn btn-secondary btn-md col-4 mt-4 mb-2 float-right" type="submit">save</button>
                            </form>
                        </div>
                        <div div id="addEventsSection" className="tab-pane fade" role="tabpanel" aria-labelledby="addEventsOption">
                            <h5 className="modal-title">Add event</h5>
                            <p id="manageReminder">Fill in the form below before adding a new event.</p>
                            <form className="form" method="POST" action="/admin/addEvent">
                                <div className="form-row mb-2">
                                    <div className="col mb-2">
                                        <label htmlFor="newEventName" className="font-weight-normal mr-2">event name</label>
                                        <input name="newEventName" id="newEventName" className="form-control col-14 clearInput" type="text" required />
                                    </div>
                                </div>
                                <div className="form-group ml-1 mb-2">
                                    <div className="col mb-2">
                                        <input name="addSetCurrentEvent" id="addSetCurrentEvent" className="form-check-input clearInput" value="1" type="checkbox" />
                                        <label htmlFor="addSetCurrentEvent" className="form-check-label">Set as current event</label>
                                    </div>
                                </div>
                                <div className="form-row mb-2">
                                    <div className="col mb-2">
                                        <label htmlFor="addStartEventDate" className="font-weight-normal mr-2">start date</label>
                                        <input name="addStartEventDate" id="addStartEventDate" className="form-control clearInput" type="date" required />
                                    </div>
                                </div>
                                <div className="form-row mb-2">
                                    <div className="col mb-2">
                                        <label htmlFor="addEndEventDate" className="font-weight-normal mr-2">end date</label>
                                        <input name="addEndEventDate" id="addEndEventDate" className="form-control clearInput" type="date" required />
                                    </div>
                                </div>
                                <input type="hidden" id='addCurrentEvent' name = 'addCurrentEvent' value='0'/>
                                <button name="addEventButton" id="addEventButton" className="btn btn-secondary btn-md col-4 mt-4 mb-2 float-right" type="submit">save</button>
                            </form>
                        </div>
                    </div>
                </div>
       </Modal>
    );
}

function salesReportWindow(handleClose, show){
    return (
        <Modal onHide={handleClose} show={show} size="lg" id="salesReportWindow">
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Current sales report</Modal.Title>
                </Modal.Header>

                <Card.Header className="bg-secondary row mx-0 d-flex justify-content-around">
                    <select id="artistSalesListDropdown" className="form-control salesReportArtist col-md-7 col-sm-12 my-1" name="selectedArtistSales">
                        <option value="" className="defaultVal" disabled defaultValue>select artist</option>
                        <option value="{{artistID}}"></option>
                    </select>
                    <select id="sortItemsDropdown" className="form-control salesReportSort d-md-inline-block col-md-4 col-sm-12 my-1" name="selectedArtistSales">
                        <option value="name" className="defaultVal" defaultValue>sort by name</option>
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



export default LeftMenu;