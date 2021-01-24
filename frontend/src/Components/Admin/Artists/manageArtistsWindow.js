import React from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import AddArtistForm from "./AddArtistForm";

function manageArtistsWindow(handleClose, show){
    return (
       <Modal onHide={handleClose} id="manageArtistsWindow" show={show} size="lg">
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
                   <div id="editArtistsSection" className="tab-pane fade show active pb-4" role="tabpanel" aria-labelledby="editArtistsOption">
                       <h5 className="modal-title">Edit artist</h5>
                       <p id="manageReminder">Select the artist you want to edit or delete.</p>
   
                       <div className="form-group mb-4">
                           <form id="editArtist" className="form" action="#">
                               <div className="form-row mb-4">
                                   <div className="col">
                                       <select id="artistsListDropdownEdit" className="form-control col-14" name="artistsListDropdownEdit" required>
                                           <option className="defaultVal" value="" disabled defaultValue>select artist</option>
                                           
                                           <option value="{{artistID}}"></option>
                                           
                                       </select>
                                   </div>
                                   <div className="col">
                                       <button name="deleteArtistButton" id="deleteArtistButton" className="btn btn-secondary " type="button"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
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
                   <AddArtistForm />
               </div>
           </div>
       </div>
           
       </Modal>
    );
   }

   export default manageArtistsWindow