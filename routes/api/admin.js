const express = require('express')
const router = express.Router()

const AdminService = require('../../services/adminService')
const { asyncHandler } = require('../getSendResult')
const jwt = require('../jwt')
router.post(
    '/login',
    asyncHandler(async (req, res) => {
        const { loginId, loginPwd } = req.body
        const result = await AdminService.login(loginId, loginPwd)
        if (result) {
            // 登录成功
            let value = result.id
            jwt.publish(res, undefined, { id: value })
        }
        return result
    })
)

router.get(
    '/whoami',
    asyncHandler(async (req, res) => {
        return await AdminService.getAdminById(req.userId)
    })
)

module.exports = router
