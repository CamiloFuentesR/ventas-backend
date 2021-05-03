const sequelize = require("sequelize");
const { db } = require("../config/db");
const { User } = require('./UserModel');
const { Sale } = require('./SaleModel');
const { Category } = require('./CategoryModel');


exports.Product = db.define('tabla_producto', {
    product_id: {
        type: sequelize.NUMBER,
        primaryKey: true,
        allowNull: false,
      /*   references: {
            model: Sale,
            key: 'sale_product_id'
        } */
    },
    product_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    product_value: {
        type: sequelize.NUMBER,
        allowNull: false
    },

    product_stock: {
        type: sequelize.NUMBER,
        allowNull: false
    },
    product_category_id: {
        type: sequelize.NUMBER,
       /*  references: {
            model:Category,
            key: 'category_id'
        } */
    }

}
);


