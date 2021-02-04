import React, {Component} from 'react';
import config from '../../../config';


class EditEventsForm extends Component{

    constructor(){
        super()
        this.state = {
            events:[],
            editEventName: '',
            editEventID: '',
            editEventStartDate: null,
            editEventEndDate: null,
            editEventIsCurrentEvent: 0,
            currentEventID: '',
            reponseToPost: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.getEvent = this.getEvent.bind(this)
        this.handleID = this.handleID.bind(this)
        this.editEvent = this.editEvent.bind(this)
        this.deleteEvent = this.deleteEvent.bind(this)
        this.determineBoolean = this.determineBoolean.bind(this)
    }

    componentDidMount() {
        this.getEvent()
        .then(res => 
          this.setState({
          events: res.event,
        })); 
    }
    //to be edited
    getEvent = async () => {
        const response = await fetch(config.API_URI + '/admin/getHome', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const body = await response.json();
        return body;
      };

    determineBoolean(value) {
        if(value === 'on')
            this.setState({editEventIsCurrentEvent: 1})
        else
            this.setState({editEventIsCurrentEvent: 0})
    }
    deleteEvent = async () => {
        //fix
        const response = await fetch(config.API_URI + '/admin/deleteEvent', {
           method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                },
                body: JSON.stringify({eventID: this.state.currentEventID}),
            });
            const body = await response.text() //change later need confirmation and error checking

            alert("success");
            window.location = '/admin';
            return body;
    }

    editEvent = async (e) => {

        const response = await fetch(config.API_URI + '/admin/getArtist/?eventName='+this.state.currentEventID + "&projection=_id eventName", {
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
            const response = await fetch(config.API_URI + '/admin/editEvent', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
            body: JSON.stringify( {selectedEvent: this.state.currentEventID, editEventName: this.state.editEventName, editEndEventDate: this.state.editEventEndDate, 
                editStartEventDate: this.state.editEventStartDate, editCurrentEvent : this.state.editEventIsCurrentEvent})
            })
            const body2 = await response.text(); 
            if (body2) {
                window.location = '/admin';
                return true;
            }
        }
        
        else {
            alert('Error editing event','Event Name already exist. Please type in another Event Name');
            e.preventDefault();
            return false;
        }
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.events !== prevProps.events) {
          this.setState({events: this.props.events})
        }
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleID(event){
        this.setState({currentEventID: event.target.value});
    }

    render(){
        const eventOptions = this.state.events.map(event =>
            <LoadNames key={event.eventID} eventID={event.eventID}
                eventName={event.eventName} />
        )

        return(
            <div div id="editEventsSection" className="tab-pane fade show active pb-4" role="tabpanel" aria-labelledby="editEventsOption">
                <h5 className="modal-title">Edit event</h5>
                <p id="manageReminder">Select the event you want to set as current. You can also edit and delete an event.</p>
                
                <span className="font-weight-bold">Current event name and time span: </span><span>name at HH:MM - HH:MM</span>
                <form className="form mt-3" method="post" action="/admin/editEvent">
                    <div className="form-row mb-2">
                        <div className="col mb-3">
                            <select id="selectedEvent" className="form-control col-12" name="selectedEvent" value={this.state.currentEventID} onChange={this.handleID} required>
                                <option className="defaultVal" value="" disabled defaultValue>select event</option>
                                {eventOptions}
                                
                            </select>
                            
                        </div>
                        <div className="col">
                            <button name="deleteEventButton" id="deleteEventButton" className="btn btn-secondary" type="button" onClick={this.deleteEvent}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    <div className="form-group ml-1 mb-2">
                        <div className="col mb-2">
                            <input name="editSetCurrentEvent" id="editSetCurrentEvent" className="form-check-input clearInput" value="1" onChange={(event) => this.determineBoolean(event.target.value)} type="checkbox" />
                            <label htmlFor="editSetCurrentEvent" className="form-check-label" >Set as current event</label>
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="col mb-2">
                            <label htmlFor="editEventName" className="font-weight-normal mr-2">event name</label>
                            <input name="editEventName" id="editEventName" className="form-control col-14 clearInput" type="text" value={this.state.editEventName} onChange={this.handleChange} required />
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="col mb-2">
                            <label htmlFor="editStartEventDate" className="font-weight-normal mr-2">start date</label>
                            <input name="editStartEventDate" id="editStartEventDate" className="form-control clearInput" type="date" onChange={(event) => this.setState({editEventStartDate: event.target.value})} required />
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="col mb-2">
                            <label htmlFor="editEndEventDate" className="font-weight-normal mr-2">end date</label>
                            <input name="editEndEventDate" id="editEndEventDate" className="form-control clearInput" type="date" onChange={(event) => this.setState({editEventEndDate: event.target.value})} required />
                        </div>
                    </div>
                    <input type="hidden" id='editCurrentEvent' name = 'editCurrentEvent' value='0'/>
                    <button name="editEventButton" id="editEventButton" className="btn btn-secondary btn-md col-4 mt-4 mb-2 float-right" type="submit" onClick={this.editEvent}>save</button>
                </form>
            </div>);
    }

}

function LoadNames(props) {
    return (
        <option value={props.eventID}>{props.eventName}</option>
    );
}
export default EditEventsForm