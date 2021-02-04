import React from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import EditEventsForm from './EditEventsForm';
import AddEventsForm from './AddEventsForm';

function manageEventsWindow(handleClose, show){
    return (
       <Modal onHide={handleClose} id="manageEventsWindow" show={show} size="lg">
                <Modal.Header className="bg-white" closeButton>
                    <Modal.Title>Manage Events</Modal.Title>
                </Modal.Header>
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
                        <EditEventsForm />
                        <AddEventsForm />
                    </div>
                </div>
       </Modal>
    );
}

export default manageEventsWindow