const router = require('express').Router()
const { Product, Category, Review } = require('../../db')
module.exports = router

// GET /api/products/:id/reviews
router.get('/:id/reviews', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    const reviews = await product.getReviews()
    console.log(reviews)
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id, {
      include: [{ model: Category }]
    })

    if (!product) return res.sendStatus(404)

    res.json(product)
  } catch (err) {
    next(err)
  }
})
