const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const CarryOutPrice = sequelize.define('carry_out_prices',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        callPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        facePrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
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

module.exports = CarryOutPrice;