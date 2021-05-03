const { User } = require("./UserModel");
const { Sale } = require("./SaleModel");
const { Product } = require("./ProductModel");

// Sale.belongsTo(User, {  foreignKey: 'sale_user_id' });



/* User.belongsTo(Sale, { foreignKey: 'user_id',through: "table_sale" }); */
/* Sale.hasMany(User,{foreignKey: 'user_id'}) */
/* Product.belongsTo(Sale,{foreingKey: 'sale_product_id',through: "table_sale"}) */


// Product.hasMany(Sale,{foreingKey:'sale_product_id'/* ,through: "table_sale"*/} )
// User.hasMany(Sale, { foreignKey: 'sale_user_id' });  
// Sale.hasMany(Product,{foreignKey:'product_id'})
// Sale.belongsTo(Product,{foreignKey: 'sale_user_id'})


//funcionan los belongsTo
// User.belongsTo(Sale, { foreignKey: 'user_id',through: "table_sale" });
Sale.belongsTo(User,{foreignKey: 'sale_user_id'})
// Product.belongsTo(Sale,{foreingKey: 'sale_product_id',through: "table_sale"})
User.hasMany(Sale, { foreignKey: 'sale_user_id' });




//funciona por separado
/* Sale.belongsTo(User, {  foreignKey: 'sale_user_id' });
User.hasMany(Sale, { foreignKey: 'sale_user_id' });
Sale.belongsTo(Product,{foreingKey: 'sale_product_id'})
Product.hasMany(Sale,{foreingKey:'sale_product_id'})


 */