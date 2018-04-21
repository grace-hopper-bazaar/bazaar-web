const router = require('express').Router()
const { Product, Category, Review, Cart, Lineitem } = require('../../db')
module.exports = router

///api/cart

// GET ALL PRODUCTS from Cart
// return all items in a cart for
// the cart associated with the current
// session
// GET /api/cart/items
router.get('/items', async (req, res, next) => {
  // our cart is in req.session.cartId
  try {
    res.json({ status: 'unimplemented' })
  } catch (err) {
    next(err)
  }
})

// Add a new item to Cart
// POST /api/cart/items
router.post('/items', async (req, res, next) => {
  // our cart is in req.session.cartId
  try {
    const itemObj = { ...req.body }
    itemObj.cartId = req.session.cartId

    const newItem = await Lineitem.create(itemObj)

    res.json(newItem)
  } catch (err) {
    next(err)
  }
})

// Add a new item to Cart
// PUT /api/cart/items
router.put('/items', async (req, res, next) => {
  // our cart is in req.session.cartId
  try {
    res.json({ status: 'unimplemented' })
  } catch (err) {
    next(err)
  }
})

// DELETE an item from Cart
// DELETE /api/cart/items
router.delete('/items', async (req, res, next) => {
  // our cart is in req.session.cartId
  try {
    res.json({ status: 'unimplemented' })
  } catch (err) {
    next(err)
  }
})
