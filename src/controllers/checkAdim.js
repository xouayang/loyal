const UserAdmin = require("../models/userAdmin.model");

// create
exports.create = async (req, res) => {
  const { MEMBER_NAME } = req.payload;
  try {
    let status = 1;
    const data = {
      ID: req.body.ID,
      Name: req.body.Name,
      Status: status,
      CBy: MEMBER_NAME,
    };
    await UserAdmin.create(data).then((result) => {
      if (result) {
        return res.status(201).json(result);
      } else {
        return res.status(400).json({ message: "Faild" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// update user status
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  try {
    await UserAdmin.update({ Status: 0 }, { where: { ID: id } }).then(
      (commpleted) => {
        if (!commpleted) {
          return res.status(404).json({ message: "NOT FOUND USER " });
        }
        return res.status(200).json({ message: "Updated Success" });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// check role user admin
exports.checkUsers = async (req, res) => {
  const { TELEPHONED } = req.payload;
  try {
    await UserAdmin.findOne({ where: { ID: TELEPHONED, Status: 1 } })
      .then((data) => {
        if(data.ID == TELEPHONED && data.Status == 1){
          return res.status(200).json({message:"Login Success"})
        } else {
          return res.status(404).json({ message: "NOT MATCH" });
        }
      })
      .catch((error) => {
        return res.status(202).json({ message: "Login Failed" });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// find all user
exports.getAll = async (req, res) => {
  try {
    await UserAdmin.findAll().then((data) => {
      if (data.length > 0) {
        return res.status(200).json(data);
      } else {
        return res.status(202).json({ message: "NOT FOUND DATA" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
