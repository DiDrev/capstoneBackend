const Sequelize = require('sequelize');
const config = require('./../config');

const Soup = config.define('soup',{
	id:{
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false		
	},
	name:{
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false		
	},
	description:{
		type: Sequelize.STRING,
		allowNull: false
	},
	dairy:{
		type: Sequelize.ENUM,
		values: ['Y', 'N'],
		allowNull: true
	},
	type: {
		type: Sequelize.ENUM,
		values: ['vegan', 'vegetarian'],
		allowNull: true
	},
	calories:{
		type: Sequelize.INTEGER,
		allowNull: true
	},
	allergens:{
		type: Sequelize.STRING,
		allowNull: true
	}

}, {timestamps: false});

module.exports = Soup;