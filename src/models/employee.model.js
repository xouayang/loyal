const { type } = require('express/lib/response');
const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const Employee = sequelize.define('employees',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true,
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        village: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        districtId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdBy: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    },
    {
        sequelize,
        timestamps: true,
    }
);


module.exports = Employee;