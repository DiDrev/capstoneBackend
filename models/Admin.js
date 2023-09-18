const Sequelize = require('sequelize');
const config = require('./../config');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const Admin = config.define('admin',{
	id:{
		type: Sequelize.INTEGER,
		autoIncrement: true,
		uniqueKey: true,
		allowNull: false		
	},
	email:{
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false
	},
	password:{
		type: Sequelize.STRING,
		allowNull: false
	},
	firstName:{
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName:{
		type: Sequelize.STRING,
		allowNull: false
	}
	
}, {timestamps: false});

module.exports = Admin;