const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    // logging: false,
});

const Users = sequelize.define('Users', {
    name: Sequelize.DataTypes.STRING
});

module.exports = {Sequelize, sequelize, Users}