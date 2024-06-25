// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://cloud.marketingdigital.org.pe:8000/',
});

export default api;
