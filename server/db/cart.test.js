/* eslint-env mocha,chai */

const { expect } = require('chai')
const { db, Cart, Lineitem } = require('./index')

describe('Cart model', () => {
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

  describe('subtotal reflects line-items', () => {
    let instance

    const addItemToCart = async (price, quantity) => {
      const item = await Lineitem.create({
        cartId: instance.id,
        title: 'item a',
        price,
        quantity
      })
      instance = await instance.reload()
      return item
    }

    beforeEach(async () => {
      instance = await Cart.create({})
    })

    it('for one item', async () => {
      await addItemToCart(50, 1)
      expect(instance.subtotal).to.equal(50.0)
    })

    it('for one items', async () => {
      await addItemToCart(50, 1)
      await addItemToCart(100, 2)
      expect(instance.subtotal).to.equal(250.0)
    })

    it('when one item is removed', async () => {
      const item1 = await addItemToCart(50, 1)
      const item2 = await addItemToCart(100, 2)
      expect(instance.subtotal).to.equal(250.0)

      await item1.destroy()
      instance = await instance.reload()
      expect(instance.subtotal).to.equal(200.0)
    })

    it('when multiple items are removed', async () => {
      const item1 = await addItemToCart(50, 1)
      const item2 = await addItemToCart(100, 2)
      expect(instance.subtotal).to.equal(250.0)

      await item1.destroy()
      await item2.destroy()
      instance = await instance.reload()
      expect(instance.subtotal).to.equal(0.0)
    })
  })
})
