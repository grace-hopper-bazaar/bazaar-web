/* eslint-env mocha,chai */

const { expect } = require('chai')
const request = require('supertest')
const { db, Cart, Lineitem, Product } = require('../../db')
const app = require('../../app')

const peanut = {
  title: 'Peanut Truffles',
  description:
    'Complex, decadent dark chocolate truffles with toasted peanuts and Tequila.',
  price: 15.0,
  inventory: 50,
  image: 'hazelnutTruffles.jpg'
}
const hazelnut = {
  title: 'Hazelnut Truffles',
  description:
    'Complex, decadent dark chocolate truffles with toasted hazelnuts and bourbon.',
  price: 25.0,
  inventory: 100,
  image: 'hazelnutTruffles.jpg'
}

const makeItem = (obj, pid, quantity) => ({
  ...obj,
  productId: pid,
  quantity
})

describe('Cart routes', () => {
  beforeEach(async () => {
    await db.sync({ force: true })
  })

  // There is quite a bit of coupling between Cart and Lineitem. We have to
  // implement both to test the cart. For the Cart we have to implement the
  // routes `add lineItem to cart` & `remove lineItem to cart`
  //
  describe.only('/api/cart/items', () => {
    beforeEach(async () => {})

    describe('POST /api/cart/items', async () => {
      beforeEach(async () => {
        await db.sync({ force: true })
      })

      it('one item', async () => {
        const product = await Product.create(hazelnut)
        const itemToAdd = makeItem(hazelnut, product.id, 1)

        await request(app)
          .post('/api/cart/items')
          .send(itemToAdd)
          .expect(200)
          .then(async res => {
            // console.log(res.body)
            expect(res.body).to.be.an('object')
            expect(res.body.title).to.be.equal(hazelnut.title)
            expect(res.body.price).to.be.equal(hazelnut.price)

            // check the cart subtotal
            const cart = await Cart.findById(res.body.cartId)
            expect(cart.subtotal).to.be.equal(hazelnut.price)
          })
      })

      it('two items', async () => {
        const hazelnutEntry = await Product.create(hazelnut)
        const hazelnutItem = makeItem(hazelnut, hazelnutEntry.id, 1)

        const peanutEntry = await Product.create(peanut)
        const peanutItem = makeItem(peanut, peanutEntry.id, 1)

        await request(app)
          .post('/api/cart/items')
          .send(hazelnutItem)
          .expect(200)
          .then(async res => {
            await request(app)
              .post('/api/cart/items')
              .send(peanutItem)
              .expect(200)
              .then(async res => {
                // console.log(res.body)
                expect(res.body).to.be.an('object')
                expect(res.body.title).to.be.equal(peanut.title)
                expect(res.body.price).to.be.equal(peanut.price)

                // check the cart subtotal
                const cart = await Cart.findById(res.body.cartId)
                expect(cart.subtotal).to.be.equal(peanut.price + hazelnut.price)
              })
          })
      })
    })
  })
})
