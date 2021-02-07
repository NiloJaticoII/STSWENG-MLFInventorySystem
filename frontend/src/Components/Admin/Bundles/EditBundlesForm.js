import React, {Component} from 'react';
import config from '../../../config';

class EditBundlesForm extends Component {

    constructor() {
        super()
        this.state = {
            artists: [],
            bundles:[],
            currentBundleID: '',
            currentArtistID: '',
            editBundleName: '',
            editBundleStockQuantity: '',
            editBundlePicture:"photo/item-photo.png",
            editBundleItems: [],
            reponseToPost: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handlePhoto = this.handlePhoto.bind(this)
        this.getArtist = this.getArtist.bind(this)
        this.handleChangeBundle = this.handleChangeBundle.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleChangeBundle(event){
        this.setState({currentBundleID: event.target.value});
    }

    handlePhoto(url){
        this.setState({editBundlePicture:url})
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
            <div id="editBundlesSection" className="tab-pane fade show active pb-4" role="tabpanel" aria-labelledby="editBundleOption">
                <h5 className="modal-title">Edit bundle</h5>
                <p id="manageReminder">Select the artist and their bundle you want to edit or delete.</p>

                <form id="editArtistSelectBundle" className="form" method='POST' action="/admin/editBundle" encType="multipart/form-data">
                    <div id="otherInputSection" className="mt-3">
                        <div id="editSelectorsSection" className="row mb-2">
                            <div className="col">
                                <div className="form-group">
                                    <select id="artistsListDropdownBundleEdit" className="form-control col-11" name="artistsListDropdownBundleEdit" value={this.state.currentArtistID}  required>
                                        <option className="defaultVal" value="" disabled defaultValue>select artist</option>
                                        
                                        {artistOptions}
                                        
                                    </select>
                                </div>
                            </div>
                            <div className="col ml-2">
                                <div className="form-row">
                                    <div className="col">
                                        <select id="artistsListDropdownBundle" className="form-control" name="artistsListDropdownBundle" onChange={this.handleChangeBundle}required>
                                            <option className="defaultVal" value="" disabled defaultValue>select bundle</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <button name="deleteBundleButton" id="deleteBundleButton" className="btn btn-secondary " type="button" /*onClick="deleteBundle(event);"*/><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="row selectedSection">
                            <div id="textFields" className="col" style={{width: "500px"}}>
                                <div className="form-group mb-2">
                                    <label htmlFor="editBundleName" className="font-weight-normal mr-2">bundle name</label>
                                    <input name="editBundleName" id="editBundleName" className="form-control col-11 clearInput" type="text" required />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="editBundleStockQuantity" className="font-weight-normal mr-2">quantity</label>
                                    <input name="editBundleStockQuantity" id="editBundleStockQuantity" className="form-control col-11 clearInput" type="number" min="0" max="99999999" required />
                                </div>
                            </div>
                            <div id="BundlePhotoPicker1" className="col mt-2">
                                <div className="d-flex justify-content-center">
                                    <img name="editBundlePhoto" id="editBundlePhoto" className="photos" src="photo/item-photo.png" />
                                </div>
                                <div className="custom-file mt-2">
                                    <input name="editBundlePhotoPicker" id="editBundlePhotoPicker" type="file" className="custom-file-input clearInput" /*onChange="document.getElementById('editBundlePhoto').src = window.URL.createObjectURL(this.files[0])"*/ />
                                    <label className="custom-file-label " htmlFor="editBundlePhotoPicker">Choose photo</label>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" id="editSelectedItems" name="editSelectedItems" value="" />
                        <div className="row">
                            <div className="col">
                                <div id="editBundleItemsSection">
                                    <div className="form-group">
                                        <label htmlFor="editBundleItemsList" className="font-weight-normal">select bundle items</label>
                                        <div id="editBundleItemsList" className="card overflow-auto" style={{height: "10rem"}} data-spy="scroll" data-offset="0">
                                            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 itemGrid" id="editSelectBundleItems">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button name="addBundleButton" id="editBundleButton" className="btn btn-secondary btn-md col-6 mt-4 mb-2 float-right" type="submit">save</button>
                            </div>
                        </div>
                    </div>
                </form>
                
            </div>
        )
      }
}


function LoadBundlenames(props) {

}
function LoadNames(props) {
    return (
        <option value={props.artistID}>{props.artistName}</option>
    );
}

export default EditBundlesForm