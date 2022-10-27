const Student = require('../modules/Student')
const { pick } = require('../util/propertyHelper')
const validate = require('validate.js')
const { Op } = require('sequelize')
const Class = require('../modules/Class')

exports.addStudent = async obj => {
    obj = pick(obj, 'name', 'birthday', 'sex', 'mobile', 'ClassId')
    validate.validators.classExits = async value => {
        const c = await Class.findByPk(value)
        if (c) {
            return
        }
        return 'is not exist'
    }

    const rule = {
        //验证规则
        name: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            length: {
                minimum: 1,
                maximum: 10
            }
        },
        birthday: {
            presence: {
                allowEmpty: false
            },
            datetime: {
                dateOnly: true,
                earliest: +moment.utc().subtract(100, 'y'),
                latest: +moment.utc().subtract(5, 'y')
            }
        },
        sex: {
            presence: true,
            type: 'boolean'
        },
        mobile: {
            presence: {
                allowEmpty: false
            },
            format: /1\d{10}/
        },
        ClassId: {
            presence: true,
            numericality: {
                onlyInteger: true,
                strict: false
            },
            classExits: true
        }
    }
    await validate.async(stuObj, rule)
    const ins = await Student.create(stuObj)
    return ins.toJSON()
}

exports.deleteStudent = async id => {
    return await Student.destroy({
        where: {
            id
        }
    })
}

exports.updateStudent = async function (id, obj) {
    return await Student.update(obj, {
        where: {
            id
        }
    })
}

exports.getStudentById = async id => {
    const result = await Student.findByPk(id)
    if (result) {
        return result.toJSON()
    }
    return null
}

exports.getStudents = async (page, limit, sex, name) => {
    const where = {}
    if (sex !== -1) {
        where.sex = !!sex
    }

    if (name) {
        where.name = {
            [Op.like]: `%${name}%`
        }
    }

    const result = await Student.findAndCountAll({
        attributes: ['id', 'name', 'sex', 'birthday', 'age'],
        where,
        include: [Class],
        offset: (page - 1) * limit,
        limit: +limit
    })
    return {
        total: result.count,
        datas: JSON.parse(JSON.stringify(result.rows))
    }
}
