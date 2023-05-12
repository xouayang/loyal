const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const District = sequelize.define('districts',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        provinceId: {
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

module.exports = District;