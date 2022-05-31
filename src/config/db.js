const Sequelize = require('sequelize')
const path  = require('path')

const database = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(path.resolve('.'),'database.sqlite'),
    logging: false
})

module.exports = database