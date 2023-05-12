const Chat = require('../models/chat.model');
const sequelize = require('../configs/db');

exports.create = (req, res) => {
    const { MEMBER_ID } = req.payload;
    const { id } = req.params;
    Chat.create({ ...req.body, fromUserId: MEMBER_ID, toUserId: id }).then((data) => {
        if (data) {
            return res.status(200).json({ result: data });
        }
        return res.status(400).json({ message: 'Some thing when wrong' });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}


exports.findAll = (req, res) => {
    Chat.findAndCountAll().then((data) => {
        if (data) {
            return res.status(200).json({ result: data });
        }
        return res.status(400).json({ message: 'Some thing when wrong' });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}

exports.findOne = (req, res) => {
    const { MEMBER_ID } = req.payload;
    const { id } = req.params;
    const skip = req.query.skip ?? 0;
    const limit = req.query.limit ?? 20;

    sequelize.query(`SELECT [id] ,[fromUserId] ,[toUserId] ,[message]
        ,[status] ,[deleted] ,[createdAt] ,[updatedAt]
        FROM [chats] WHERE (fromUserId='${MEMBER_ID}' AND toUserId='${id}') 
        OR (fromUserId='${id}' AND toUserId='${MEMBER_ID}') 
        ORDER BY createdAt DESC OFFSET ${skip} 
        ROWS FETCH NEXT ${limit} ROWS ONLY`,
        { type: sequelize.QueryTypes.SELECT }).then(async (data) => {
            let datas = [];
            for (let i = 0; i < data.length; i++) {
                const images = await sequelize.query(`SELECT imageUrl
                FROM chat_images WHERE chatId = '${data[i].id}'`,
                    { type: sequelize.QueryTypes.SELECT });
                data[i] = { ...data[i], images }
                datas = [...datas, data[i]];
            }
            return res.status(200).json({ result: data });
        }
        ).catch((error) => {
            return res.status(400).json({ result: error });
        });

}