// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://web-production-2a30.up.railway.app/',
});

export default api;