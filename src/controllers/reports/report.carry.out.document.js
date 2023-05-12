const sequelize = require("../../configs/db");
const moment = require('moment')
exports.findAll = async (req, res) => {
    const skip = req.query.skip ?? 0;
    const limit = req.query.limit ?? 20;
    const searchDate = req.query.searchDate;
    const formateDate = moment(searchDate).format("DD-MM-YY") 
    console.log(formateDate)
    try {
        const count = await sequelize.query(`SELECT COUNT(id) AS count FROM carry_out_documents`,
            { type: sequelize.QueryTypes.SELECT });
        const datas = await sequelize.query(`SELECT [id]
        ,[memberId]
        ,[name]
        ,[surname]
        ,[telephone]
        ,[document]
        ,[amount]
        ,[callOnly]
        ,[date]
        ,[time]
        ,[status]
        ,[updatedBy]
        ,LEFT([createdAt],19) AS createdAt
        ,LEFT([updatedAt],19) AS updatedAt
        FROM [DB_LOYAL_DEV].[dbo].[carry_out_documents] 
        ORDER BY createdAt DESC OFFSET ${skip} 
        ROWS FETCH NEXT ${limit} ROWS ONLY`,
            { type: sequelize.QueryTypes.SELECT });
        return res.status(200).json({ result: { count: count[0]['count'], rows: datas } });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}