import React, {Component} from 'react';
import { Modal, Form, Card, Button, Nav } from 'react-bootstrap';
import config from '../../config'

class SalesReportWindow extends Component {

    constructor(){
        super()
        this.state = {
            artists: [],
            currentArtistID: "",
            totalSales: 0.0,
        }
    
        this.handleChange = this.handleChange.bind(this)
        this.updateTotalSales = this.updateTotalSales.bind(this)
    }
        /*  converts objects to csv */
    convertToCSV = function (objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

    /*  exports sales report to CSV file */
    exportCSVFile = function () {

    if(this.state.currentArtistID != "")
    {
        for(let i=0; i < this.state.artists.length; i++)
    {
         if(this.state.artists[i].artistID == this.state.currentArtistID)
         {
                var items = this.state.artists[i].items;
                var fileTitle = this.state.artists[i].artistName;
         }
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    }

}
    
    handleChange = (event) => {
        this.setState({currentArtistID: event.target.value}, 
            () => {this.updateTotalSales()});
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.artists !== prevProps.artists) {
          this.setState({artists: this.props.artists})
        }
    }

    updateTotalSales(){
        var total = 0.0;
        for(let i=0; i < this.state.artists.length; i++)
        {
            if(this.state.artists[i].artistID == this.state.currentArtistID)
            {
                for(let j = 0; j< this.state.artists[i].items.length; j++){
                    total += this.state.artists[i].items[j].itemPrice
                } 
                    
                for(let j = 0; j< this.state.artists[i].bundles.length; j++) {
                    total += this.state.artists[i].bundles[j].bundlePrice
                } 
            } 
        }

        this.setState({totalSales:total})
    }

    render(){
    var itemList = [];
    var bundleList = [];

    for(let i=0; i < this.state.artists.length; i++)
    {
        if(this.state.artists[i].artistID == this.state.currentArtistID)
        {
            if(this.state.artists[i].items)
            {
                itemList = this.state.artists[i].items.filter(function(item){
                    if (typeof item === 'undefined' || item === false) {
                    return false; // skip
                    }
                    return true;
                }).map(item => {
                    if(item._id == this.state.currentItem){
                        return (<LoadItemCards  key={item._id}
                        _id={item._id}
                        itemName={item.itemName} 
                        stocksQuantity={item.stockQuantity}
                        itemPrice={item.itemPrice}
                        itemPicture={item.itemPicture}
                        itemsSold={item.itemsSold}
                        handleFinancialItem={this.handleFinancialItem}
                        itemType="item"
                        class="col mb-3 bg-secondary"/>)
                    }
                    else{
                        return(<LoadItemCards  key={item._id}
                            _id={item._id}
                            itemName={item.itemName} 
                            stocksQuantity={item.stockQuantity}
                            itemPrice={item.itemPrice}
                            itemPicture={item.itemPicture}
                            itemsSold={item.itemsSold}
                            handleFinancialItem={this.handleFinancialItem}
                            itemType="item"
                            class="col mb-3"/>)
                    }
                })  
            }
            
            if(this.state.artists[i].bundles)
            {
                bundleList = this.state.artists[i].bundles.filter(function(bundle){
                    if (typeof bundle === 'undefined' || bundle === false) {
                    return false; // skip
                    }
                    return true;
                }).map(bundle=> {
                    if(bundle._id == this.state.currentItem){
                       return (<LoadItemCards  key={bundle._id}
                        _id={bundle._id}
                        itemName={bundle.bundleName} 
                        stocksQuantity={bundle.bundleStock}
                        itemPrice={bundle.bundlePrice}
                        itemsSold={bundle.bundleSold}
                        itemPicture={bundle.bundlePicture}
                        handleFinancialItem={this.handleFinancialItem}
                        itemType="bundle"
                        class="col mb-3 bg-secondary"/>)
                    }
                    else{
                        return (<LoadItemCards  key={bundle._id}
                            _id={bundle._id}
                            itemName={bundle.bundleName} 
                            stocksQuantity={bundle.bundleStock}
                            itemPrice={bundle.bundlePrice}
                            itemsSold={bundle.bundleSold}
                            itemPicture={bundle.bundlePicture}
                            handleFinancialItem={this.handleFinancialItem}
                            itemType="bundle"
                            class="col mb-3"/>)
                    }
                })
                 
            }
        }
    }

    const artistOptions = this.state.artists.map(artist =>
        <LoadNames key={artist.artistID} artistID={artist.artistID} artistName={artist.artistName} />
    )

        return (
            <Modal onHide={this.props.handleClose} show={this.props.show} size="lg" id="salesReportWindow">
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title">Current sales report</Modal.Title>
                    </Modal.Header>
    
                    <Card.Header className="bg-secondary row mx-0 d-flex justify-content-around">
                        <select id="artistSalesListDropdown" className="form-control salesReportArtist col-md-7 col-sm-12 my-1" name="selectedArtistSales" value={this.state.currentArtistID} onChange={this.handleChange}>
                            <option value="" className="defaultVal" disabled selected>select artist</option>
                            {artistOptions}
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
                                {bundleList}
                                {itemList}
                            </tbody>
                        </table>
                        <table id="totalSalesTable" className="table">
                            <tr className="row m-0">
                                <td className="font-weight-bold col-9">Total</td>
                                <td className="col-3" id="totalSoldSales">PHP {this.state.totalSales}</td>
                            </tr>
                            <tbody>
                            </tbody>
                        </table>
                    </Modal.Body>
    
                    <Modal.Footer>
                        <Button id="saveOrder" className="btn btn-secondary btn-sm col-2" value="export data" onClick={()=>this.exportCSVFile()}>check out</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

function LoadNames(props) {
    return (
        <option value={props.artistID}>{props.artistName}</option>
    );
}

function LoadItemCards(props) {
    return (
        <tr class='row m-0'>
            <td className='col-6'> {props.itemName}</td>
            <td className='col-3'> {props.itemPrice.toFixed(2)}</td>
            <td className='col-3'> {props.itemsSold}</td>
        </tr>
    )
}



export default SalesReportWindow