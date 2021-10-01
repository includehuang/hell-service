const _bcrypt = require('bcrypt')
const saltRounds = 5
const NodeRSA = require('node-rsa')

// bcrypt加密
const bcrypt = {
    saltRounds: saltRounds,
    // 加密
    hash: async function (password, salt = this.saltRounds) {
        return await _bcrypt.hash(password, salt)
    },
    // 同步加密，兼容明文密码
    hashSync: function (password, salt = this.saltRounds) {
        return password.indexOf('$2b') !== 0 && password.indexOf('$2a') !== 0 ? _bcrypt.hashSync(password, salt) : password
    },
    // 比对
    compareSync: function(password, hash) {
        hash = this.hashSync(hash)
        return _bcrypt.compareSync(password, hash)
    },
    /**
     * 加密字符串并处理
     * @param password {String}
     * @param callback {Function}
     * @param option {Object}
     */
    haseDel: function (password, callback = function (err, hash) {}, option) {
        _bcrypt.hash(password, this.saltRounds, option ? (err, hash) => {callback(err, hash, option)} : callback)
    },
    /**
     * 比对字符串并处理
     * @param password {String}
     * @param hash {String}
     * @param callback {Function}
     * @param option {Object}
     */
    compareDel: function (password, hash, callback = function (err, result) {}, option) {
        hash = this.hashSync(hash)
        _bcrypt.compare(password, hash, option ? (err, result) => {callback(err, result, option)} : callback)
    },
    setSaltRounds: function (saltRounds) {
        this.saltRounds = saltRounds
    }
}

// RSA加密解密
const RSA = {
    key: null,
    init: (option) => {
        this.key = new NodeRSA(option ? option : {b: 512})
        return this.key
    },
    encrypt: (text) => {
        return this.key.encrypt(text, 'base64')
    },
    decrypt: (encrypted) => {
        return this.key.decrypt(encrypted, 'utf8')
    }
}

module.exports = {
    _bcrypt,
    bcrypt,
    RSA
}
