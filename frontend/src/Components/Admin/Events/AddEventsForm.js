import React, {Component} from 'react';
import config from '../../../config';


class AddEventsForm extends Component{

    constructor(){
        super()
        this.state = {
            newEventName: '',
            newEventStartDate: null,
            newEventEndDate: null,
            newEventIsCurrentEvent: false,
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
       
        if (this.state.newEventName !== '' && this.state.newEventStartDate && this.state.newEventEndDate) {
            alert('add event')
            const response = await fetch('/admin/getEvent/?eventName='+this.state.newEventName + '?startDate=' + this.state.newEventStartDate.toString() + '?endDate='+ this.state.newEventStartDate.toString() + "&projection=_id eventName", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const body = await response.text();
              
              this.setState({ responseToPost: body });
              
              if(this.state.responseToPost === "false"){
                  this.addEvent();                
              }
              else {
                    alert('Error adding Event','Event already exist. Please type in another event'); //change to SWEET ALERT
                     e.preventDefault();
              } 
        }
      };

    addEvent = async e => {
        const addResponse = await fetch('/admin/addEvent', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({newEventName: this.state.newEventName, newEventStartDate: this.state.newEventStartDate, newEventEndDate: this.state.newEventEndDate, newEventIsCurrentEvent: this.state.newEventIsCurrentEvent}),
                      });
                      const body = await addResponse.text();
        
                      this.setState({ responseToPost: body });
    
                      if (this.state.responseToPost) {
                        window.location = '/admin';
                      }
      }

    render(){
        return(
            <div div id="addEventsSection" className="tab-pane fade" role="tabpanel" aria-labelledby="addEventsOption">
                <h5 className="modal-title">Add event</h5>
                <p id="manageReminder">Fill in the form below before adding a new event.</p>
                <form className="form" method="POST" action="/admin/addEvent" onSubmit={this.handleSubmit}>
                    <div className="form-row mb-2">
                        <div className="col mb-2">
                            <label htmlFor="newEventName" className="font-weight-normal mr-2">event name</label>
                            <input name="newEventName" id="newEventName" className="form-control col-14 clearInput" value={this.state.newEventName} onChange={this.handleChange} type="text" required />
                        </div>
                    </div>
                    <div className="form-group ml-1 mb-2">
                        <div className="col mb-2">
                            <input name="addSetCurrentEvent" id="addSetCurrentEvent" className="form-check-input clearInput" value={this.state.newEventIsCurrentEvent} onChange={this.handleChange} type="checkbox" />
                            <label htmlFor="addSetCurrentEvent" className="form-check-label">Set as current event</label>
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="col mb-2">
                            <label htmlFor="addStartEventDate" className="font-weight-normal mr-2">start date</label>
                            <input name="addStartEventDate" id="addStartEventDate" className="form-control clearInput" value={this.state.newEventStartDate} onChange={this.handleChange}  type="date"  required />
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="col mb-2">
                            <label htmlFor="addEndEventDate" className="font-weight-normal mr-2">end date</label>
                            <input name="addEndEventDate" id="addEndEventDate" className="form-control clearInput" value={this.state.newEventEndDate} onChange={this.handleChange}  type="date" required />
                        </div>
                    </div>
                    <input type="hidden" id='addCurrentEvent' name = 'addCurrentEvent' value='0'/>
                    <button name="addEventButton" id="addEventButton" className="btn btn-secondary btn-md col-4 mt-4 mb-2 float-right" type="submit">save</button>
                </form>
            </div>);
    }

}

export default AddEventsForm