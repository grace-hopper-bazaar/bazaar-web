/* eslint-env mocha,chai */

const { expect } = require('chai')
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

const prepareProduct = async (item, quantity = 1) => {
  const product = await Product.create(item)
  return {
    ...item,
    productId: product.id,
    quantity
  }
}

describe('Cart routes', () => {
  let testSession

  // There is quite a bit of coupling between Cart and Lineitem. We have to
  // implement both to test the cart. For the Cart we have to implement the
  // routes `add lineItem to cart` & `remove lineItem to cart`
  //
  describe('/api/cart/items', () => {
    describe('POST /api/cart/checkout', () => {
      before(async () => {
        await db.sync({ force: true })
      })

      describe('add items to a cart', () => {
        before(() => (testSession = session(app)))

        it('can add one item', async () => {
          const itemToAdd = await prepareProduct(hazelnut)

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
          const itemToAdd = await prepareProduct(peanut)

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

        it('can checkout', async () => {
          const email = 'cody@email.com'
          const shippingAddress = '22 Acacia Avenue'
          const total = peanut.price + hazelnut.price

          await testSession
            .post('/api/cart/checkout')
            .send({ email, shippingAddress })
            .expect(200)
            .then(async ({ body: theOrder }) => {
              expect(theOrder.lineitems.length).to.be.equal(2)
              expect(theOrder.email).to.be.equal(email)
              expect(theOrder.shippingAddress).to.be.equal(shippingAddress)
              expect(theOrder.total).to.be.equal(total)

              const cart = await Cart.findAll()
              expect(cart.length).to.be.equal(0)
            })
        })
      })
    })
  })
})
