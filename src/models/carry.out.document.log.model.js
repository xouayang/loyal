const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const CarryOutDocumentLog = sequelize.define('carry_out_document_logs',
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
        memberId: {
            type: DataTypes.STRING(50),
            allowNull: false,
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
        }
    },
    {
        sequelize,
        timestamps: true,
    }
);

module.exports = CarryOutDocumentLog;