const sequelize = require("sequelize");
const { db } = require("../config/db");
// const { User } = require('./UserModel');
// const { Product } = require('./ProductModel');


exports.Sale = db.define('table_sale', {
    sale_id: {
        type: sequelize.NUMBER,
        primaryKey: true,
        allowNull: false,
       /*  references: {
            model: User,
            key: 'user_id'
        } */
    },
    sale_date: {
        type: sequelize.DATE
    },
    sale_value: {
        type: sequelize.NUMBER,
        allowNull: false
    },
    sale_user_id: {
        type: sequelize.NUMBER,
      /*   references: {
            model: User,
            key: 'user_id'
        }, */
        onDelete: 'CASCADE'
    },
    sale_product_id: {
        type: sequelize.NUMBER,
       /*  references: {
            model: Product,
            key: 'product_id'
        } */
    },
    sale_cantidad: {
        type: sequelize.NUMBER
    }

}
);


