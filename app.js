require('module-alias/register')
require('@utils/string')
require('@common/database')
require('@common/request')
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const apiRoutes = express.Router();
app.use('/api', apiRoutes);
app.use(express.static(path.resolve(__dirname, './dist')))
app.use('/gw', require('@api/gateway'))
app.use('/public', require('@api/public'))
app.use('/book', require('@api/book'))

app.get('/', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})
app.get('/index', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})
app.get('*', function(req, res) {
    res.redirect('/#/exception/404')
})
app.listen(3000);
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack)

});
console.log('服务器启动中……')
console.log('设置数据源：47.99.73.44')
console.log('设置监听端口：3000')
console.log('服务器启动成功。')