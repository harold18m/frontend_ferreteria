// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://3.143.220.6:8000/',
});

export default api;