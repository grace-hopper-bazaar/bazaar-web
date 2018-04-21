/* eslint-env mocha,chai */

const { expect } = require('chai')
const { db, Cart, Lineitem } = require('./index')

describe('Lineitem model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('has the correct attributes', () => {
    let lineitem
    const li = {
      title: 'hello',
      price: 2.5,
      quantity: 10
    }

    beforeEach(async () => {
      const cart = await Cart.create({})
      li.cartId = cart.id
      lineitem = await Lineitem.create(li)
    })

    it.only('title', () => {
      expect(lineitem.title).to.equal(li.title)
    })

    it('price', () => {
      expect(lineitem.price).to.equal(li.price)
    })

    it('quantity', () => {
      expect(lineitem.quantity).to.equal(li.quantity)
    })
  })
})
