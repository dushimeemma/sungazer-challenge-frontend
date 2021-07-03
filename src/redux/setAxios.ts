import axios from 'axios';

const token = localStorage.getItem('token');
const url = 'https://sungazer-api.herokuapp.com/';

const setAxios = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token,
  },
});

export default setAxios;
