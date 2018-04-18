const db = require('./database');
const User = require('./user');
const Product = require('./product');
const Category = require('./category');

// associations go here!
Product.belongsToMany(Category, { through: 'productCategories' });
Category.belongsToMany(Product, { through: 'productCategories' });

module.exports = {
	db,
	User,
	Product,
	Category
};
