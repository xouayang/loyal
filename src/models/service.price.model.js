const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const ServicePrice = sequelize.define('service_prices',
    {
        consultBeginTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        consultBeginPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        translateBeginPrice: {
            type: DataTypes.INTEGER,
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

module.exports = ServicePrice;