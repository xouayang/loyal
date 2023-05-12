const Problem = require('../models/problem.model');


exports.create = (req, res) => {
    const { MEMBER_ID } = req.payload;
    Problem.create({ ...req.body, createdBy: MEMBER_ID }).then((data) => {
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
    const where = { id: id };
    Problem.update({ ...req.body, updatedBy: MEMBER_ID }, { where: where }).then((data) => {
        if (data[0] == 1) {
            Problem.findOne({
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
    const { MEMBER_ID } = req.payload;
    const id = req.params.id;
    const where = { id: id };
    Problem.update({ deleted: 1, updatedBy: MEMBER_ID }, { where: where }).then((data) => {
        if (data[0] == 1) {
            Problem.findOne({
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
    Problem.findAndCountAll({ where: { deleted: 0 } }).then((data) => {
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
    Problem.findOne({
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
