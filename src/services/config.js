const axios = require('axios')

export const http = axios.create({
    baseURL: 'http://localhost:8085/v1/',
    timeout: 1000
})