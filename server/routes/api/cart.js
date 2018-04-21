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

// Modify a cart item
// PUT /api/cart/items/:id/changeQuantity
router.put('/items/:id/changeQuantity', async (req, res, next) => {
  // our cart is in req.session.cartId
  // this should modify an item `id` IFF it is associated
  // with our `cartId`
  //
  try {
    const lid = req.params.id
    const quantity = req.body.quantity
    let li = await Lineitem.findById(lid)

    // is the line item associated with the correct cartId?
    if (li.cartId !== req.session.cartId) return res.sendStatus(404)

    li = await li.update({ quantity })
    res.json(li)
  } catch (err) {
    next(err)
  }
})

// DELETE an item from Cart
// DELETE /api/cart/items/:id
router.delete('/items/:id', async (req, res, next) => {
  // our cart is in req.session.cartId
  try {
    const lid = req.params.id
    let li = await Lineitem.findById(lid)

    // is the line item associated with the correct cartId?
    if (li.cartId !== req.session.cartId) return res.sendStatus(404)

    li = await li.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
