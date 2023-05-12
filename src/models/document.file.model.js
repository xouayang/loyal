const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const DocumentFile = sequelize.define('document_files',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        translateDocumentId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
    }
);

module.exports = DocumentFile;