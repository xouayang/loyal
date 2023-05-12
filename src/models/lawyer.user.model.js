const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const Lawyer = sequelize.define('lawyer_users',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        memberId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
    }
);

module.exports = Lawyer;