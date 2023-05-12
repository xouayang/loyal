const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const Province = sequelize.define('provinces',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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

module.exports = Province;