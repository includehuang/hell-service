const express = require('express');
// const fileApi = require('@/utils/file')
let api = express.Router();

const request = require('@common/request')

// const RSA = require('./RSA')
//
// api.use('/rsa', RSA)

api.get('/2', ((req, res) => {
    request.get(req, res, () => {
        res.send('API 网关')
    })
}))
api.get('/2/3/4/5/6/7', ((req, res) => {
    request.get(req, res, () => {
        res.send('API 网关')
    })
}))

api.get('/', ((req, res) => request.get(req, res)))

module.exports = api