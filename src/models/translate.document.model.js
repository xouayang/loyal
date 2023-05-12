const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const TranslateDocument = sequelize.define('translate_documents',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        documentTypeId: {
            type: DataTypes.UUID,
            allowNull: false,
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
        fromLanguageId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        toLanguageId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
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

module.exports = TranslateDocument;