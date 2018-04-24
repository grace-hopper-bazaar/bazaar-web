const Sequelize = require('sequelize')
const db = require('./database')
const Cart = require('./cart')
const Order = require('./order')

const Lineitem = db.define('lineitem', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = Lineitem
