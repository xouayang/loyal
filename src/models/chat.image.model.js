const DataTypes = require('sequelize');
const sequelize = require('../configs/db');

const ChatImage = sequelize.define('chat_images',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        chatId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
    }
);

module.exports = ChatImage;