// 文件上传
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

// 有两个选项可用，destination 和 filename。他们都是用来确定文件存储位置的函数
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb第一个参数处理错误
        cb(null, path.resolve(__dirname, '../../public/upload'))
    },
    filename: function (req, file, cb) {
        // 时间戳-6位随机字符.文件后缀
        const timeStamp = Date.now()
        const randomStr = Math.random().toString(36).slice(-6)
        const ext = path.extname(file.originalname)
        const filename = `${timeStamp}-${randomStr}${ext}`
        cb(null, filename)
    }
})

const upload = multer({
    storage: storage,
    limit: 150 * 1024
    // fileFilter(req, file, cb) {
    //     //验证文件后缀名
    //     const extname = path.extname(file.originalname)
    // }
})

router.post('/', upload.single('img'), (req, res) => {
    console.log(req.file);
    const url = `/upload/${req.file.filename}`
    res.send({
        code: 0,
        msg: '',
        data: url
    })
})

module.exports = router