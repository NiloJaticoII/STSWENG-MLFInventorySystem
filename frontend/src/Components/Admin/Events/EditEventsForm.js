import React, {Component} from 'react';
import config from '../../../config';


class EditEventsForm extends Component{




render(){
    
return(
    <div div id="editEventsSection" className="tab-pane fade show active pb-4" role="tabpanel" aria-labelledby="editEventsOption">
        <h5 className="modal-title">Edit event</h5>
        <p id="manageReminder">Select the event you want to set as current. You can also edit and delete an event.</p>
        <span className="font-weight-bold">Current event name and time span: </span><span>name at HH:MM - HH:MM</span>
        <form className="form mt-3" method="post" action="/admin/editEvent">
            <div className="form-row mb-2">
                <div className="col mb-3">
                    <select id="selectedEvent" className="form-control col-12" name="selectedEvent" required>
                        <option className="defaultVal" value="" disabled defaultValue>select event</option>
                        
                        <option value="{{eventID}}"></option>
                        
                    </select>
                    
                </div>
                <div className="col">
                    <button name="deleteEventButton" id="deleteEventButton" className="btn btn-secondary" type="button" onClick="deleteEvent(event);"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                </div>
            </div>
            <div className="form-group ml-1 mb-2">
                <div className="col mb-2">
                    <input name="editSetCurrentEvent" id="editSetCurrentEvent" className="form-check-input clearInput" value="1" type="checkbox" />
                    <label htmlFor="editSetCurrentEvent" className="form-check-label">Set as current event</label>
                </div>
            </div>
            <div className="form-row mb-2">
                <div className="col mb-2">
                    <label htmlFor="editEventName" className="font-weight-normal mr-2">event name</label>
                    <input name="editEventName" id="editEventName" className="form-control col-14 clearInput" type="text" required />
                </div>
            </div>
            <div className="form-row mb-2">
                <div className="col mb-2">
                    <label htmlFor="editStartEventDate" className="font-weight-normal mr-2">start date</label>
                    <input name="editStartEventDate" id="editStartEventDate" className="form-control clearInput" type="date" required />
                </div>
            </div>
            <div className="form-row mb-2">
                <div className="col mb-2">
                    <label htmlFor="editEndEventDate" className="font-weight-normal mr-2">end date</label>
                    <input name="editEndEventDate" id="editEndEventDate" className="form-control clearInput" type="date" required />
                </div>
            </div>
            <input type="hidden" id='editCurrentEvent' name = 'editCurrentEvent' value='0'/>
            <button name="editEventButton" id="editEventButton" className="btn btn-secondary btn-md col-4 mt-4 mb-2 float-right" type="submit">save</button>
        </form>
    </div>);
    }

}

export default EditEventsForm