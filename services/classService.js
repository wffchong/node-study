const Class = require('../modules/Class')
exports.addClass = async obj => {
    const ins = await Class.create(obj)
    return ins.toJSON()
}

exports.deleteClass = async id => {
    return await Class.destroy({
        where: {
            id
        }
    })
}

exports.updateClass = async function (id, obj) {
    return await Class.update(obj, {
        where: {
            id
        }
    })
}
