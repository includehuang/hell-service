const fs = require('fs');
const path = require('path');

const baseUrl = './../../' // 相对于根目录的URL

// 获取文件，默认UTF-8编码
const getFile = function (url, code = 'utf-8') {
    url = baseUrl + url
    let file
    try {
        file = fs.readFileSync(path.resolve(__dirname, url), code)
        file = {
            data: file,
            success: true,
        }
    }catch (err) {
        if (err.code === 'ENOENT') {
            file = {
                data: 'no such file or directory',
                success: false,
                code: 'error$10$0001'
            }
        }else {
            file = {
                data: 'file error',
                error: err,
                success: false,
                code: 'error$0001'
            }
        }
    }
    return  file
}

// 获取文件子元素，默认UTF-8编码
const getFileElement = function (url, rules = null, type = 'txt', code = 'utf-8') {
    url = baseUrl + url
    let file = null
    let element
    try {
        file = fs.readFileSync(path.resolve(__dirname, url), code)
        element = fileElementRules(file, rules, type)
    }catch (err) {
        if (err.code === 'ENOENT') {
            element = {
                data: 'no such file or directory',
                success: false,
                code: 'error$10$0001'
            }
        }else {
            element = {
                data: 'file error',
                error: err,
                success: false,
                code: 'error$0001'
            }
        }
    }
    return  element
}

// 根据规则获取file对象中的属性
const fileElementRules = function (file, rules = null, type = 'txt') {
    if (!rules) {
        return file
    }
    let fJson = type === 'txt' ? JSON.parse(file) : file
    const ruleList = rules.split('&')

    return ruleList.reduce((obj, item) => {
        if (item === '') {
            return obj
        }
        if (obj && obj[item] !== undefined) {
            return obj[item]
        }else {
            return null
        }
    }, fJson)
}

module.exports = {
    getFile,
    getFileElement
}
