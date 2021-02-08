import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const getSession = async e => {
    const addResponse = await fetch('/getSession', {
      credentials: 'include',
      method: 'GET',
      headers: {
      'Content-Type': 'application/json'}
      });
      const body = await addResponse.text();
      console.log(body)
}
      

export const ProtectedRoute = (props) => {
    getSession();
    var ac = true;
    if(ac) {
       return <Route {...props} />
    }
    return <Redirect to='/' />
 }