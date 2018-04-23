const router = require('express').Router()
const { Product, Lineitem, Order } = require('../../db')

const isAuthenticated = user => user !== undefined
const isAdmin = user => isAuthenticated(req) && req.user.isAdmin
module.exports = router

router.get('/', (req, res, next) => {
  const { user } = req.session
  try {
    if (!isAdmin(user)) return sendStatus(403)

    const orders = Order.findAll({
      include: [{ all: true }]
    })

    res.json(orders)
  } catch (error) {
    console.group('GetOrders::Admin')
    console.log(error)
    console.groupEnd()
  }
})

router.get('/me', (req, res, next) => {
  const { user } = req.session
  try {
    if (!isAuthenticated(user)) return sendStatus(403)

    const orders = Order.findAll({
      where: { userId: user.id },
      include: [{ all: true }]
    })

    res.json(orders)
  } catch (error) {
    console.group('GetOrders::Authenticated')
    console.log(error)
    console.groupEnd()
  }
})
