const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const User = sequelize.define('users',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        employeeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        blocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        timestamps: true,
    }
);


module.exports = User;