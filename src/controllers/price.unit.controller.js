const PriceUnit = require('../models/price.unit.model');


exports.create = (req, res) => {
    const { MEMBER_ID } = req.payload;
    PriceUnit.create({ ...req.body, createdBy: MEMBER_ID }).then((data) => {
        if (data) {
            return res.status(200).json({ result: data });
        }
        return res.status(400).json({ message: 'Some thing when wrong' });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}

exports.update = (req, res) => {
    const { MEMBER_ID } = req.payload;
    const id = req.params.id;
    const where = { id: id, updatedBy: MEMBER_ID };
    PriceUnit.update({ ...req.body }, { where: where }).then((data) => {
        if (data[0] == 1) {
            PriceUnit.findOne({
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
    PriceUnit.destroy({ where: where }).then((data) => {
        if (data[0] == 1) {
            PriceUnit.findOne({
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
        return res.status(400).json({ message: error.message });
    })
}

exports.findAll = (req, res) => {
    PriceUnit.findAndCountAll({ where: { deleted: 0 } }).then((data) => {
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
    PriceUnit.findOne({
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
