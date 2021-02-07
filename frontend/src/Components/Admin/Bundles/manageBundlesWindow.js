import React, {Component} from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import AddBundlesForm from './AddBundlesForm';
import EditBundlesForm from './EditBundlesForm';

class ManageBundlesWindow extends Component {
    
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
            <Modal onHide={this.props.handleClose} id="manageBundlesWindow" show={this.props.show} size="lg">
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
                             <a className="nav-link" id="addBundleOption" data-toggle="tab" href="#addBundlesSection" role="tab" aria-controls="addBundlesSection" aria-selected="false" onClick={()=>this.forceUpdate()}>Add</a>
                         </li>
                     </ul>
                     <div className="tab-content p-2" id="manageBundleList">
                        <EditBundlesForm />
                        <AddBundlesForm />
                     </div>
                 </div>
             </div>
            </Modal>
         );
    }
    
}

export default ManageBundlesWindow