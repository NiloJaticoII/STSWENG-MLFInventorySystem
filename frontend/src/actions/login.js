import * as api from '../api';

//Action Creators
export const login = () => async (dispatch) =>{
    
    try {
        const{data} = await api.login();
        dispatch({ type: 'LOGIN', payload: data});
    } catch(error){
        console.log(error.message);
    }
}