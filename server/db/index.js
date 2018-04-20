const db = require('./database')
const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Review = require('./review')
const Cart = require('./cart')
const Lineitem = require('./lineitem.js')

// associations go here!
Product.belongsToMany(Category, { through: 'productCategories' })
Category.belongsToMany(Product, { through: 'productCategories' })

Product.hasMany(Review, { as: 'reviews' })
Review.belongsTo(Product)

Review.belongsTo(User)
User.hasMany(Review, { as: 'reviews' })

Cart.hasMany(Lineitem)
Lineitem.belongsTo(Cart)

module.exports = {
  Cart,
  Category,
  Lineitem,
  Product,
  Review,
  User,
  db
}
