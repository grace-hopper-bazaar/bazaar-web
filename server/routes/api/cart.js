const router = require('express').Router()
const { Product, Cart, Lineitem } = require('../../db')
module.exports = router

router.post('/items/checkout', async (req, res, next) => {
  // session: has user & cartId
  // body has: email and shipping info
  // This user wants to checkout the items in this cart!
  // 1. an order is created: user
  //    for each litemitem in cart -> associate with new order
  // 2. delete current cart. (todo: verify lineitems nolong reference deleted
  //    cart)
  // 3. send confirmation email and return new order result to front end
})

// Return all items in cart associated with the current session
// GET /api/cart/items
router.get('/items', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { id: req.session.cartId },
      include: [{ all: true }]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/items', async (req, res, next) => {
  // body: { quantity, productId }
  try {
    // Extract title, price from productId.
    //
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

router.put('/items/:id/changeQuantity', async (req, res, next) => {
  // our cart is in req.session.cartId
  // this should modify an item `id` IFF it is associated
  // with our `cartId`
  //
  try {
    const lid = req.params.id
    const quantity = req.body.quantity
    let li = await Lineitem.findById(lid)

    // does the lineitem exist AND is it associated with the correct cartId?
    if (!li || li.cartId !== req.session.cartId) return res.sendStatus(404)

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

    // does the lineitem exist AND is it associated with the correct cartId?
    if (!li || li.cartId !== req.session.cartId) return res.sendStatus(404)

    li = await li.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
