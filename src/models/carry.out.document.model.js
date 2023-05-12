const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const CarryOutDocument = sequelize.define('carry_out_documents',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        memberId: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        document: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        callOnly: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        updatedBy: {
            type: DataTypes.UUID,
            allowNull: true,
        }
    },
    {
        sequelize,
        timestamps: true,
    }
);

module.exports = CarryOutDocument;