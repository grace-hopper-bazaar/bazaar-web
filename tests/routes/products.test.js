/* eslint-env mocha, chai */

const { expect } = require('chai')
const sinon = require('sinon')
const supertest = require('supertest')
const app = require('../server')
const agent = supertest.agent(app)

// const seed = require('./test-seed')
// const { Product } = require('../server/db/models')

describe('Product Routes', () => {
  beforeEach(async () => {
    // const data = await seed()
  })

  describe('GET', () => {
    it('GET /products', () => {
      return agent
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(
            res.body.some(product => product.title === 'truffles')
          ).to.equal(true)
        })
    })
  })
})
