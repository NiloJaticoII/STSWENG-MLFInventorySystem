import React, {Component} from 'react';
import Counter from './Counter';
import BootStrap, {NavDropdown} from 'react-bootstrap'
import config from '../../config'
class Banner extends Component {

    constructor(){
        super();
        this.state = {
            counters: [
                {id: 1, value: 0}, /* sold */
                {id: 2, value: 0}, /* days left */
                {id: 3, value: 0}, /* hours left */
                {id: 4, value: 0}, /* minutes left */
                {id: 5, value: 0}  /* seconds left */
            ]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch(config.API_URI + '/login', {
          method: 'GET',
        });
        const body = await response.text();
        this.props.history.push("/");
      };

    
    render(){
        return(
            <div className="Header">
                <div id="upperSection" className="container mt-4">
                    <div className="card d-flex flex-row bg-secondary text-light" style={{width: "69.3rem",  height: "10rem"}}>
                        <div className="SalesCounter">
                            <div id="salesCounter" className="d-flex flex-col text-center">
                                <div id="soldCounter" className="col">
                                    <h1 id="counterNumberSold" className="font-weight-bold">
                                        <Counter key={this.state.counters[0].id} value={this.state.counters[0].value} id={this.state.counters[0].id} />
                                    </h1>
                                    <h5 id="textLabel">sold</h5>
                                </div>
                                <div id="dayCounter" className="col">
                                    <h1 id="counterNumberDays" className="font-weight-bold">
                                        <Counter key={this.state.counters[1].id} value={this.state.counters[1].value} id={this.state.counters[1].id} />
                                    </h1>
                                    <h5 id="textLabel">day left</h5>
                                </div>
                                <div id="hoursCounter" className="col">
                                    <h1 id="counterNumberHours" className="font-weight-bold">
                                        <Counter key={this.state.counters[2].id} value={this.state.counters[2].value} id={this.state.counters[2].id} />
                                    </h1>
                                    <h5 id="textLabel">hours left</h5>
                                </div>
                                <div id="minutesCounter" className="col">
                                    <h1 id="counterNumberMinutes" className="font-weight-bold">
                                        <Counter key={this.state.counters[3].id} value={this.state.counters[3].value} id={this.state.counters[3].id} />
                                    </h1>
                                    <h5 id="textLabel">minutes left</h5>
                                </div>
                                <div id="secondsCounter" className="col">
                                    <h1 id="counterNumberSeconds" className="font-weight-bold">
                                        <Counter key={this.state.counters[4].id} value={this.state.counters[4].value} id={this.state.counters[4].id} />
                                    </h1>
                                    <h5 id="textLabel">seconds left</h5>
                                </div>
                            </div>
                        </div>

                        <input type="hidden" id="totalSeconds" value="totalSeconds" />

                        <div id="userMenuIcon">
                            <img id="logoImageGrey" src="photo/logo-grey.png" />
                        </div>

                        <div className="UserMenu">
                            <div id="userMenu" className="d-flex flex-col text-left">
                                <div id="userIcon" className="col">
                                    <img id="userIconImage" src="../photo/icon-user.png" />
                                </div>

                                <NavDropdown title="User" id="user-dropdown">
                                <NavDropdown.Item eventKey="1.1" onClick={this.handleSubmit}>Logout</NavDropdown.Item>
                                </NavDropdown>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;