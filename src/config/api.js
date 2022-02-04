import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://mexiquito.herokuapp.com/api';

const mexiquitoApi = axios.create({
  baseURL: API_URL
});

mexiquitoApi.interceptors.request.use((request) => {
  const jwt = sessionStorage.getItem('jwt');
  if (jwt) {
    request.headers['Authorization'] = jwt;
  }
  return request;
});

export default mexiquitoApi;