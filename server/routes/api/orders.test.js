/* eslint-env mocha,chai */

const { expect } = require('chai')
const request = require('supertest')
const { db, Cart, Lineitem, Product, Order } = require('../../db')
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

/*
 * TODO: Admin wants to see all orders
 *       Authenticated users want to see all their past orders
 */

xdescribe('GET Order', () => {
  beforeEach(async () => {
    await db.sync({ force: true })
  })

  describe('for admin user', () => {
    beforeEach(async () => {})

    it('retrieves all orders for admins', async () => {
      const product = await Product.create(hazelnut)
      const itemToAdd = makeItem(hazelnut, product.id, 1)

      await request(app)
        .post('/api/orders/me')
        .send(itemToAdd)
        .expect(200)
        .then(async res => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.be.equal(hazelnut.title)
          expect(res.body.price).to.be.equal(hazelnut.price)
        })
    })

    it('rejects non-admin users', async () => {
      const product = await Product.create(hazelnut)
      const itemToAdd = makeItem(hazelnut, product.id, 1)

      await request(app)
        .post('/api/orders/me')
        .send(itemToAdd)
        .expect(200)
        .then(async res => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.be.equal(hazelnut.title)
          expect(res.body.price).to.be.equal(hazelnut.price)
        })
    })
  })
  describe('for authenticated user', () => {
    beforeEach(async () => {})

    it('retrieves only orders for authenticated me', async () => {
      const product = await Product.create(hazelnut)
      const itemToAdd = makeItem(hazelnut, product.id, 1)

      await request(app)
        .post('/api/orders/me')
        .send(itemToAdd)
        .expect(200)
        .then(async res => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.be.equal(hazelnut.title)
          expect(res.body.price).to.be.equal(hazelnut.price)
        })
    })

    it('rejects unauthenticated me', async () => {
      const product = await Product.create(hazelnut)
      const itemToAdd = makeItem(hazelnut, product.id, 1)

      await request(app)
        .post('/api/orders/me')
        .send(itemToAdd)
        .expect(200)
        .then(async res => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.be.equal(hazelnut.title)
          expect(res.body.price).to.be.equal(hazelnut.price)
        })
    })
  })
})
