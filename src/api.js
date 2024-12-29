// api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://app.multilimpsac.com/',
})

export default api
