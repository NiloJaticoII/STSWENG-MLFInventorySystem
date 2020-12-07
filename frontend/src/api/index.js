import axios from 'axios';

const url = 'http://localhost:1337/loginRoutes';

export const login = (loginInfo) => axios.post(url, loginInfo);

