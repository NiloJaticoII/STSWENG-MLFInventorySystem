import React from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';

function salesReportWindow(handleClose, show) {
    return (
        <Modal onHide={handleClose} show={show} size="lg" id="salesReportWindow">
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Current sales report</Modal.Title>
                </Modal.Header>

                <Card.Header className="bg-secondary row mx-0 d-flex justify-content-around">
                    <select id="artistSalesListDropdown" className="form-control salesReportArtist col-md-7 col-sm-12 my-1" name="selectedArtistSales">
                        <option value="" className="defaultVal" disabled selected>select artist</option>
                        <option value="{{artistID}}"></option>
                    </select>
                    <select id="sortItemsDropdown" className="form-control salesReportSort d-md-inline-block col-md-4 col-sm-12 my-1" name="selectedArtistSales">
                        <option value="name" className="defaultVal" selected>sort by name</option>
                        <option value="price asc">sort by price (ascending)</option>
                        <option value="price desc">sort by price (descending)</option>
                        <option value="sold asc">sort by quantity sold (ascending)</option>
                        <option value="sold desc">sort by quantity sold (descending)</option>
                    </select>
                </Card.Header>

                <Modal.Body>
                    <table id="soldItemsTable" className="table table-bordered">
                        <thead className="thead bg-secondary text-light">
                            <tr className="row m-0">
                                <th className="col-6">Item/Bundle</th>
                                <th className="col-3">Price</th>
                                <th className="col-3">Quantity sold</th>
                            </tr>
                        </thead>
                        <tbody id="salesList">
                            <tr className='row m-0'><td className='col'>Select an artist</td></tr>
                        </tbody>
                    </table>
                    <table id="totalSalesTable" className="table">
                        <tr className="row m-0">
                            <td className="font-weight-bold col-9">Total</td>
                            <td className="col-3" id="totalSoldSales">PHP 0.00</td>
                        </tr>
                        <tbody>
                        </tbody>
                    </table>
                </Modal.Body>

                <Modal.Footer>
                    <Button id="saveOrder" className="btn btn-secondary btn-sm col-2" value="export data">check out</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );

}


export default salesReportWindow