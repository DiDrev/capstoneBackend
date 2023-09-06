const Sequelize = require('sequelize');
const config = require('./../config');

const MenuItem = config.define('menuItem',{
	id:{
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false		
	},
	name:{
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true
	},
	price:{
		type: Sequelize.STRING,
		allowNull: true
	},
	description:{
		type: Sequelize.STRING,
		allowNull: true
	},
	type:{
		type: Sequelize.ENUM,
		values: ['hot', 'cold', 'frozen'],
		allowNull: true
	},
	category:{
		type: Sequelize.ENUM,
		values: ['drink','sandwich','panini','soup','baked_item','breakfast'],
		allowNull: true
	},
	calories:{
		type: Sequelize.INTEGER,
		allowNull: true
	},
	allergens:{
		type: Sequelize.ENUM,
		values: ['Y', 'N'],
		allowNull: true
	}
}, {timestamps: false});

module.exports = MenuItem;