import axios from 'axios'
import WebSocket from 'websocket';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
if(sessionStorage.getItem("data") && sessionStorage.getItem("data") != 'undefined'){
    const token = JSON.parse(sessionStorage.getItem("data")).token;
    axios.defaults.headers.common['token'] = token;
}

const Socket = WebSocket.w3cwebsocket;
const client = new Socket(process.env.REACT_APP_SOCKET_API_URL);

client.onopen = () => {
    console.log('WebSocket Client Connected');
};
client.onerror = function() {
    console.log('Connection Error');
};

export default axios;
export {client};