const { response } = require("express");
const { User } = require("../models/UserModel");
const { getUserByName } = require('../helpers/getUserByName');
const { Sale } = require("../models/SaleModel");

exports.getSUser = async (req, res = response, next) => {

    const user = await User.findAll();
    try {
        res.status(201).json({
            ok: true,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Contactarse con el proovedor de servicios',
        })
    }
}

exports.updateUser = async (req, res = response, next) => {
    // evento desde la url
    const userId = req.params.id;
    const uid = req.uid;
    try {
        const user = await User.findByPk(userId);
        console.log(req)

        if (!user) {
            res.status(401).json({
                ok: false,
                msg: 'No se ha podido actualizar este usuario',
            })
        }
        const newUser = {
            ...req.body,
            user_id: uid
        }
        console.log(uid)

        const userUpdated = await User.update(newUser, {
            where: {
                "user_id": userId
            }
        });
        console.log(userUpdated)
        res.status(201).json({
            ok: true,
            msg: 'Usuario actualizado con éxito',
            userUpdated
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Favor de contactarse con el administrador de servicios',
        })
    }
}

exports.deleteUser = async (req, res = response, next) => {

    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        const deleteSale = await Sale.findAll({
            where:{
                'sale_user_id':req.params.id
            },
        })
        if(!user){
            return res.status(401).json({
                msg: 'No se ha podido eliminar el usuario'
            });
        }
        //primero elimina la venta referenciada
        await Sale.destroy({
            where:{
                'sale_user_id': req.params.id
            }
        });
        //cuando se elimna las ventas de esa id se elimina el usuario
        await User.destroy({
            where:{
                'user_id':userId,
            }
        })
        res.status(201).json({
            msg: 'Usuario eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        })
    }
}


exports.getUserById = async (req, res = response, next) => {

    const userName = req.params.id;
    const name = await getUserByName(userName);

    //ejemplo de búsqueda
    // name.dataValues.table_sales.map(({ dataValues }) => console.log(dataValues.sale_id))
    try {
        if (name) {
            return res.status(201).json({
                ok: true,
                name
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
        });
    }
}