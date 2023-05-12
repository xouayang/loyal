const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const UserAdmin = sequelize.define('usersAdmin',
    {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Status: {
            type: DataTypes.INTEGER(2),
            allowNull: true,
        },
        CBy:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize,
        timestamps: true,
    }
);


module.exports = UserAdmin;