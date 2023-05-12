const sequelize = require('../configs/db');
const TranslateDocument = require('../models/translate.document.model');
const notification = require('../middlewares/function')
// const admin = require('firebase-admin');
// const fcm = require('fcm-notification');


// const serviceAccount = require('../firebase/service.account.json');

// const certPath = admin.credential.cert(serviceAccount);
// var FCM = new fcm(certPath);


exports.create = (req, res) => {
    const { MEMBER_ID } = req.payload;
    TranslateDocument.create({ ...req.body, memberId: MEMBER_ID }).then((data) => {
        if (data) {
            return res.status(200).json({ result: data });
        }
        return res.status(400).json({ message: 'Some thing when wrong' });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
}

exports.update = (req, res) => {
    const { MEMBER_ID } = req.payload;
    const id = req.params.id;
    const where = { id: id };
    TranslateDocument.update({ ...req.body, updatedBy: MEMBER_ID }, { where: where }).then((data) => {
        if (data[0] == 1) {
            TranslateDocument.findOne({
                where: where
            }).then(async (data) => {
                if (data) {
                    if (req.body.status == 1 && req.body.amount) {
                        notification.sendNotification(
                            data.memberId,
                            'ແຈ້ງລາຄາ',
                            `ລາຄາແປເອກະສານຂອງທ່ານແມ່ນ ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(req.body.amount)} ${req.body.priceUnit ?? 'ກີບ'}`,
                            'carry_out'
                        );
                    }
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
        const count = await sequelize.query(`SELECT COUNT(id) AS count FROM translate_documents`,
            { type: sequelize.QueryTypes.SELECT });
        const rows = await sequelize.query(`SELECT td.[id]
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
        ,td.[comment]
        ,td.[status]
        ,td.[updatedBy]
        ,LEFT(td.[createdAt],19) AS createdAt
        ,LEFT(td.[updatedAt],19) AS updatedAt
        FROM [translate_documents] td
        INNER JOIN [languages] fl ON td.[fromLanguageId] = fl.[id]
        INNER JOIN [languages] tl ON td.[toLanguageId] = tl.[id]
        INNER JOIN [documents_types] dt ON td.[documentTypeId]=dt.[id]
        ORDER BY td.createdAt DESC OFFSET ${skip} 
        ROWS FETCH NEXT ${limit} ROWS ONLY`,
            { type: sequelize.QueryTypes.SELECT });

        let datas = [];
        for (let i = 0; i < rows.length; i++) {
            const images = await sequelize.query(`SELECT url
                FROM document_files WHERE translateDocumentId = '${rows[i].id}'`,
                { type: sequelize.QueryTypes.SELECT });
            rows[i] = { ...rows[i], images }
            datas = [...datas, rows[i]];
        }
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
        ,td.[comment]
        ,td.[status]
        ,td.[updatedBy]
        ,LEFT(td.[createdAt],19) AS createdAt
        ,LEFT(td.[updatedAt],19) AS updatedAt
        FROM [translate_documents] td
        INNER JOIN [languages] fl ON td.[fromLanguageId] = fl.[id]
        INNER JOIN [languages] tl ON td.[toLanguageId] = tl.[id]
        INNER JOIN [documents_types] dt ON td.[documentTypeId]=dt.[id]
                    WHERE td.id='${id}'`,
            { type: sequelize.QueryTypes.SELECT });
        return res.status(200).json({ result: datas[0] });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

exports.findAllByStatus = async (req, res) => {
    const { status } = req.query;
    const skip = req.query.skip ?? 0;
    const limit = req.query.limit ?? 20;
    try {
        const count = await sequelize.query(`SELECT COUNT(id) AS count FROM translate_documents
                    WHERE status='${status}'`,
            { type: sequelize.QueryTypes.SELECT });
        const rows = await sequelize.query(`SELECT td.[id]
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
        ,td.[comment]
        ,td.[status]
        ,td.[updatedBy]
        ,LEFT(td.[createdAt],19) AS createdAt
        ,LEFT(td.[updatedAt],19) AS updatedAt
        FROM [translate_documents] td
        INNER JOIN [languages] fl ON td.[fromLanguageId] = fl.[id]
        INNER JOIN [languages] tl ON td.[toLanguageId] = tl.[id]
        INNER JOIN [documents_types] dt ON td.[documentTypeId]=dt.[id]
            WHERE td.status=${status}
            ORDER BY td.createdAt DESC OFFSET ${skip} 
            ROWS FETCH NEXT ${limit} ROWS ONLY`,
            { type: sequelize.QueryTypes.SELECT });

        let datas = [];
        for (let i = 0; i < rows.length; i++) {
            const images = await sequelize.query(`SELECT url
                FROM document_files WHERE translateDocumentId = '${rows[i].id}'`,
                { type: sequelize.QueryTypes.SELECT });
            rows[i] = { ...rows[i], images }
            datas = [...datas, rows[i]];
        }
        return res.status(200).json({ result: { count: count[0]['count'], rows: datas } });

    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

exports.findAllProceeding = async (req, res) => {
    try {
        const { MEMBER_ID } = req.payload;
        const skip = req.query.skip ?? 0;
        const limit = req.query.limit ?? 20;

        const count = await sequelize.query(`SELECT COUNT(id) AS count FROM translate_documents
                    WHERE memberId='${MEMBER_ID}' AND ( status=0 OR status=1 OR status=2 )`,
            { type: sequelize.QueryTypes.SELECT });
        const rows = await sequelize.query(`SELECT td.[id]
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
        ,td.[comment]
        ,td.[status]
        ,td.[updatedBy]
        ,LEFT(td.[createdAt],19) AS createdAt
        ,LEFT(td.[updatedAt],19) AS updatedAt
        FROM [translate_documents] td
        INNER JOIN [languages] fl ON td.[fromLanguageId] = fl.[id]
        INNER JOIN [languages] tl ON td.[toLanguageId] = tl.[id]
        INNER JOIN [documents_types] dt ON td.[documentTypeId]=dt.[id]
        WHERE td.memberId='${MEMBER_ID}' AND ( td.status=0 OR td.status=1 OR td.status=2 )
        ORDER BY td.createdAt DESC OFFSET ${skip} 
        ROWS FETCH NEXT ${limit} ROWS ONLY`,
            { type: sequelize.QueryTypes.SELECT });

        let datas = [];
        for (let i = 0; i < rows.length; i++) {
            const images = await sequelize.query(`SELECT url
                FROM document_files WHERE translateDocumentId = '${rows[i].id}'`,
                { type: sequelize.QueryTypes.SELECT });
            rows[i] = { ...rows[i], images }
            datas = [...datas, rows[i]];
        }
        return res.status(200).json({ result: { count: count[0]['count'], rows: datas } });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

exports.findAllProceed = async (req, res) => {
    try {
        const { MEMBER_ID } = req.payload;
        const skip = req.query.skip ?? 0;
        const limit = req.query.limit ?? 20;

        const count = await sequelize.query(`SELECT COUNT(id) AS count FROM translate_documents
                    WHERE memberId='${MEMBER_ID}' AND ( status=3 OR status=4 )`,
            { type: sequelize.QueryTypes.SELECT });
        const rows = await sequelize.query(`SELECT td.[id]
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
        ,td.[comment]
        ,td.[status]
        ,td.[updatedBy]
        ,LEFT(td.[createdAt],19) AS createdAt
        ,LEFT(td.[updatedAt],19) AS updatedAt
        FROM [translate_documents] td
        INNER JOIN [languages] fl ON td.[fromLanguageId] = fl.[id]
        INNER JOIN [languages] tl ON td.[toLanguageId] = tl.[id]
        INNER JOIN [documents_types] dt ON td.[documentTypeId]=dt.[id]
            WHERE td.memberId='${MEMBER_ID}' AND ( td.status=3 OR td.status=4 )
            ORDER BY td.createdAt DESC OFFSET ${skip} 
            ROWS FETCH NEXT ${limit} ROWS ONLY`,
            { type: sequelize.QueryTypes.SELECT });

        let datas = [];
        for (let i = 0; i < rows.length; i++) {
            const images = await sequelize.query(`SELECT url
                FROM document_files WHERE translateDocumentId = '${rows[i].id}'`,
                { type: sequelize.QueryTypes.SELECT });
            rows[i] = { ...rows[i], images }
            datas = [...datas, rows[i]];
        }
        return res.status(200).json({ result: { count: count[0]['count'], rows: datas } });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}
