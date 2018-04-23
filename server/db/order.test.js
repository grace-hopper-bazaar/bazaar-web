/* eslint-env mocha,chai */

const { expect } = require('chai')
const { db, Cart, Lineitem, Order, Product } = require('./index')

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

describe.only('Order model', () => {
  let anOrder
  let liHazelnut, liPeanut
  const anEmail = 'cody@email.com'
  const anAddress = '22 Acacia avenue'

  beforeEach(async () => {
    await db.sync({ force: true })

    const h = await Product.create(hazelnut)
    const p = await Product.create(peanut)
    const cart = await Cart.create({})
    const order = await Order.create({
      email: anEmail,
      shippingAddress: anAddress
    })

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
      where: { email: anEmail, shippingAddress: anAddress },
      include: [{ all: true }]
    })
    anOrder = anOrder[0]
  })

  it('is related to lineitems', () => {
    expect(anOrder.lineitems.length).to.be.equal(2)
  })

  it('has an email', async () => {
    expect(anOrder.email).to.be.equal(anEmail)
  })

  it('has an address', async () => {
    expect(anOrder.shippingAddress).to.be.equal(anAddress)
  })
})
