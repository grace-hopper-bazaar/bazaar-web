/* eslint-env mocha,chai */

const { expect } = require('chai')
const { db, Cart, Lineitem, Order, Product, User } = require('./index')

const hazelnut = {
  title: 'Hazelnut Truffles',
  description:
    'Complex, decadent dark chocolate truffles with toasted hazelnuts and bourbon.',
  price: 25.0,
  inventory: 100,
  image: 'hazelnutTruffles.jpg'
}

const peanut = {
  title: 'Peanut Truffles',
  description:
    'Complex, decadent dark chocolate truffles with toasted peanuts and bourbon.',
  price: 125.0,
  inventory: 100,
  image: 'hazelnutTruffles.jpg'
}

describe('Order model', () => {
  let anOrder
  let user
  let liHazelnut, liPeanut

  beforeEach(async () => {
    await db.sync({ force: true })
    user = await User.create({
      email: 'cody@puppybook.com',
      password: 'bones'
    })

    const h = await Product.create(hazelnut)
    const p = await Product.create(peanut)
    const cart = await Cart.create({})
    const order = await Order.create({ userId: user.id })

    liHazelnut = await Lineitem.create({
      ...hazelnut,
      productId: h.id,
      orderId: order.id
    })
    liPeanut = await Lineitem.create({
      ...peanut,
      productId: p.id,
      orderId: order.id
    })

    anOrder = await Order.findAll({
      where: { userId: user.id },
      include: [{ all: true }]
    })
    anOrder = anOrder[0]
  })

  it('is related to lineitems', () => {
    expect(anOrder.lineitems.length).to.be.equal(2)
  })

  it('is related to a user', async () => {
    expect(anOrder.user.email).to.be.equal(user.email)
  })
})
