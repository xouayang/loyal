const Employee = require('../models/employee.model');
const sequelize = require('../configs/db');


exports.create = (req, res) => {
    Employee.create({ ...req.body }).then((data) => {
        if (data) {
            return res.status(200).json({ result: data });
        }
        return res.status(400).json({ message: 'Some thing when wrong' });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    const where = { id: id };
    Employee.update({ ...req.body }, { where: where }).then((data) => {
        if (data[0] == 1) {
            Employee.findOne({
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
    Employee.update({ deleted: 1 }, { where: where }).then((data) => {
        if (data[0] == 1) {
            Employee.findOne({
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

exports.findAll = async (req, res) => {
    try {
        const total = await sequelize.query(
            `SELECT COUNT(id) as total FROM employees WHERE deleted = 0`,
            { type: sequelize.QueryTypes.SELECT }
        );
        const data = await sequelize.query(
            `SELECT ep.id, ep.name, ep.surname, ep.gender, ep.telephone,
            ep.email, ep.image, ep.dateOfBirth, ep.village, dt.district, pv.province,
            ep.deleted, ep.createdBy, ep.updatedBy, ep.createdAt, ep.updatedAt
            FROM employees ep INNER JOIN districts dt ON ep.districtId = dt.id
            INNER JOIN provinces pv ON dt.provinceId = pv.id
            WHERE ep.deleted = 0`,
            { type: sequelize.QueryTypes.SELECT }
        );
        return res.status(200).json({ result: { count: total[0].total, rows: data } });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    const where = { id: id };
    Employee.findOne({
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

exports.findByProvince = (req, res) => {
    const id = req.params.id;
    const where = { provinceId: id };
    Employee.findAndCountAll({
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