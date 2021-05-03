const sequelize = require('sequelize');
const { db } = require('../config/db');
// const { Sale } = require('./SaleModel');

exports.User = db.define('table_user', {
    user_id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
       /*  references: {
            model: Sale,
            key: 'sales_user_id'
        } */
    },
    user_name: {
        type: sequelize.STRING,
    },
    user_last_name: {
        type: sequelize.STRING
    },
    user_email: {
        type: sequelize.STRING
    },
    user_phone: {
        type: sequelize.STRING
    },
    user_password: {
        type: sequelize.STRING
    }

});

