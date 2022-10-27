const jwt = require('jsonwebtoken')

// 本地的密钥，随便定义
const secret = 'wff'

// 派发jwt
exports.publish = function (res, maxAge = 3600 * 24, info = {}) {
    const token = jwt.sign(info, secret, {
        expiresIn: maxAge
    })
    // 添加其他传输
    res.header('authorization', token)
}

// 验证token
exports.verify = function (req) {
    let token = req.headers.authorization.token
    if (!token) {
        // 没有token
        return null
    }
    // authorization: bearer token
    token = token.split(' ')
    token = token.length === 1 ? token[0] : token[1]

    try {
        const result = jwt.verify(token, secret)
        return result
    } catch (error) {
        return null
    }
}
