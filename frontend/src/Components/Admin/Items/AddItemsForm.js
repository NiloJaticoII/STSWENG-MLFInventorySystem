import { format } from 'path';
import React, {Component} from 'react';
import config from '../../../config';

class AddItemsForm extends Component {
  
    constructor() {
        super()
        this.state = {
            artists: [],
            currentArtist: '',
            newItemName: '',
            newItemPriceStock: '',
            newItemtockQuantity: '',
            src:"photo/item-photo.png",
            reponseToPost: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.getArtist = this.getArtist.bind(this)
        this.handlePhoto = this.handlePhoto.bind(this)
        this.handleID = this.handleID.bind(this)
        this.addItem = this.addItem.bind(this)
        //this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleID(event){
        this.setState({currentArtistID: event.target.value});
    }
       
    handlePhoto(url){
        this.setState({src:url})
    }

    addItem = async(e) => {
        e.preventDefault()
        
        var formData = new FormData();
        formData.append('addItemPhotoPickerInput', document.getElementById("addItemPhotoPickerInput").files[0])
        formData.append('artistID', this.state.currentArtistID)
        formData.append('artistsListDropdownItemAdd', this.state.currentArtistID)
        formData.append('newItemName', this.state.newItemName)
        formData.append('newItemPriceStock', this.state.newItemPriceStock)
        formData.append('newItemStockQuantity', this.state.newItemStockQuantity)

        const response = await fetch(config.API_URI + '/admin/addItem', {
           method: 'POST',
           body: formData
          });
        
        const body = await response.json().then(alert("success"), window.location = '/admin')//error checking
         
        return body;
    }

    componentDidMount() {
      this.getArtist()
      .then(res => 
        this.setState({
        artists: res.artist,
      })); 
    }
    

    getArtist = async () => {
        const response = await fetch(config.API_URI + '/admin/getHome', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const body = await response.json();
        return body;
      };

      render(){

        const artistOptions = this.state.artists.map(artist =>
            <LoadNames key={artist.artistID} artistID={artist.artistID}
                artistName={artist.artistName} />
        )
        
          return(
                <div id="addItemSection" className="tab-pane fade" role="tabpanel" aria-labelledby="addItemOption">
                                 <h5 className="modal-title">Add item</h5>
                                 <p id="manageReminder">Fill in the form below before adding a new item.</p>
                                 <form id="artistSelectaddItem" className="form" method="POST" action={config.API_URI + "/admin/addItem"} encType="multipart/form-data">
                                     <div id="otherInputSection" className="mt-2">
                                         <div id="editSelectorsSection" className="row">
                                             <div className="col">
                                                 <div className="form-group mb-2">
                                                 
                                                     <select id="artistsListDropdownItemAdd" className="form-control" name="artistsListDropdownItemAdd" value={this.state.currentArtistID} onChange={this.handleID} required>
                                                         <option className="defaultVal" value="" disabled defaultValue>select artist</option>
                                                         {artistOptions}
                                                     </select>
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="row selectedSection">
                                             <div id="textFields" className="col" style={{width: "500px"}}>
                                                 <div className="form-group mb-2">
                                                     <label htmlFor="newItemName" className="font-weight-normal mr-2">item name</label>
                                                     <input name="newItemName" id="newItemName" className="form-control col-11 clearInput" type="text" value={this.state.newItemName} onChange={this.handleChange} required />
                                                 </div>
                                                 <div className="form-group mb-2">
                                                     <label htmlFor="newItemPriceStock" className="font-weight-normal mr-2">price</label>
                                                     <input name="newItemPriceStock" id="newItemPriceStock" className="form-control col-11 clearInput" type="number" value={this.state.newItemPriceStock} onChange={this.handleChange}  min="0" max="99999999" required />
                                                 </div>
                                                 <div className="form-group mb-2">
                                                     <label htmlFor="newItemStockQuantity" className="font-weight-normal mr-2">quantity</label>
                                                     <input name="newItemStockQuantity" id="newItemStockQuantity" className="form-control col-11 clearInput" type="number" value={this.state.newItemStockQuantity} onChange={this.handleChange} min="0" max="99999999" required />
                                                 </div>
                                             </div>
                                             <div className="col itemPhotoPicker">
                                                 <div className="d-flex justify-content-center">
                                                     <img name="newItemPhoto" id="newItemPhoto" className = "photos" src={this.state.src}/>
                                                 </div>
                                                 <div className="custom-file mt-2">
                                                     <input name="addItemPhotoPickerInput" id="addItemPhotoPickerInput" type="file" className="custom-file-input clearInput" onChange={()=>this.handlePhoto(window.URL.createObjectURL(document.getElementById("addItemPhotoPickerInput").files[0]))} required />
                                                     <label className="custom-file-label " htmlFor="addItemPhotoPickerInput">Choose photo</label>
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="row mt-4">
                                             <div className="col">
                                                 <button name="addItemButton" id="addItemButton" className="btn btn-secondary btn-md col-6 mt-3 float-right" type="submit" onClick={this.addItem}>save</button>
                                             </div>
                                         </div>
                                     </div>
                                 </form>
                             </div>
          )
      }
}

function LoadNames(props) {
    return (
        <option value={props.artistID}>{props.artistName}</option>
    );
}

export default AddItemsForm
      