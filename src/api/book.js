const express = require('express')
const api = express.Router()
const encryption = require('../common/encryption')
const tokenMapping = require('../resource/mapping/token')
const TOKEN = require('../common/token')
const NodeRSA = require("node-rsa")
const FILE = require('../utils/file')

api.get('/', ((req, res) => request.get(req, res, res => {
    res.send({
        code: 200,
        success: true,
        data: {
            value: '公共接口，无权限限制。'
        }
    })
})))

api.get('/getBookList', ((req, res) => {
    const user = req.query.user || 'vision'
    const path = `database/book/${user}/index.json`
    const LIST = FILE.getFile(path)
    res.send({
        code: 200,
        success: true,
        data: LIST.data
    })
}))

api.get('/getBook', (((req, res) => {
    const user = req.query.user || 'vision'
    const name = req.query.name || '魔法师生存守则'
    const path = `database/book/${user}/${name}/index.json`
    const BOOK = FILE.getFile(path)
    res.send({
        code: 200,
        success: true,
        data: BOOK.data
    })
})))

api.get('/getChapter', ((req, res) => {
    const user = req.query.user || 'vision'
    const name = req.query.name || '魔法师生存守则'
    const chapter = req.query.key || '001$001'
    const chs = chapter.split('$').join('/')
    const path = `database/book/${user}/${name}/${chs}.html`
    const CHAPTER = FILE.getFile(path)
    res.send({
        code: 200,
        success: CHAPTER.success,
        data: CHAPTER.data
    })
}))


module.exports = api