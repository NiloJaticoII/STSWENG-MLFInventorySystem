import React, {Component} from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import AddArtistForm from "./AddArtistForm";
import EditArtistForm from "./EditArtistForm"
class ManageArtistsWindow extends Component {
    
    render(){
        return (
            <Modal onHide={this.props.handleClose} id="manageArtistsWindow" show={this.props.show} size="lg">
            <div className="modal-content">
                 <Modal.Header className="bg-white" closeButton>
                     <Modal.Title>Manage Artists</Modal.Title>
                 </Modal.Header>
        
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
                        <EditArtistForm />
                        <AddArtistForm />
                    </div>
                </div>
            </div>
                
            </Modal>
         );
    }
   }

   export default ManageArtistsWindow