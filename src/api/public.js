const express = require('express');
const api = express.Router();
const encryption = require('../common/encryption')
const tokenMapping = require('../resource/mapping/token')
const TOKEN = require('../common/token')
const NodeRSA = require("node-rsa")

api.get('/', ((req, res) => request.get(req, res, res => {
    res.send({
        code: 200,
        success: true,
        data: {
            value: '公共接口，无权限限制。'
        }
    })
})))

/**
 * 获取publicKey
 */
api.get('/getPublicKey', (req, res, next) => {
    const query = req.query
    if (!query.name || !query.time_stamp) {
        res.send(request.errorBuild({
            code: 'error$0002',
            errCode: 'error$04$0001'
        }))
        return
    }

    const KEY = new NodeRSA({b: 512})
    const public_key = KEY.exportKey("pkcs1-public-pem")
    const private_key = KEY.exportKey("pkcs1-private-pem");
    const params = {
        name: `"${query.name}"`,
        time_stamp: query.time_stamp,
        public_key: `"${public_key}"`,
        private_key: `"${private_key}"`
    }

    const sql = tokenMapping.DELETE_TOKEN.format({name: `"${query.name}"`}) + ';' +
        tokenMapping.INSERT_TOKEN.format(params)
    connect(sql, (rows => {
        res.send({
            code: 200,
            success: true,
            data: {
                public_key,
                private_key
            }
        })
    }), (err) => {
        console.log(err)
        res.send(request.errorBuild({
            code: "error$0003"
        }))
    })

})

/**
 * 获取token
 */
api.get('/getToken', (req, res, next) => {
    const query = req.query
    if (!query.name || !query.password) {
        res.send(request.errorBuild({
            code: 'error$0002',
            errCode: 'error$04$0002'
        }))
        return
    }

    const sql = tokenMapping.SELECT_TOKEN.format({name: `"${query.name}"`}) + ';' +
        tokenMapping.SELECT_PASSWORD.format({name: `"${query.name}"`})
    connect(sql, (rows => {
        // 查无此人
        if (rows[1].length === 0 || rows[0].length === 0) {
            res.send(request.errorBuild({
                code: "error$0004",
                errCode: "error$02$0002"
            }))
            return
        }
        const private_key = rows[0][0].private_key
        const hash = rows[1][0].password
        let decryptPassword
        try {
            const KEY = new NodeRSA(private_key, "pkcs1-private-pem")
            decryptPassword = KEY.decrypt(query.password, 'utf8')
        } catch (e) {
            // 解密错误
            res.send(request.errorBuild({
                code: "error$0004",
                errCode: "error$02$0001"
            }))
            return
        }
        const compare = encryption.bcrypt.compareSync(decryptPassword, hash)
        if (compare) {
            const access_token = TOKEN.createToken()
            connect(tokenMapping.SAVE_ACCESS_TOKEN.format({
                token: `"${access_token}"`,
                name: `"${query.name}"`
            }), rows => {
                res.send({
                    code: 200,
                    success: true,
                    data: {
                        access_token: access_token,
                        tipMsg: '登录成功'
                    }
                })
            })
        } else {
            res.send(request.errorBuild({
                code: "error$0004",
                errCode: "error$02$0001"
            }))
        }
    }), (err) => {
        res.send(request.errorBuild({
            code: "error$0003"
        }))
    })

})

module.exports = api