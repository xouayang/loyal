const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.create = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    User.create({ ...req.body, password: password }).then((data) => {
        return res.status(201).json({ result: data });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (username == null || password == null) {
        return res.status(403).json({ message: "Username and password can not be null" });
    }
    const where = { username: username, blocked: 0 };
    User.findOne({ where: where }).then(async (data) => {
        if (data) {
            const validPassword = await bcrypt.compare(password, data.password);
            if (!validPassword) {
                return res.status(403).json({ message: "Username or password is incorrect" });
            }
            const _payload = {
                id: data.id,
                employeeId: data.employeeId,
                username: data.username,
                lastLogin: data.lastLogin,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            }
            const token = jwt.sign(_payload, process.env.SECRET_KEY, { expiresIn: '180d' });
            User.update({ lastLogin: new Date() }, { where: { id: data.id } })
            return res.status(200).json({ message: "Success", token: token });
        }
        return res.status(400).json({ message: 'Some thing when wrong' });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}

exports.update = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const id = req.params.id;
    const where = { id: id };
    User.update({ ...req.body, password: password }, { where: where }).then((data) => {
        if (data[0] == 1) {
            User.findOne({
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

exports.block = async (req, res) => {
    const id = req.params.id;
    const where = { id: id };
    User.update({ blocked: 1 }, { where: where }).then((data) => {
        if (data[0] == 1) {
            User.findOne({
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

exports.delete = async (req, res) => {
    const id = req.params.id;
    const where = { id: id };
    User.update({ deleted: 1 }, { where: where }).then((data) => {
        if (data[0] == 1) {
            User.findOne({
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
    User.findAndCountAll({ where: { deleted: 0 } }).then((data) => {
        return res.status(200).json({ result: data });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    const where = { id: id };
    User.findOne({ where: where }).then((data) => {
        if (data) {
            return res.status(200).json({ result: data });
        }
        return res.status(400).json({ message: 'Some thing when wrong' });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}