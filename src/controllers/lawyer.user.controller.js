const LawyerUser = require("../models/lawyer.user.model");
// create Lawyer User
exports.createLawyerUser = async (req, res) => {
    try {
        await LawyerUser.create({ ...req.body }).then((data) => {
            if (!data) {
                return res.status(400).json({ message: "Fail" })
            }
            return res.status(201).json(data)
        })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
// get all data
exports.getAll = async (req, res) => {
    try {
        await LawyerUser.findAll().then((data) => {
            if (data.length > 0) {
                return res.status(200).json(data)
            }
            return res.status(400).json({ message: "NOT FOUND DATA" })
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
// get data by id
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const singleData = await LawyerUser.findOne({ where: { memberId: id } });
        if (!singleData) {
            return res.status(400).json({ message: "NOT FOUND DATA" })
        }
        return res.status(200).json(singleData)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}