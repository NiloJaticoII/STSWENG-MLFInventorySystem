import React, { Component} from 'react';
import CashierMenu from "../Cashier/CashierMenu";
import AdminMenu from "../Admin/AdminMenu";

class LeftMenu extends Component{
    render(){
        if(this.props.admin)
            return(
                <AdminMenu artist={this.props.artist}/>
            );
        return <CashierMenu  artist={this.props.artist} />
    }
}



export default LeftMenu;