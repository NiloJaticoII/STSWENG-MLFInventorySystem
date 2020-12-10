import React, {Component} from 'react';

/*
for listeners ---> 
import Counter from './frontend/public/components/counter/'
ReactDOM.render(<Counter />, document.getElementById("root"));
*/

class Counter extends Component {

    state = {
        count: 0
    };

    /*
    naming convention for handling events (onClick, onKeyup, etc.) starts with handle...
    handleFunction(){
    }
    */
    getCount(){

        return this.state.count; 
    }

    handleDecrement(){
        this.setState({count: this.state.count - 1});
    }
    
    render(){
        return(
        <div>
            {this.getCount()}
        </div> 
        );
    }
}

export default Counter;