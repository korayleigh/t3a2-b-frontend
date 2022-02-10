import axios from 'axios';

console.log(window.location.hostname);
const location_regex = /^https?:\/\/deploy-preview-(\d+)--korayleigh.netlify.app(\/.*)$/;
const hostname_regex = /^deploy-preview-(\d+)--korayleigh.netlify.app$/;

if (window.location.hostname.match(location_regex)) {
  console.log('matched deploy preview location');
}

if (window.location.hostname.match(hostname_regex)) {
  console.log('matched deploy preview hostname');
}

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://mexiquito.herokuapp.com/api';

const mexiquitoApi = axios.create({
  baseURL: API_URL
});

mexiquitoApi.interceptors.request.use((request) => {
  const jwt = sessionStorage.getItem('jwt');
  if (jwt) {
    console.log('jwt', jwt);
    request.headers['Authorization'] = jwt;
  }
  return request;
});

export default mexiquitoApi;