import React, {Component} from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import AddItemsForm from './AddItemsForm';
import EditItemsForm from './EditItemsForm';

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
                            <EditItemsForm />
                            <AddItemsForm />
                         </div>
                     </div>
                 </div>
            </Modal>
         );
    }
    
}

export default ManageItemsWindow