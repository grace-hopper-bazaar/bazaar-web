const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const err = new Error('API route not found')
  err.status = 404
  next(err)
})
