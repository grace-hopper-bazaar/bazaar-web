const router = require('express').Router()
const { Product, Cart, Lineitem } = require('../../db')
module.exports = router

// Return all items in cart associated with the current session
// GET /api/cart/items
router.get('/items', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: { id: req.session.cartId },
      include: [{ all: true }]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// Add a new item to Cart
// body: { quantity, productId }
router.post('/items', async (req, res, next) => {
  // our cart is in req.session.cartId
  try {
    const product = await Product.findById(req.body.productId)
    const itemObj = {
      cartId: req.session.cartId,
      price: product.price,
      productId: product.id,
      quantity: req.body.quantity,
      title: product.title
    }

    const newItem = await Lineitem.create(itemObj)
    res.json(newItem)
  } catch (err) {
    next(err)
  }
})

// Modify a cart item
// body: { quantity }
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
