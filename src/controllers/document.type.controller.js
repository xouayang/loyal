const Document_type = require('../models/document.type.model')

// create 
exports.create = async (req, res) => {
    try {
        await Document_type.create({ ...req.body }).then((data) => {
            if (data == null) {
                return res.status(404).json({ message: "Fails" })
            }
            return res.status(201).json(data)
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
// get all data
exports.getAll = async (req, res) => {
    try {
        await Document_type.findAll().then((data) => {
            if (data) {
                return res.status(200).json(data)
            }
            return res.status(404).json({ message: "NOT FOUND DATA" })
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
// get single data
exports.singleData = async (req, res) => {
    try {
        const { id } = req.params;
        const singleData = await Document_type.findOne({ where: { id: id } })
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
        const updateData = await Document_type.update({ ...req.body }, { where: { id: id } })
        if (updateData) {
            return res.status(404).json({ message: "Updated" })
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
        const deleteData = await Document_type.destroy({ where: { id: id } });
        if (deleteData) {
            return res.status(200).json({ message: "Deleted" })
        } else {
            return res.status(200).json({ message: "NOT FOUND DATA" })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}