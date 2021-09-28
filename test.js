const express = require('express');
const fileApi = require('@/utils/file')
let api = express.Router();

const get = require('@common/request')

api.get('/', ((req, res) => get(req, res)))
api.get('/2', ((req, res) => {
    res.send(fileApi.getFile('resource/message/errorCode.json'))
}))
api.get('/md', ((req, res) => {
    res.send(fileApi.getFile('database/underTheStars/test.txt'))
}))
api.get('/user', ((req, res) => {
    global.connect('select * from test', rows => {
        res.send(rows)
    })
}))

module.exports = api