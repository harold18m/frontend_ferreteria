// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://148.113.174.2:8000/',
});

export default api;
