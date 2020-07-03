import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:85/api/';
Vue.prototype.$axios = axios
let jwtToken = localStorage.getItem('token');
if (jwtToken){
  setHeaderToken();

  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    const errorCode = error.response.status;
    if (errorCode === 401 || errorCode === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return this.$router.push({name: 'IndexPage'});
    }
    return Promise.reject(error);
  })
}

function setHeaderToken() {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

function refreshToken() {
  axios.post('refresh-token')
    .then((data) => {
      localStorage.setItem('token', data.data.access_token);
      setHeaderToken();
    })
    .catch(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return this.$router.push({path: '/'});
    })
}
