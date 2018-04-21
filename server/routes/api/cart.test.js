/* eslint-env mocha,chai */

const { expect } = require('chai')
const request = require('supertest')
const { db, Cart, Lineitem } = require('../../db')
const app = require('../../app')

describe('Cart routes', () => {
  beforeEach(async () => {
    await db.sync({ force: true })
  })

  // There is quite a bit of coupling between Cart and Lineitem. We have to
  // implement both to test the cart. For the Cart we have to implement the
  // routes `add lineItem to cart` & `remove lineItem to cart`
  //
  describe('/api/cart/', () => {
    beforeEach(async () => {})

    it('POST /api/cart', async () => {
      await request(app)
        .post('/api/cart')
        .send()
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
  })
})
