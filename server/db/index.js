const db = require('./database')
const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Review = require('./review')
const Cart = require('./cart')

// associations go here!
Product.belongsToMany(Category, { through: 'productCategories' })
Category.belongsToMany(Product, { through: 'productCategories' })

Product.hasMany(Review, { as: 'reviews' })
Review.belongsTo(Product)

Review.belongsTo(User)
User.hasMany(Review, { as: 'reviews' })

module.exports = {
  db,
  User,
  Product,
  Category,
  Review,
  Cart
}
