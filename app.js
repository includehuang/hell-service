const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const apiRoutes = express.Router();
app.use('/api', apiRoutes);
app.use(express.static(path.resolve(__dirname, './dist')))
app.use('/test', require('./test.js'))

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
console.log('Success for port:3000')