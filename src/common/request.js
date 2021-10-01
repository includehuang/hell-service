const defaultSuccess = {
    code: 200,
    type: 'success',
    success: true,
    data: {}
}
const errorCode = require('../resource/message/errorCode')
/**
 *
 * @param req {Request}
 * @param res {Response}
 * @param callback {Function}
 */
const get = function(req, res, callback = () => res.send(defaultSuccess)) {
    switch (req.baseUrl) {
        // 需要验证token
        // case '/gw' : {
        //     if (!req.header('Access-Token')) {
        //         res.send(buildError({
        //             code: 0,
        //             errCode: 'error$00$0001'
        //         }))
        //         return
        //     }
        //     break
        // }
        // public下接口没有权限限制
        case '/public' : break;
    }
    console.log('收到请求：     ', req.originalUrl)
    callback()
}

const errorBuild = function ({code = 'error$0001', url = undefined, errCode = undefined, errMsg = undefined}) {
    return {
        success: false,
        type: 'error',
        code: code,
        data: {
            url: url,
            errCode: errCode,
            errMsg: errMsg ? errMsg : errCode ? errorCode[errCode] : errorCode[code]
        }
    }
}

global.request = {
    get,
    errorBuild
}