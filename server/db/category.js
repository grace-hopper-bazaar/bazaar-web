const Sequelize = require('sequelize');
const db = require('./database');

const Category = db.define('category', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
});

module.exports = Category;
