const Sequelize = require('sequelize')
const db = require('./database')

const Cart = db.define('cart', {
  subtotal: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
})

module.exports = Cart
