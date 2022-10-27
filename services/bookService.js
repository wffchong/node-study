const Book = require('../modules/Book')
exports.addBook = async obj => {
    const ins = await Book.create(obj)
    return ins.toJSON()
}

exports.deleteBook = async id => {
    return await Book.destroy({
        where: {
            id
        }
    })
}

exports.updateBook = async function (id, obj) {
    return await Book.update(obj, {
        where: {
            id
        }
    })
}

exports.getBookById = async id => {
    const result = await Book.findByPk(id)
    if (result) {
        return result.toJSON()
    }
    return null
}

// exports.getBooks =async ()=>{
//     const result = await.
// }