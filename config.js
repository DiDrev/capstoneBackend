const Sequelize = require('sequelize');
const config = new Sequelize("restdb","root","8350132",{dialect:'mariadb'});

module.exports = config;
