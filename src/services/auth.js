// auth.js
import axios from 'axios';

export async function login(username, password) {
    const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password
    });

    return response.data.token;
}

export function setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
}

export function clearAuthToken() {
    delete axios.defaults.headers.common['Authorization'];
}