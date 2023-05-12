const sequelize = require('../configs/db');
const ConsultLawyerLog = require('../models/consult.lawyer.log.model');

exports.create = (req, res) => {
    const { MEMBER_ID } = req.payload;
    ConsultLawyerLog.create({ ...req.body, memberId: MEMBER_ID }).then((data) => {
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
    ConsultLawyerLog.update({ ...req.body }, { where: where }).then((data) => {
        if (data[0] == 1) {
            Province.findOne({
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
    const skip = req.query.skip ?? 0;
    const limit = req.query.limit ?? 20;
    try {
        const count = await sequelize.query(`SELECT COUNT(id) AS count FROM consult_lawyer_logs`,
            { type: sequelize.QueryTypes.SELECT });
        const datas = await sequelize.query(`SELECT [id]
        ,[memberId]
        ,[name]
        ,[surname]
        ,[telephone]
        ,[problem]
        ,[amount]
        ,[callOnly]
        ,[lawyerId]
        ,[date]
        ,[time]
        ,[status]
        ,[updatedBy]
        ,LEFT([createdAt],19) AS createdAt
        ,LEFT([updatedAt],19) AS updatedAt
        FROM [DB_LOYAL_DEV].[dbo].[consult_lawyer_logs]
        ORDER BY createdAt DESC OFFSET ${skip} 
        ROWS FETCH NEXT ${limit} ROWS ONLY`,
            { type: sequelize.QueryTypes.SELECT });
        return res.status(200).json({ result: { count: count[0]['count'], rows: datas } });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const datas = await sequelize.query(`SELECT [id]
        ,[memberId]
        ,[name]
        ,[surname]
        ,[telephone]
        ,[problem]
        ,[amount]
        ,[callOnly]
        ,[lawyerId]
        ,[date]
        ,[time]
        ,[status]
        ,[updatedBy]
        ,LEFT([createdAt],19) AS createdAt
        ,LEFT([updatedAt],19) AS updatedAt
        FROM [DB_LOYAL_DEV].[dbo].[consult_lawyer_logs]
        WHERE id='${id}'`,
            { type: sequelize.QueryTypes.SELECT });
        return res.status(200).json({ result: datas[0] });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}