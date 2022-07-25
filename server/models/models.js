const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, minLength: 8, maxLength: 20},
    name: {type: DataTypes.STRING, minLength: 1, maxLength: 254},
    surname: {type: DataTypes.STRING, minLength: 1, maxLength: 254},
    phone: {type: DataTypes.STRING},
})

module.exports = {
    User
}