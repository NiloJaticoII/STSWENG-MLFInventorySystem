import React, {Component} from 'react';

/*
for listeners ---> 
import Counter from './frontend/public/components/counter/'
ReactDOM.render(<Counter />, document.getElementById("root"));
*/

class Counter extends Component {

    state = {
        value: this.props.value
    };

    /*
    naming convention for handling events (onClick, onKeyup, etc.) starts with handle...
    handleFunction(){
    }
    */
    getValue(){

        return this.state.value; 
    }

    handleDecrement(){
        this.setState({value: this.state.value - 1});
    }
    
    render(){
        return(
        <div>
            {this.getValue()}
        </div> 
        );
    }
}

export default Counter;