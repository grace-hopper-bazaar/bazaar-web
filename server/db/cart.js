const Sequelize = require('sequelize');
const db = require('./database');

const Cart = db.define('cart', {

  subtotal: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }

});

module.exports = Cart;
