const Sequelize = require('sequelize')
const db = require('./database')
const Product = require('./product.js')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

// TODO: finish this!
Review.afterCreate(async instance => {
  try {
    console.log('AFTR SAVE')
    const reviews = await Review.findAll({
      where: { productId: instance.productId }
    })

    const avg = await Review.findAll({
      where: {
        productId: instance.productId
      },
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('rating')), 'average_rating']
      ]
    })

    console.log('AVG', avg[0].getDataValue('average_rating'))
    console.log('AVG', avg[0].get('average_rating'))

    const product = await Product.findById(instance.productId)
    return product.update({ rating: avg.getDataValue('average_rating') })
  } catch (error) {
    console.log('BOOM: you fail', error)
  }
})

module.exports = Review
