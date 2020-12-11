import React, {Component} from 'react';
import Counter from './Counter';

class Banner extends Component {
    state = {
        counters: [
            {id: 1, value: 0}, /* sold */
            {id: 2, value: 0}, /* days left */
            {id: 3, value: 0}, /* hours left */
            {id: 4, value: 0}, /* minutes left */
            {id: 5, value: 0}  /* seconds left */
        ]
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

                        <div class="UserMenu">
                            <div id="userMenu" class="d-flex flex-col text-left">
                                <div id="userIcon" class="col">
                                    <img id="userIconImage" src="../photo/icon-user.png" />
                                </div>

                                <div id="userNameandArrow" class="d-flex flex-col justify-content-left">
                                    <div class="nav-item dropdown">
                                        <a id="userMenuDropdown" class="nav-link dropdown-toggle text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            User
                                            </a>
                                        <div class="dropdown-menu dropdown-menu-right mt-4" aria-labelledby="userMenuDropdown">
                                            <a class="dropdown-item" href="/logout">Log out</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;