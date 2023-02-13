import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
if(sessionStorage.getItem("data") && sessionStorage.getItem("data") != 'undefined'){
    const token = JSON.parse(sessionStorage.getItem("data")).token;
    axios.defaults.headers.common['token'] = token;
}

export default axios;