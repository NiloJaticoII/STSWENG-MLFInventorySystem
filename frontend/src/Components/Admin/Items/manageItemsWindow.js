import React, {Component} from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import AddItemsForm from './AddItemsForm';

class ManageItemsWindow extends Component{

    constructor(){
        super()
        this.state = {
            artists: [],
            currentArtistID: "",
        }
      }
      componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.artists !== prevProps.artists) {
          this.setState({artists: this.props.artists})
        }
    }

    render(){
        return (
            <Modal onHide={this.props.handleClose} id="manageItemsWindow" show={this.props.show} size="lg">
                <div className="modal-content">
                     <Modal.Header className="bg-white" closeButton>
                         <Modal.Title>Manage Items</Modal.Title>
                     </Modal.Header>
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
                             <AddItemsForm />
                         </div>
                     </div>
                 </div>
            </Modal>
         );
    }
    
}

export default ManageItemsWindow