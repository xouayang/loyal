const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const TranslatePrice = sequelize.define('translate_prices',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        fromLanguageId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        toLanguageId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        documentTypeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        priceUnitId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        blocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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

module.exports = TranslatePrice;