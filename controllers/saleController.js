const { response } = require("express");
const { db } = require("../config/db");
const { Sale } = require("../models/SaleModel");
const { User } = require("../models/UserModel");
const { QueryTypes } = require('sequelize');


module.exports = {

    async getSales(req, res = response, next) {

        const sales = await Sale.findAll();
        try {
            if (sales) {
                return res.status(201).json({
                    ok: true,
                    sales
                })
            }
            console.log(sales)
            res.status(401).json({
                ok: false,
                msg: 'No hay ventas disponibles'
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Favor comunicarse con el administrador de servicios'
            })
        }
    },

    async getSalesById(req, res = response) {

        const userName = req.params.id;
        const searchName = await Sale.findAll({
            include: [{
                model: User,
                where: { "user_name": userName.toString() },
                attributes: [`user_name`]
            }],
        });
        try {
            if (searchName) {
                return res.status(201).json({
                    ok: true,
                    searchName
                });
            }
            res.status(401).json({
                ok: false,
                msg: 'Venta no disponible o no existente'
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Favor comunicarse con el administrador'
            })
        }
    },

    async createSales(req, res = response, next) {
        const { sale_user_id } = req.body;
        const saleQuery = await db.query(`(SELECT table_sale.sale_id, table_user.user_name, table_sale.sale_user_id,table_sale.sale_product_id, tabla_producto.product_name,table_sale.sale_value FROM table_user INNER JOIN table_sale INNER JOIN tabla_producto WHERE table_user.user_id = table_sale.sale_user_id AND table_sale.sale_product_id = tabla_producto.product_id AND table_sale.sale_user_id = '${sale_user_id}')`, { type: QueryTypes.SELECT })
        const a = saleQuery.map(e => e)
        const isProduct = a.some(e => e.sale_product_id === req.body.sale_product_id);
        const isUser = a.some(e => e.sale_user_id === req.body.sale_user_id);
        const isSale = a.some(e => e.sale_id === req.body.sale_id)
        console.log(isUser)

        //no eiste un usuario con esta id
        if (!isUser) {
            return res.status(401).json({
                msg: "No existe un usuario con esta identificación"
            })
        }
        //si eiste la ide de venta
        if (isSale) {
            return res.status(401).json({
                msg: "Esta venta ya se realizó"
            })
        }
        //si no existe el id del producto
        if (!isProduct) {
            return res.status(401).json({
                msg: "no se encuentra el producto"
            })
        }
        /*  const s = await User.findAll({
             where:{
                 "user_id":req.body.sale_user_id,
             },
             include:[{
                 model:{Sale,Product}
                 
             }]
         }) */
        const sale = Sale.build(req.body);
        const userSave = await sale.save();
        res.status(201).json({
            msg: "usuario encontrado",
            userSave
        })
    }
}
