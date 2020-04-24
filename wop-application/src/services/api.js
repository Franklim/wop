import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333'
    //baseURL: 'http://35.198.23.22:3333'
})

export default api;