const Sequelize = require('sequelize');
const db = require('./database');

const Cart = db.define('cart', {
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
    allowNull: false,
  }

});

module.exports = Cart;
