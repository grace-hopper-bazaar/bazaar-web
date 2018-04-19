const router = require('express').Router()
const { Product, Category, Review, Cart } = require('../../db')
module.exports = router

///api/cart

// GET ALL PRODUCTS from Cart
router.get('/', async (req, res, next) => {
  try {
    const products = await Cart.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET PRODUCTS from Cart by ID
router.get('/:id', async (req, res, next) => {
  try {
    const products = await Cart.findById(req.params.id)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//ADD TO CART
router.post('/', async (req, res, next) => {
  try {
    const cartProduct = await Cart.create({
      title: req.body.title,
      price: req.body.price,
      quantity: req.body.quantity
    })
    res.json(cartProduct)
  } catch (err) {
    next(err)
  }
})

//ADD TO CART
router.delete('/:id', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
