const sequelize = require("../../configs/db");
const moment = require("moment");

// carry out document
exports.findAll = async (req, res) => {
  const { dateMonth } = req.query;
  const date = moment(dateMonth).format("YYYYMM");
  try {
    const datas = await sequelize.query(
      `SELECT [callOnly],case when [callOnly]='0' then 'Meeting' else 'Phone Call' end meeting_type, count(*) as [Count]
    ,sum([amount]) as SumAmount ,convert(varchar(8),[createdAt],112) as [Cdate]
   FROM [DB_LOYAL_DEV].[dbo].[carry_out_documents] where convert(varchar(6),[createdAt],112)=${date}
   group by [callOnly],case when [callOnly]='0' then 'Meeting' else 'Phone Call' end ,convert(varchar(8),[createdAt],112)
   order by 5 desc
   `,
      { type: sequelize.QueryTypes.SELECT }
    );
    if (datas.length > 0) {
      return res.status(200).json({ result: { rows: datas } });
    } else {
      return res.status(404).json({ message: "NOT FOUND DATA" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// translate document
exports.findTranslateAll = async (req, res) => {
  const { dateMonth } = req.query;
  const date = moment(dateMonth).format("YYYYMM");
  try {
    const datas = await sequelize.query(
      `SELECT status, case when status='0' then 'Customer request' 
         when status='1' then 'Staff Offer price' when status='2' then 'Customer payment' when status='3' then 'Customer cancle' 
         when status='4' then 'Completed' end meeting_type , count(*) as [Count],sum([amount]) as Sumamount,convert(varchar(8),[createdAt],112) as [Date]
        FROM [DB_LOYAL_DEV].[dbo].[translate_documents] where convert(varchar(6),[createdAt],112)=${date}
        group by status,convert(varchar(8),[createdAt],112) order  by 5 desc `,
      { type: sequelize.QueryTypes.SELECT }
    );
    if (datas.length > 0) {
      return res.status(200).json({ result: { rows: datas } });
    } else {
      return res.status(404).json({ message: "NOT FOUND DATA" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
// consult lawyers
exports.findConsult_lawyers = async (req, res) => {
  const { dateMonth } = req.query;
  const date = moment(dateMonth).format("YYYYMM");
  try {
    const datas = await sequelize.query(
      ` SELECT [callOnly],case when [callOnly]='0' then 'Meeting' else 'Phone Call' end as meeting_type,count(*) as [Count],sum(amount) as SumAmount,convert(varchar(8),createdAt,112) as [Date]
        FROM [DB_LOYAL_DEV].[dbo].[consult_lawyers] where convert(varchar(6),createdAt,112)=${date}
        group by [callOnly],case when [callOnly]='0' then 'Meeting' else 'Phone Call' end,convert(varchar(8),createdAt,112)
        order  by 5 desc`,
      { type: sequelize.QueryTypes.SELECT }
    );
    if (datas.length > 0) {
      return res.status(200).json({ result: { rows: datas } });
    } else {
      return res.status(404).json({ message: "NOT FOUND DATA" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
