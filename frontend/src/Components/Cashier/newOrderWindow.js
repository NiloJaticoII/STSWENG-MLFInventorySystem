import React from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';

function newOrderWindow(handleClose, show, artists) {
    
    return (
        <Modal onHide={handleClose} show={show} size="lg" id="newOrderWindow">
            <Form id="artistSelect" className="form" method='POST' action="/orderCheckOut">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="modal-body d-flex flex-col">
                    <Card id="buySection" className="card" style={{ width: "60rem", height: "30rem" }}>
                        <Card.Header id="buyArtistSection" className="card-header bg-secondary">
                            <select id="artistsListDropdown" className="form-control" name="selectedArtist">
                                <option value="" className="defaultVal" disabled selected></option>
                                    <option value="{{artistID}}">{artists[0].artistName}</option>
                            </select>
                        </Card.Header>
                        <Card.Body id="buyItemSection" className="card-body overflow-auto">
                            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 itemGrid" id="buyItem">
                            </div>
                        </Card.Body>
                    </Card>
                    <Card id="checkoutSection align-items-end" className="card p-4" style={{ width: "30rem", height: "30rem" }}>
                        <Card.Title>items</Card.Title>
                        <div style={{ 'overflow-y': "auto", 'overflow-x': "hidden" }}>
                            <table id="checkoutItemsList" className="table table-borderless table-sm">

                            </table>
                        </div>
                        <div className="mt-auto">
                            <table id="totalItems" class="card-title table">
                                <tr>
                                    <th>total</th>
                                    <th id="totalPrice" className='text-right'>0</th>
                                </tr>
                            </table>
                            <Button className="btn btn-secondary col-sm-8" id="checkoutBtn" type="button" value="check out">check out</Button>
                        </div>
                    </Card>
                </Modal.Body>
            </Form>
        </Modal>
    );
}

export default newOrderWindow

function LoadNames(props){
    <option value={props.artistID}>{props.artistName}</option>
}