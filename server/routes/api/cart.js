
const router = require('express').Router()
const { Product, Cart, Lineitem, Order } = require('../../db')
module.exports = router

router.post('/checkout', async (req, res, next) => {
  // body: {email, shippingAddress}
  try {
    // validate cart
    const cart = await Cart.findById(req.session.cartId)
    if (!cart) return res.sendStatus(404)

    const items = await Lineitem.findAll({
      where: {
        cartId: cart.id
      }
    })

    let order = await Order.create(req.body)
    const promises = items.map(async item => item.update({ orderId: order.id }))
    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0.0
    )
    promises.push(order.update({ total }))
    await Promise.all(promises)

    await Cart.destroy({ where: { id: req.session.cartId } })
    req.session.cartId = null

    order = await Order.findOne({
      where: { id: order.id },
      include: [{ all: true }]
    })

    //TODO: send confirmation email

    res.json(order)
  } catch (error) {
    console.group('Checkout')
    console.log(error)
    console.groupEnd()
  }
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
		const lid = req.params.id;
		const quantity = req.body.quantity;
		let li = await Lineitem.findById(lid);

		// does the lineitem exist AND is it associated with the correct cartId?
		if (!li || li.cartId !== req.session.cartId) return res.sendStatus(404);

		li = await li.update({ quantity });
		res.json(li);
	} catch (err) {
		next(err);
	}
});

router.delete('/items/:id', async (req, res, next) => {
	// our cart is in req.session.cartId
	try {
		const lid = req.params.id;
		let li = await Lineitem.findById(lid);

		// does the lineitem exist AND is it associated with the correct cartId?
		if (!li || li.cartId !== req.session.cartId) return res.sendStatus(404);

		await li.destroy();
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});
