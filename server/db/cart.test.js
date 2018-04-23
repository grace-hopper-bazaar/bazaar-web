/* eslint-env mocha,chai */

const { expect } = require('chai')
const { db, Cart, Lineitem, Product } = require('./index')

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

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Associates', () => {
    let instance, product1, product2

    beforeEach(async () => {
      instance = await Cart.create({})
      product1 = await Product.create(hazelnut)
      product2 = await Product.create(hazelnut)
    })

    it('with line-items', async () => {
      await Lineitem.create({
        productId: product1.id,
        price: product1.price,
        title: product1.title,
        quantity: 1,
        cartId: instance.id
      })

      await Lineitem.create({
        productId: product2.id,
        price: product2.price,
        title: product2.title,
        quantity: 1,
        cartId: instance.id
      })

      const items = await Lineitem.findAll({
        where: { cartId: instance.id }
      })
      expect(items.length).to.equal(2)
    })
  })
})
