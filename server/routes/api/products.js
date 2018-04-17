const router = require('express').Router()
const { Product } = require('../../db')
module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) return res.sendStatus(404)

    res.json(product)
  } catch (err) {
    next(err)
  }
})
