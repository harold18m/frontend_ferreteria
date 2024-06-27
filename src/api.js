// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cloud.marketingdigital.org.pe/',
});

export default api;
