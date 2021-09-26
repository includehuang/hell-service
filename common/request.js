const buildError = function (params) {
    let ERROR = {}
    ERROR.code = params.code ? params.code :  0
    ERROR.errCode = params.errCode
    ERROR.errTip = params.errTip
    ERROR.errMsg = params.errMsg
    ERROR.body = params.body
    ERROR.data = params.data
    ERROR.success = params.success || false
    return ERROR
}
const defaultSuccess = {
    code: 200,
    success: true,
    data: {}
}
/**
 *
 * @param req {Request}
 * @param res {Response}
 * @param value {Function}
 */
const get = function(req, res, value = () => defaultSuccess) {
    if (!req.header('Access-Token')) {
        res.send(buildError({
            code: 0,
            errCode: 'error$0000001'
        }))
        return
    }
    res.send(value())
}

module.exports = get