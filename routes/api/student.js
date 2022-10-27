const express = require('express')
const router = express.Router()

const studentService = require('../../services/studentService')

const { asyncHandler } = require('../getSendResult')

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const sex = req.query.sex || -1
        const name = req.query.name || ''
        return await studentService.getStudents(page, limit, sex, name)
    })
)

router.get(
    '/:id',
    asyncHandler(async req => {
        return await studentService.getStudentById(req.params.id)
    })
)

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        return await studentService.addStudent(req.body)
    })
)

router.delete(
    '/:id',
    asyncHandler(async (req, res, next) => {
        return await studentService.deleteStudent(req.params.id)
    })
)

router.put(
    '/:id',
    asyncHandler(async (req, res, next) => {
        return await studentService.updateStudent(req.params.id, req.body)
    })
)

module.exports = router
