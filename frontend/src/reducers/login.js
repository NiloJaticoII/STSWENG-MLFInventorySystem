export default (loginInfo = [], action) => {
    switch(action.type){
        case 'LOGIN':
            console.log(action.payload());
        default:   
            return loginInfo;
    }
}