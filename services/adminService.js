const md5 = require('md5')
const Admin = require('../modules/Admin')
exports.addAdmin = async adminObj => {
    adminObj.loginPwd = md5(adminObj.loginPwd)
    const ins = await Admin.create(adminObj)
    return ins.toJSON()
}

exports.deleteAdmin = async adminId => {
    const result = await Admin.destroy({
        where: {
            id: adminId
        }
    })

    return result
}

exports.updateAdmin = async function (id, adminObj) {
    if (adminObj.loginPwd) {
        adminObj.loginPwd = md5(adminObj.loginPwd)
    }

    const result = await Admin.update(adminObj, {
        where: {
            id
        }
    })
    return result
}

exports.login = async (loginId, loginPwd) => {
    loginPwd = md5(loginPwd)
    const result = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        }
    })
    if (result && result.loginId === loginId) {
        return result.toJSON()
    }
    return null
}

exports.getAdminById = async id => {
    const result = await Admin.findByPk(id)
    if (result) {
        return result.toJSON()
    }
    return null
}

exports.getAdmins = async () => {
    const result = await Admin.findAll()
    return JSON.parse(JSON.stringify(result))
}
