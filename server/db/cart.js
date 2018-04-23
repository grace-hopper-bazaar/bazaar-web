const Sequelize = require('sequelize')
const db = require('./database')

// Cart is only used to organize line-items
const Cart = db.define('cart', {})

module.exports = Cart
