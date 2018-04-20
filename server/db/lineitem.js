const Sequelize = require('sequelize')
const db = require('./database')
const Cart = require('./cart')

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
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

Lineitem.afterSave(async instance => {
  try {
    // get the cart
    const theCart = await Cart.findById(instance.cartId)

    // update cart's subtotal
    let { subtotal } = theCart
    subtotal += instance.price * instance.quantity

    await theCart.update({ subtotal })
  } catch (error) {
    console.group('LineItem hook')
    console.log(error)
    console.groupEnd()
  }
})

module.exports = Lineitem
