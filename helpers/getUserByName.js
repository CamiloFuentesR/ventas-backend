const { Sale } = require("../models/SaleModel");
const { User } = require("../models/UserModel");

 exports.getUserByName = async  (name) => {
    return  await User.findOne({
        attributes: ['user_name', 'user_email'],
        where: { 'user_name': name },
        include: [{
            model: Sale
            // where: { "sale_user_id": userName.toString() },
        }],
    });
}