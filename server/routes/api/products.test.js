/* eslint-env mocha,chai */

const { expect } = require('chai')
const request = require('supertest')
const { db, Product, User } = require('../../db')
const app = require('../../app')

// our one and only user.
let cody = { email: 'cody@email.com', password: '123' }

// the chocolates.
const [hazelnut, lavender, king] = [
  {
    title: 'Hazelnut Truffles',
    description:
      'Complex, decadent dark chocolate truffles with toasted hazelnuts and bourbon.',
    price: 25.0,
    inventory: 100,
    image: 'hazelnutTruffles.jpg'
  },
  {
    title: 'Lavender Squares',
    description:
      'Aromatic milk chocolate squares with lavender essence and edible floral garnish.',
    price: 25.0,
    inventory: 100,
    image: 'lavenderSquares.jpg'
  },
  {
    title: "The King's Truffles",
    description:
      'Inspired by Elvis Presley, these truffles feature white chocolate, peanutbutter, and a thin layer of banana.',
    price: 25.0,
    inventory: 100,
    image: 'whiteChocolateTruffles.jpg'
  }
]

describe('User routes', () => {
  let bigDog
  beforeEach(async () => {
    await db.sync({ force: true })
    bigDog = await User.create(cody)
  })

  describe('/api/products/', () => {
    beforeEach(async () => {
      // create test data
      await Promise.all([
        Product.create(hazelnut),
        Product.create(lavender),
        Product.create(king)
      ])
    })

    it('GET /api/products', async () => {
      await request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[1].title).to.be.equal(hazelnut.title)
        })
    })
  }) // end describe('/api/products/:id')

  describe('/api/products/:id', () => {
    let pastry
    beforeEach(async () => {
      // create test data
      await Product.create(hazelnut)
    })

    it('GET /api/products/:id', async () => {
      await request(app)
        .get('/api/products/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          for (let attr of 'title description price inventory image'.split()) {
            expect(res.body[attr]).to.equal(hazelnut[attr])
          }
        })
    })
  }) // end describe('/api/products/:id')
}) // end describe('Product routes')
