/* eslint-env mocha,chai */

const { expect } = require('chai')
const { db, Cart } = require('./index')

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('has the correct attributes', () => {
    let instance
    const cart = {
      title: 'hello',
      price: 2.5,
      quantity: 10
    }

    beforeEach(async () => {
      instance = await Cart.create(cart)
    })

    it('subtotal', () => {
      expect(instance.title).to.equal(cart.subtotal)
    })

  })
})
