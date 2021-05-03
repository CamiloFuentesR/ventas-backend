const { User } = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");


exports.loginUser = async (req, res = response) => {
    const { user_email, user_password } = req.body;
    try {
        let user = await User.findOne({
            where: {
                "user_email": user_email
            }
        });
        console.log(user.dataValues)
        if (!user.dataValues) {
            return res.status(401).json({
                msg: "Este usuario no existe"
            });
        }
        const validPassword = await bcrypt.compare(user_password, user.user_password);
        // console.log(validPassword)
        if (!validPassword) {
            return res.status(401).json({
                msg: " Password incorrecto"
            });
        }

        const token = await generateJWT(user.user_id, user.user_name);

        res.status(201).json({
            msg: "Has iniciado sesion",
            uid: user.user_id,
            name: user.user_name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Favor comuicarse con el administrador'
        });
    }


}

exports.createUser = async (req, res = response, next) => {

    const { user_email,user_password } = req.body;
    console.log(req.body)
    try {
        let user = await User.findOne({
            where: {
                "user_email": user_email
            }
        });
        if (user) {
            return res.status(401).json({
                msg: "este usuario ya existe"
            });
        }

        user =  User.build(req.body);
        console.log(user)

        const salt = await bcrypt.genSalt(10);
        user.dataValues.user_password = await bcrypt.hash(user_password,salt)

        const userSave = await user.save();
        res.status(201).json({
            ok: true,
            msg: 'Usuario creado con exito',
            user: userSave
        })
    } catch (error) {
        console.log(error);
    }
}

exports.renewToken = async(req, res = response) => {

    const {uid,name} = req;
    //generar un nuevo token despues de revalidar el token anterior
    const token = await generateJWT(uid,name);
    res.status(201).json({
        ok: true,
        token,
        uid,
        name
    })
};

