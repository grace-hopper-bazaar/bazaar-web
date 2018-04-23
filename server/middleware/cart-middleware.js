const router = require('express').Router()
const session = require('express-session')
const { Cart } = require('../db')
module.exports = router

// This middleware ensures there is always a valid
// cart associated with the session.
//
router.use(async (req, res, next) => {
  let { cartId } = req.session
  let cart

  try {
    // if no cart id then create one and associate it
    // with the session
    //
    if (!cartId) {
      cart = await Cart.create({})
      cartId = cart.id
      req.session.cartId = cartId
    } else {
      // Validate the cart id associated with the session
      // We want to ensure the id points to a valid cart
      //
      cart = await Cart.findById(cartId)

      if (!cart) {
        // Create a valid cart
        cart = await Cart.create({})
        cartId = cart.id
        req.session.cartId = cartId
      }
    }
  } catch (error) {
    console.group('CartMiddleware')
    console.log(error)
    console.groupEnd()
    return next(error)
  }
  next()
})
