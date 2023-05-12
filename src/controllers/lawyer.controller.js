const Lawyer = require("../models/lawyer.model");
// create Lawyer
exports.createLawyer = async (req, res) => {
    try {
        const lawyerData = {
            name: req.body.name,
            surname: req.body.surname,
            tel: req.body.tel,
            email: req.body.email,
            task: req.body.task,
            picture: req.body.picture
        }
        if (!lawyerData.name || !lawyerData.surname || !lawyerData.tel || !lawyerData.task) {
            return res.status(404).json({ message: "The body is not empty" })
        }
        await Lawyer.create(lawyerData).then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Fail" })
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
        await Lawyer.findAll().then((data) => {
            if (data.length > 0) {
                return res.status(200).json(data)
            }
            return res.status(404).json({ message: "NOT FOUND DATA" })
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
// get single data by id
exports.singleData = async (req, res) => {
    try {
        const { id } = req.params;
        const singleData = await Lawyer.findOne({ where: { id: id } });
        if (!singleData) {
            return res.status(404).json({ message: "NOT FOUND DATA" })
        }
        return res.status(200).json(singleData)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
// update data
exports.updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const lawyerData = {
            name: req.body.name,
            surname: req.body.surname,
            tel: req.body.tel,
            email: req.body.email,
            task: req.body.task,
            picture: req.body.picture
        }
        const updateData = await Lawyer.update(lawyerData, { where: { id: id } })
        if (updateData.length > 0) {
            return res.status(200).json({ message: "Updated" })
        }
        return res.status(404).json({ message: "NOT FOUND DATA" })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
// delete data
exports.deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteData = await Lawyer.destroy({ where: { id: id } })
        if (deleteData) {
            return res.status(200).json({ message: "Deleted" })
        } else {
            return res.status(404).json({ message: "NOT FOUND DATA" })
        }

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
