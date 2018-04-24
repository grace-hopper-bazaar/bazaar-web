/* eslint-env mocha,chai */

const { expect } = require('chai')
const { db, Product } = require('./index')

describe('Product Model', () => {
  beforeEach(async () => {
    await db.sync({ force: true })
  })

  describe('defaultValue', () => {
    describe('image', () => {
      let choc
      beforeEach(async () => {
        choc = await Product.create({
          title: 'choc',
          description: 'choc',
          price: 10.0,
          inventory: 1
        })
      })

      it('sets image to default', () => {
        expect(choc.image).to.equal('defaultChocolate.jpg')
      })
    })
  })
})
