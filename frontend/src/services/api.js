import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  auth: {
    username: 'admin',
    password: 'password'
  }
});

export default API;
