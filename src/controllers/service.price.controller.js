const { type } = require('express/lib/response');
const sequelize = require('../configs/db');
const ServicePrice = require('../models/service.price.model');


exports.create = (req, res) => {
    const { MEMBER_ID } = req.payload;
    ServicePrice.findAll().then((data) => {
        if (data.length == 0) {
            ServicePrice.create({ ...req.body, createdBy: MEMBER_ID }).then((data) => {
                if (data) {
                    return res.status(200).json({ result: data });
                }
                return res.status(400).json({ message: 'Some thing when wrong' });
            }).catch((error) => {
                return res.status(400).json({ message: error });
            });
        } else {
            return res.status(200).json({ result: data[0] });
        }
    }).catch((error) => {
        return res.status(400).json({ message: error });
    });
}

exports.update = (req, res) => {
    const { MEMBER_ID } = req.payload;
    const id = req.params.id;
    const where = { id: id };
    ServicePrice.update({ ...req.body, updatedBy: MEMBER_ID }, { where: where }).then((data) => {
        if (data[0] == 1) {
            ServicePrice.findOne({
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
    ServicePrice.delete({ where: where }).then((data) => {
        return res.status(200).json({ result: data });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}

exports.findAll = (req, res) => {
    ServicePrice.findAll().then((data) => {
        if (data) {
            return res.status(200).json({ result: data[0] });
        }
        return res.status(400).json({ message: 'Some thing when wrong' });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}
