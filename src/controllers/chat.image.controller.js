const ChatImage = require('../models/chat.image.model');

exports.create = (req, res) => {
    const { chatId, images } = req.body
    try {
        for (let i = 0; i < images.length; i++) {
            ChatImage.create({
                chatId: chatId,
                imageUrl: images[i]["image"]
            });
        }
        return res.status(200).json({ result: req.body });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

