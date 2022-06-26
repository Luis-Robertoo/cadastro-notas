const axios = require('axios')

export const http = axios.create({
    baseURL: 'http://localhost:8084/v1/',
    timeout: 1000
})