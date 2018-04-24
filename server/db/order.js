const Sequelize = require('sequelize')
const db = require('./database')

// TODO: order will have shipping info
module.exports = db.define('orders', {
  shippingAddress: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
})
