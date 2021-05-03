const sequelize = require("sequelize");
const { db } = require("../config/db");
// const { Product } = require("./ProductModel");


exports.Category = db.define('table_category', {
    category_id: {
        type: sequelize.NUMBER,
        primaryKey: true,
        allowNull: false,
   /*      references: {
            model: Product,
            key: 'product_category_id'
        }*/
    }, 
    category_name: {
        type: sequelize.STRING,
        allowNull: false
    },

}
);


