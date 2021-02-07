import React, {Component} from 'react';

/*
for listeners ---> 
import Counter from './frontend/public/components/counter/'
ReactDOM.render(<Counter />, document.getElementById("root"));
*/

class Counter extends Component {

    constructor(){
        super()
        this.state = {
            value: 0
        };
    
    }
   
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.value !== prevProps.value) {
          this.setState({value: this.props.value})
        }
    }

    handleDecrement(){
        this.setState({value: this.state.value - 1});
    }
    
    render(){
        return(
        <div>
            {this.state.value}
        </div> 
        );
    }
}

export default Counter;