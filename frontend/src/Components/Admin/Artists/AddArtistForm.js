import React, {Component} from 'react';

class AddArtistForm extends Component {
  
    constructor() {
        super()
        this.state = {
            newArtistName: '',
            newArtistIDNo: '',
            newArtistPassword: '',
            reponseToPost: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
      
    
    handleSubmit = async e => {
        e.preventDefault();

        if (this.state.newArtistName !== '' && this.state.newArtistIDNo!== '' && this.state.newArtistPassword !== '') {

            const response = await fetch('/admin/getArtist/?artistID='+this.state.newArtistIDNo + "&projection=_id artistID artistName", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const body = await response.text();
              
              this.setState({ responseToPost: body });
              
              if(this.state.responseToPost === "false"){
                  this.addArtist();                
              }
              else {
                    alert('Error adding artist','Artist ID already exist. Please type in another artist ID'); //change to SWEET ALERT
                     e.preventDefault();
              } 
        }
      };

  addArtist = async e => {
    const addResponse = await fetch('/admin/addArtist', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({newArtistIDNo: this.state.newArtistIDNo, newArtistName: this.state.newArtistName, newArtistPassword: this.state.newArtistPassword}),
                  });
                  const body = await addResponse.text();
    
                  this.setState({ responseToPost: body });

                  if (this.state.responseToPost) {
                    window.location = '/admin';
                  }
  }

  render(){
    return (
        <div id="addArtistsSection" className="tab-pane fade" role="tabpanel" aria-labelledby="addArtistsOption">
            <form id="artistSelectaddArtist" className="artistSelectaddArtist" onSubmit={this.handleSubmit}>
            <h5 className="modal-title">Add artist</h5>
            <p id="manageReminder">Fill in the form below before adding a new artist.</p>
            <div className="mt-2">
                <div className="form-group mb-2">
                    <label htmlFor="newArtistName" className="font-weight-normal">artist name</label>
                    <input id="newArtistName" className="form-control clearInput" name="newArtistName" value={this.state.newArtistName} type="text" onChange={this.handleChange} required />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="newArtistIDNo" className="font-weight-normal">artist ID number</label>
                    <input id="newArtistIDNo" className="form-control clearInput" name="newArtistIDNo" value={this.state.newArtistIDNo} type="number" min="0" max="99999999" onChange={this.handleChange} required />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="newArtistPassword" className="font-weight-normal">artist password</label>
                    <input id="newArtistPassword" className="form-control clearInput" name="newArtistPassword" value={this.state.newArtistPassword} type="text" onChange={this.handleChange} required />
                </div>
            </div>
            <button name="addArtistButton" id="addArtistButton" className="btn btn-secondary btn-md col-4 mt-4 mb-2 float-right" type="submit">save</button>
        </form>
        </div>
    );
  }
}

export default AddArtistForm