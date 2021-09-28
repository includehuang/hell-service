const fs = require('fs');
const path = require('path');
const express = require('express');
const fileApi = require('./src/utils/file')
let api = express.Router();

const get = require('./common/request')

api.get('/', ((req, res) => get(req, res)))
api.get('/2', ((req, res) => {
    res.send(fileApi.getFile('./message/errorCode.json'))
}))
api.get('/md', ((req, res) => {
    res.send(fs.readFileSync(path.resolve(__dirname, './database/underTheStars/test.txt'), 'utf-8'))
}))
api.get('/user', ((req, res) => {
    global.connect('select * from test', rows => {
        res.send(rows)
    })
}))

module.exports = api