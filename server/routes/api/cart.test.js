/* eslint-env mocha,chai */

const { expect } = require('chai')
const request = require('supertest')
const { db, Cart, Lineitem, Product } = require('../../db')
const app = require('../../app')

const session = require('supertest-session')

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

/*
 * TODO: How can we test within a session
 */

describe.only('Cart routes', () => {
  let testSession

  // There is quite a bit of coupling between Cart and Lineitem. We have to
  // implement both to test the cart. For the Cart we have to implement the
  // routes `add lineItem to cart` & `remove lineItem to cart`
  //
  describe('/api/cart/items', () => {
    describe('POST /api/cart/items', () => {
      before(async () => {
        await db.sync({ force: true })
      })

      describe('test a session', () => {
        before(() => (testSession = session(app)))

        it('can add one item', async () => {
          const product = await Product.create(hazelnut)
          const itemToAdd = makeItem(hazelnut, product.id, 1)

          // await request(app)
          await testSession
            .post('/api/cart/items')
            .send(itemToAdd)
            .expect(200)
            .then(async res => {
              expect(res.body).to.be.an('object')
              expect(res.body.title).to.be.equal(hazelnut.title)
              expect(res.body.price).to.be.equal(hazelnut.price)
            })
        })

        it('can add another item', async () => {
          const product = await Product.create(peanut)
          const itemToAdd = makeItem(peanut, product.id, 1)

          // await request(app)
          await testSession
            .post('/api/cart/items')
            .send(itemToAdd)
            .expect(200)
            .then(async res => {
              expect(res.body).to.be.an('object')
              expect(res.body.title).to.be.equal(peanut.title)
              expect(res.body.price).to.be.equal(peanut.price)
            })

          await testSession.get('/api/cart/items').then(res => {
            expect(res.body.lineitems.length).to.be.equal(2)
          })
        })
      })
    })
  })
})
