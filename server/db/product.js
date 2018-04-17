const Sequelize = require('sequelize');
const db = require('./database');

const Product = db.define('product', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	inventory: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	image: {
		type: Sequelize.STRING,
		defaultValue: 'defaultChocolate.jpeg',
		validate: {
			isUrl: true
		}
	}
});

module.exports = Product;
