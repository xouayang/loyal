const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const Document_type = sequelize.define('documents_types',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        document_type: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
    }
);

module.exports = Document_type;