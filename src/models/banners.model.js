const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const Banners = sequelize.define('banners',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    },
    {
        sequelize,
        timestamps: true,
    }
);

module.exports = Banners;