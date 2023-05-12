const sequelize = require('../configs/db');
const TranslateDocumentLog = require('../models/translate.document.log.model');

exports.create = (req, res) => {
    const { MEMBER_ID } = req.payload;
    TranslateDocumentLog.create({ ...req.body, memberId: MEMBER_ID }).then((data) => {
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
    TranslateDocumentLog.update({ ...req.body }, { where: where }).then((data) => {
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
        const count = await sequelize.query(`SELECT COUNT(id) AS count FROM translate_document_logs`,
            { type: sequelize.QueryTypes.SELECT });
        const datas = await sequelize.query(`SELECT td.[id]
        ,td.[documentTypeId]
        ,dt.[document_type]
        ,td.[memberId]
        ,td.[name]
        ,td.[surname]
        ,td.[telephone]
        ,td.[fromLanguageId]
        ,fl.[language] as fromLanguage
        ,td.[toLanguageId]
        ,tl.[language] as toLanguage
        ,td.[amount]
        ,td.[description]
        ,td.[status]
        ,LEFT(td.[createdAt],19) AS createdAt
        ,LEFT(td.[updatedAt],19) AS updatedAt
    FROM [translate_document_logs] td
    INNER JOIN [languages] fl ON td.[fromLanguageId] = fl.[id]
    INNER JOIN [languages] tl ON td.[toLanguageId] = tl.[id]
    INNER JOIN [documents_types] dt ON td.[documentTypeId]=dt.[id]
        ORDER BY td.createdAt DESC OFFSET ${skip} 
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
        const datas = await sequelize.query(`SELECT td.[id]
        ,td.[documentTypeId]
        ,dt.[document_type]
        ,td.[memberId]
        ,td.[name]
        ,td.[surname]
        ,td.[telephone]
        ,td.[fromLanguageId]
        ,fl.[language] as fromLanguage
        ,td.[toLanguageId]
        ,tl.[language] as toLanguage
        ,td.[amount]
        ,td.[description]
        ,td.[status]
        ,LEFT(td.[createdAt],19) AS createdAt
        ,LEFT(td.[updatedAt],19) AS updatedAt
    FROM [translate_document_logs] td
    INNER JOIN [languages] fl ON td.[fromLanguageId] = fl.[id]
    INNER JOIN [languages] tl ON td.[toLanguageId] = tl.[id]
    INNER JOIN [documents_types] dt ON td.[documentTypeId]=dt.[id]
    WHERE id='${id}'`,
            { type: sequelize.QueryTypes.SELECT });
        return res.status(200).json({ result: datas[0] });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}