const { type } = require('express/lib/response');
const sequelize = require('../configs/db');
const CompanyInfo = require('../models/company.info.model');


exports.create = (req, res) => {
    const { MEMBER_ID } = req.payload;
    const logo = req.files["file"][0].path;
    const policy = req.files["policy"][0].path;
    console.log(logo)
    console.log(policy)
    CompanyInfo.findAll().then((data) => {
        if (data.length == 0) {
            CompanyInfo.create({ ...req.body, logo: logo, policy: policy, createdBy: MEMBER_ID }).then((data) => {
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
    CompanyInfo.update({ ...req.body, updatedBy: MEMBER_ID }, { where: { id: id } }).then((data) => {
        if (data[0] == 1) {
            console.log(data)
            CompanyInfo.findAll().then((data) => {
                if (data) {
                    return res.status(200).json({ result: data[0] });
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


exports.updateLogo = (req, res) => {
    const { MEMBER_ID } = req.payload;
    const id = req.params.id;
    const file = req.file;
    CompanyInfo.update({ logo: 'uploads/logos/' + file.filename, updatedBy: MEMBER_ID }, { where: { id: id } }).then((data) => {
        if (data[0] == 1) {
            CompanyInfo.findAll().then((data) => {
                if (data) {
                    return res.status(200).json({ result: data[0] });
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

exports.updatePolicy = (req, res) => {
    const { MEMBER_ID } = req.payload;
    const id = req.params.id;
    const policy = req.file;
    CompanyInfo.update({ policy: 'uploads/logos/' + policy.filename, updatedBy: MEMBER_ID }, { where: { id: id } }).then((data) => {
        if (data[0] == 1) {
            CompanyInfo.findAll().then((data) => {
                if (data) {
                    return res.status(200).json({ result: data[0] });
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
    const where = { id: id }
    CompanyInfo.destroy({ where: where }).then((data) => {
        return res.status(200).json({ result: data });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}

exports.findAll = (req, res) => {
    CompanyInfo.findAll().then((data) => {
        if (data) {
            return res.status(200).json({ result: data[0] });
        }
        return res.status(400).json({ message: 'Some thing when wrong' });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}
