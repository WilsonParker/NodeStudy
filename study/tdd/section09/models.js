const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    // logging: false, // DB query 등 logging 여부
});

/*
 * primary key 로 id,
 * createdAt, updatedAt (timestamp) 가 자동으로 생성 됩니다
 */
const Users = sequelize.define('Users' /* table name */, {
    name: {
        type: Sequelize.DataTypes.STRING
    }
});

module.exports = {Sequelize, sequelize, Users}