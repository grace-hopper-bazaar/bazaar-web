const db = require('./database');
const User = require('./user');
const Product = require('./product');
const Category = require('./category');

// associations go here!
Product.belongsTo(Category);
Category.hasMany(Product);

module.exports = {
	db,
	User,
	Product,
	Category
};
