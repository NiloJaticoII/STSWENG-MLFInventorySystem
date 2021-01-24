import React from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';

function manageBundlesWindow(handleClose, show){
    return (
       <Modal onHide={handleClose} id="manageBundlesWindow" show={show} size="lg">
        <div className="modal-content">
            <Modal.Header className="bg-white" closeButton>
                <Modal.Title>Manage Bundles</Modal.Title>
            </Modal.Header>
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

export default manageBundlesWindow