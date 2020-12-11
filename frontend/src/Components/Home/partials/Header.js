// JavaScript source code
import React, { Component } from 'react';
import Counter from './Counter'
import { Handlebars } from 'handlebars';

/*header*/
class Header extends Component {
    renderUserIcon() {
        return (
            <div id="userMenuIcon">
                <img id="logoImageGrey" src="photo/logo-grey.png" />
            </div>  
        );
    }

    render() {
        return (
            <div className="Header">
                <div id="upperSection" className="container mt-4">
                    <div className="card d-flex flex-row bg-secondary text-light" style={{ width: "69.3rem", height: "10rem"}}>
                        <SalesCounter />

                        <input type="hidden" id="totalSeconds" value="" />

                        {this.renderUserIcon()}

                        <UserMenu />
                    </div>
                </div>
            </div>
        );
    }
}

function SalesCounter() {
    return (
        <div className="SalesCounter">
            <div id="salesCounter" className="d-flex flex-col text-center">
                <div id="soldCounter" className="col">
                    <h1 id="counterNumberSold" class="font-weight-bold"><Counter /></h1>
                    <h5 id="textLabel">sold</h5>
                </div>
                <div id="dayCounter" className="col">
                    <h1 id="counterNumberDays" class="font-weight-bold"><Counter /></h1>
                    <h5 id="textLabel">day left</h5>
                </div>
                <div id="hoursCounter" className="col">
                    <h1 id="counterNumberHours" className="font-weight-bold"><Counter /></h1>
                    <h5 id="textLabel">hours left</h5>
                </div>
                <div id="minutesCounter" className="col">
                    <h1 id="counterNumberMinutes" className="font-weight-bold"><Counter /></h1>
                    <h5 id="textLabel">minutes left</h5>
                </div>
                <div id="secondsCounter" className="col">
                    <h1 id="counterNumberSeconds" className="font-weight-bold"><Counter /></h1>
                    <h5 id="textLabel">seconds left</h5>
                </div>
            </div>
        </div>
    );
}

function UserMenu() {
    return (
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
    );
}

export default Header