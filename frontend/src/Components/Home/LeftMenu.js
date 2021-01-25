import React, { Component} from 'react';
import CashierMenu from "../Cashier/CashierMenu";
import AdminMenu from "../Admin/AdminMenu";

class LeftMenu extends Component{
    render(){
        if(this.props.admin)
            return(
                <AdminMenu />
            );
        return <CashierMenu  artist={this.props.artist} />
    }
}



export default LeftMenu;