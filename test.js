const express = require('express');
let api = express.Router();

const get = require('./common/request')

api.get('/', ((req, res) => get(req, res)))
api.get('/2', ((req, res) => get(req, res, () => {
    return {
        title: '测试内容',
        value: '测试结果',
        query: req.query
    }
})))

module.exports = api