import React from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';

function financialWindow(handleClose, show) {
    return (
        <Modal onHide={handleClose} show={show} size="lg" id="financialWindow">
            <Form>
                <Modal.Header className="bg-secondary" closeButton>
                    <div id="artistSelectSection">
                        <select id="artistsListDropdown" class="form-control" name="financeSelectedArtist">
                            <option value="" class="defaultVal" disabled selected>select artist</option>
                            <option value="{{artistID}}"></option>
                        </select>
                    </div>
                    <Modal.Title className="modal-title"></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div id="artistItemsSection">
                        <div id="otherInputSection">
                            <div id="itemList">
                                <Form.Group>
                                    <Form.Label for="financialItemList" className="font-weight-normal">select one item</Form.Label>
                                    <Card id="financialItemList" className="card overflow-auto" style={{ height: "20rem" }} data-spy="scroll" data-offset="0">
                                        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 itemGrid" id="financialItem">
                                        </div>
                                    </Card>
                                </Form.Group>
                            </div>
                            <div id="textFields">
                                <Form.Group>
                                    <Form.Label for="newPriceStock" className="font-weight-normal">quantity to add</Form.Label>
                                    <Form.Control required id="newPriceStock" className="form-control" type="number" min={1} step="1" />
                                </Form.Group>
                            </div>

                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button id="addStocks" className="btn btn-secondary btn-sm col-2" value="save">save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default financialWindow