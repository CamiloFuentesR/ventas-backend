const sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: 'variables.env' });

exports.db = new sequelize(
    process.env.BD_NAME,
    process.env.BD_USER,
    process.env.BD_PASS,
    {
        host: process.env.BD_HOST,
        port: process.env.BD_PORT,
        dialect: 'mysql',
        define: {
            timestamps: false,
            freezeTableName: true, //no le agrega la "s" a las tablas
            underscored: true

        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        opertorAliases: false
    }
)