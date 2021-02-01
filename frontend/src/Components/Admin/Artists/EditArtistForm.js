import React, {Component} from 'react';
import config from '../../../config';


class EditArtistForm extends Component{

    constructor() {
        super()
        this.state = {
            artists:[],
            editArtistName: '',
            editArtistIDNo: '',
            editArtistPassword: '',
            currentArtistID:'',
            reponseToPost: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.getArtist = this.getArtist.bind(this)
        this.handleID = this.handleID.bind(this)
        this.editArtist = this.editArtist.bind(this)
        this.deleteArtist = this.deleteArtist.bind(this)
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
        
    deleteArtist = async () => {
        //fix
        const response = await fetch(config.API_URI + '/admin/deleteArtist', {
           method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                },
                body: JSON.stringify({artistID: this.state.currentArtistID}),
            });
            const body = await response.text() //change later need confirmation and error checking

            alert("success");
            window.location = '/admin';
            return body;
    }

    editArtist = async (e) => {

        const response = await fetch(config.API_URI + '/admin/getArtist/?artistID='+this.state.currentArtistID + "&projection=_id artistID artistName", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(e.preventDefault());
        var exist;
        const body = await response.text(); 
        if (body) 
            exist = false;
        else 
            exist = true;
        
        if (!exist) {
            const response = await fetch(config.API_URI + '/admin/editArtist', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
            body: JSON.stringify( {editArtistIDNo: this.state.currentArtistID, editArtistName: this.state.editArtistName, 
                editArtistPassword: this.state.editArtistPassword, artistsListDropdownEdit: this.state.currentArtistID})
            })
            const body2 = await response.text(); 
            if (body2) {
                window.location = '/admin';
                return true;
            }
        }
        else {
            alert('Error editing artist','Artist ID already exist. Please type in another artist ID');
            e.preventDefault();
            return false;
        }
    }



    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.artists !== prevProps.artists) {
          this.setState({artists: this.props.artists})
        }
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleID(event){
        this.setState({currentArtistID: event.target.value});
    }
    

    render(){
        
        const artistOptions = this.state.artists.map(artist =>
            <LoadNames key={artist.artistID} artistID={artist.artistID}
                artistName={artist.artistName} />
        )

        return(
            <div id="editArtistsSection" className="tab-pane fade show active pb-4" role="tabpanel" aria-labelledby="editArtistsOption">
            <h5 className="modal-title">Edit artist</h5>
            <p id="manageReminder">Select the artist you want to edit or delete.</p>

            <div className="form-group mb-4">
                <form id="editArtist" className="form" action="#">
                    <div className="form-row mb-4">
                        <div className="col">
                            <select id="artistsListDropdownEdit" className="form-control col-14" name="artistsListDropdownEdit" value={this.state.currentArtistID} onChange={this.handleID} required>
                                <option className="defaultVal" value="" disabled defaultValue >select artist</option>
                                {artistOptions}
                            </select>
                        </div>
                        <div className="col">
                            <button name="deleteArtistButton" id="deleteArtistButton" className="btn btn-secondary " type="button" onClick={this.deleteArtist}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                        </div>
                    </div>
                            
                    <div className="form-group mb-2">
                        <label htmlFor="editArtistName" className="font-weight-normal">artist name</label>
                        <input id="editArtistName" className="form-control clearInput" name="editArtistName" value={this.state.editArtistName} onChange={this.handleChange} type="text" required />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="editArtistIDNo" className="font-weight-normal">artist ID number</label>
                        <input id="editArtistIDNo" className="form-control clearInput" name="editArtistIDNo" value={this.state.editArtistIDNo} onChange={this.handleChange} type="number" min="0" max="99999999" required />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="editArtistPassword" className="font-weight-normal">artist password (leave blank for unchanged password)</label>
                        <input id="editArtistPassword" className="form-control clearInput" name="editArtistPassword" value={this.state.editArtistPassword} onChange={this.handleChange} type="text"/>
                    </div>
                    <button name="editArtistButton" id="editArtistButton" className="btn btn-secondary btn-md col-4 mt-4 mb-2 float-right" type="submit" onClick={this.editArtist}>save</button>
                </form>

            </div>
        </div>
        )
    }
}


function LoadNames(props) {
    return (
        <option value={props.artistID}>{props.artistName}</option>
    );
}

export default EditArtistForm
