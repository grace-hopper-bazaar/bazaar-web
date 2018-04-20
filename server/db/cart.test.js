/* eslint-env mocha,chai */

const { expect } = require('chai')
const { db, Cart, Lineitem } = require('./index')

describe.only('Cart model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('has the correct attributes', () => {
    let instance

    beforeEach(async () => {
      instance = await Cart.create({})
    })

    it('subtotal to be initialized to zero', () => {
      expect(instance.subtotal).to.equal(0)
    })
  })

  describe('updates when line-items are added', () => {
    let instance

    beforeEach(async () => {
      instance = await Cart.create({})
      await Lineitem.create({
        cartId: instance.id,
        title: 'item a',
        price: 50.0,
        quantity: 1
      })
      console.log('HERE I AM!')
      instance = await instance.reload()
    })

    it('sums up one item', () => {
      expect(instance.subtotal).to.equal(50.0)
    })
  })
})
