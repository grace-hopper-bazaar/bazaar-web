const Sequelize = require('sequelize')
const db = require('./database')
const Product = require('./product.js')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [25, 1024]
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

Review.afterCreate(async instance => {
  try {
    const reviews = await Review.findAll({
      where: { productId: instance.productId }
    })

    let avg = await Review.findAll({
      where: {
        productId: instance.productId
      },
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('rating')), 'average_rating']
      ]
    })

    avg = avg[0].getDataValue('average_rating')
    avg = Math.floor(avg)

    const product = await Product.findById(instance.productId)
    return product.update({ rating: avg })
  } catch (error) {
    console.group('Review.afterCreate')
    console.log(error)
    console.groupEnd()
  }
})

module.exports = Review
