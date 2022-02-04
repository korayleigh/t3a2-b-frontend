import axios from 'axios'

const mexiquitoApi = axios.create({
  baseURL: 'http://localhost:3000/api'
})

mexiquitoApi.interceptors.request.use((request) => {
  const jwt = sessionStorage.getItem('jwt')
  if (jwt) {
    request.headers['Authorization'] = jwt
  }
  return request
})

export default mexiquitoApi