import React, {Component} from 'react';
import config from '../../../config';
import Swal from 'sweetalert2'

class EditItemsForm extends Component {
    
    constructor() {
        super()
        this.state = {
            artists: [],
            currentArtistID: '',
            currentItems: [],
            currentSelectedItem: '',
            editItemName: '',
            editPhoto: false,
            editItemPriceStock: '',
            editItemtockQuantity: '',
            src:"photo/item-photo.png",
            reponseToPost: '',
        }
        this.getArtist = this.getArtist.bind(this)
        this.getItems = this.getItems.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleID = this.handleID.bind(this)
        this.handleItemID = this.handleItemID.bind(this)
        this.handlePhoto = this.handlePhoto.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.deleteAPI = this.deleteAPI.bind(this)
    }    

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleID(event){
        this.setState({currentArtistID: event.target.value});
    }   
    
    handleItemID(event){
        this.setState({currentSelectedItem: event.target.value, editPhoto: false });
    }   

    handlePhoto(url){
        this.setState({src:url, editPhoto:true})
    }
    
    componentDidMount() {
        this.getArtist()
        .then(res => 
          this.setState({
          artists: res.artist,
        })); 
      }

      componentDidUpdate(){
            this.getItems()
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

        getItems = async () => {
            for(let i=0; i < this.state.artists.length; i++)
            {
                const itemsResponse = await fetch(config.API_URI + '/getItems/?artistID='+this.state.artists[i].artistID + "&projection=itemName itemPrice itemsSold stockQuantity itemPicture", {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  const itemsBody = await itemsResponse.json();
                  this.state.artists[i].items = itemsBody;
            }
          }

          deleteItem(e) {
            var selected = this.state.currentSelectedItem;
            if (selected != '') {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        //ADD DELETE CODE
                        this.deleteAPI();
                    }
                  })
                }
            else {
                Swal.fire('Error deleting item','Please select an artist');
                e.preventDefault();
                return false;
            }
        }

        deleteAPI = async () => {
            const response = await fetch(config.API_URI + '/admin/deleteItem', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({itemID: this.state.currentSelectedItem})
            });
            const body = await response.text();
            if (body) { 
                Swal.fire(
                'Deleted!',
                'Item has been deleted.',
                'success'
              )
                window.location = '/admin';
                return true;

            }
          };

    render(){

        const artistOptions = this.state.artists.map(artist =>
            <LoadNames key={artist.artistID} artistID={artist.artistID}
                artistName={artist.artistName} />
        )

        //get items
        for(let i = 0; i<this.state.artists.length; i++){
            if(this.state.currentArtistID == this.state.artists[i].artistID){
                this.state.currentItems = this.state.artists[i].items;
            }
        }

        var itemOptions = []
        if(this.state.currentArtistID != ''){
            itemOptions = this.state.currentItems.filter(function(item){
                if (typeof item === 'undefined' || item === false) {
                return false; // skip
                }
                return true;
            }).map(current =>
                <LoadNames key={current._id} artistID={current._id}
                    artistName={current.itemName} />
            )

            for(let i = 0; i<this.state.currentItems.length; i++){
                if(this.state.currentSelectedItem == this.state.currentItems[i]._id){
                    if(!this.state.editPhoto)
                        this.state.src = this.state.currentItems[i].itemPicture;
                }
            }
        }
    
        return(
            <div id="editItemSection" className="tab-pane fade show active" role="tabpanel" aria-labelledby="editItemOption">
            <h5 className="modal-title">Edit item</h5>
            <p id="manageReminder">Select the artist and their item you want to edit or delete.</p>

            <form id="artistSelectEdit" className="form" method="POST" action="/admin/editItem" encType="multipart/form-data">
                <div id="otherInputSection" className="mt-2">
                    <div id="editSelectorsSection" className="row mb-2">
                        <div className="col">
                            <div className="form-group">
                                <select id="artistsListDropdownItemEdit" className="form-control col-11 manageItemsArtist" name="artistsListDropdownItemEdit" value={this.state.currentArtistID} onChange={this.handleID} required>
                                    <option className="defaultVal" value="" disabled defaultValue>select artist</option>
                                    {artistOptions}
                                </select>
                            </div>
                        </div>
                        <div className="col ml-2">
                            <div className="form-row">
                                <div className="col">
                                    <select id="artistsListDropdownItem" className="form-control manageItemsList" name="artistsListDropdownItem" value={this.state.currentSelectedItem} onChange={this.handleItemID} required>
                                        <option className="defaultVal" value="" disabled defaultValue>select item of artist</option>
                                        {itemOptions}
                                    </select>
                                </div>
                                <div className="col">
                                    <button name="deleteItemButton" id="deleteItemButton" className="btn btn-secondary " type="button" onClick={(event) => this.deleteItem(event)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div id="" className="row selectedSection">
                        <div id="editItemsSection" className="col mt-2">
                            <div className="form-group mb-2">
                                <label htmlFor="editItemName" className="font-weight-normal mr-2">item name</label>
                                <input name="editItemName" id="editItemName" className="form-control col-11 clearInput" type="text" value={this.state.editItemName} onChange={this.handleChange} required />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="editItemStockQuantity" className="font-weight-normal mr-2">quantity</label>
                                <input name="editItemStockQuantity" id="editItemStockQuantity" className="form-control col-11 clearInput" type="number" value={this.state.editItemStockQuantity} onChange={this.handleChange} min="0" max="99999999" required />
                            </div>
                            
                        </div>
                        <div className="col">
                            <div id="" className="col itemPhotoPicker">
                                <div className="d-flex justify-content-center">
                                    <img name="editItemPhoto" id="editItemPhoto" className="photos" src={this.state.src} />
                                </div>
                                <div className="custom-file mt-2">
                                    <input name="editItemPhotoPickerInput" id="editItemPhotoPickerInput" type="file" className="custom-file-input clearInput"  onChange={()=>this.handlePhoto(window.URL.createObjectURL(document.getElementById("editItemPhotoPickerInput").files[0]))} />
                                    <label className="custom-file-label " htmlFor="editItemPhotoPickerInput">Choose photo</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <button name="editItemButton" id="editItemButton" className="btn btn-secondary btn-md col-6 mt-3 float-right" type="submit">save</button>
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

export default EditItemsForm
  