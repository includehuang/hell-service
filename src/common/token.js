require('./database')
const bcrypt = require('./encryption').bcrypt
const RSA = require('./encryption').RSA
const validityTime = 600000 // token和publicKey有效期

module.exports =  {
    validityTime,
    /**
     * 创建token
     * @param name
     * @param time
     * @returns {*}
     */
    createToken: function (name, time) {
        return bcrypt.hashSync(`${name}${time}`)
    },
    /**
     * 验证token是否正确或过期
     * @param token
     * @param name
     * @param time
     */
    compareToken: function (token, name, time) {
        // 返回验证结果
    }
}