const DocumentFile = require('../models/document.file.model');


exports.create = async (req, res) => {
    const { translateDocumentId, images } = req.body
    try {
        for (let i = 0; i < images.length; i++) {
            DocumentFile.create({
                translateDocumentId: translateDocumentId,
                url: images[i]["image"]
            });
        }
        return res.status(200).json({ result: req.body });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

exports.update = (req, res) => {
    const id = req.params.id;
    const where = { id: id };
    DocumentFile.update({ ...req.body }, { where: where }).then((data) => {
        if (data[0] == 1) {
            District.findOne({
                where: where
            }).then((data) => {
                if (data) {
                    return res.status(200).json({ result: data });
                }
                return res.status(400).json({ message: 'Some thing when wrong' });
            }).catch((error) => {
                return res.status(400).json({ message: error });
            })
        } else {
            return res.status(400).json({ message: 'Some thing when wrong' });
        }
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    const where = { id: id };
    DocumentFile.update({ deleted: 1 }, { where: where }).then((data) => {
        if (data[0] == 1) {
            District.findOne({
                where: where
            }).then((data) => {
                if (data) {
                    return res.status(200).json({ result: data });
                }
                return res.status(400).json({ message: 'Some thing when wrong' });
            }).catch((error) => {
                return res.status(400).json({ message: error });
            })
        } else {
            return res.status(400).json({ message: 'Some thing when wrong' });
        }
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}

exports.findAll = (req, res) => {
    DocumentFile.findAndCountAll({ where: { deleted: 0 } }).then((data) => {
        if (data) {
            return res.status(200).json({ result: data });
        }
        return res.status(400).json({ message: 'Some thing when wrong' });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    const where = { id: id };
    DocumentFile.findOne({
        where: where
    }).then((data) => {
        if (data) {
            return res.status(200).json({ result: data });
        }
        return res.status(400).json({ message: 'Some thing when wrong' });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}
