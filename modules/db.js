const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('myschooldb', 'root', 'wangfufan', {
    host: 'localhost',
    dialect: 'mysql',
    logging: null
})

module.exports = sequelize
