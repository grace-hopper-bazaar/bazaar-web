const router = require('express').Router()
const { Product } = require('../../db')
module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const users = await Product.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
