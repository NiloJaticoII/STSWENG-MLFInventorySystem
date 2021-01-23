import React from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';

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

export default manageItemsWindow