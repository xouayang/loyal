const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const Chat = sequelize.define('chats',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        fromUserId: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        toUserId: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        timestamps: true,
    }
);

module.exports = Chat;