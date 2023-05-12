const { type } = require('express/lib/response');
const sequelize = require('../configs/db');
const TranslatePrice = require('../models/translate.price.model');


exports.create = (req, res) => {
    const { MEMBER_ID } = req.payload;
    TranslatePrice.create({ ...req.body, createdBy: MEMBER_ID }).then((data) => {
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
    TranslatePrice.update({ ...req.body, updatedBy: MEMBER_ID }, { where: where }).then((data) => {
        if (data[0] == 1) {
            TranslatePrice.findOne({
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

exports.block = (req, res) => {
    const { MEMBER_ID } = req.payload;
    const id = req.params.id;
    const where = { id: id };
    TranslatePrice.update({ blocked: 1, updatedBy: MEMBER_ID }, { where: where }).then((data) => {
        if (data[0] == 1) {
            TranslatePrice.findOne({
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

exports.delete = (req, res) => {
    const id = req.params.id;
    const where = { id: id };
    TranslatePrice.destroy({ where: where }).then((_) => {
        return res.status(201).json({ result: 'Deleted' });
    }).catch((error) => {
        return res.status(400).json({ message: error });
    })
    // TranslatePrice.update({ deleted: 1 }, { where: where }).then((data) => {
    //     if (data[0] == 1) {
    //         TranslatePrice.findOne({
    //             where: where
    //         }).then((data) => {
    //             if (data) {
    //                 return res.status(200).json({ result: data });
    //             }
    //             return res.status(400).json({ message: 'Some thing when wrong' });
    //         }).catch((error) => {
    //             return res.status(400).json({ message: error });
    //         })
    //     } else {
    //         return res.status(400).json({ message: 'Some thing when wrong' });
    //     }
    // }).catch((error) => {
    //     return res.status(400).json({ message: error });
    // })
}

exports.findAll = async (req, res) => {
    try {
        var data = await sequelize.query(`SELECT 
        tr.[id]
        ,tr.[fromLanguageId]
        ,fl.[language] as fromLanguage
        ,tr.[toLanguageId]
        ,tl.[language] as toLanguage
        ,tr.[documentTypeId]
        ,dt.[document_type]
        ,tr.[price]
        ,tr.[priceUnitId]
        ,pu.[unit]
        ,tr.[blocked]
        ,tr.[deleted]
        ,tr.[createdBy]
        ,tr.[updatedBy]
        ,tr.[createdAt]
        ,tr.[updatedAt]
        FROM [DB_LOYAL_DEV].[dbo].[translate_prices] tr 
        INNER JOIN languages fl ON tr.fromLanguageId=fl.id
        INNER JOIN languages tl ON tr.toLanguageId=tl.id
        INNER JOIN documents_types dt ON tr.documentTypeId=dt.id
        INNER JOIN price_units pu ON tr.priceUnitId=pu.id`,
            { type: sequelize.QueryTypes.SELECT });
        var count = await sequelize.query(`SELECT  COUNT([id]) as count
        FROM [DB_LOYAL_DEV].[dbo].[translate_prices]`,
            { type: sequelize.QueryTypes.SELECT });

        return res.status(200).json({
            result: {
                count: count[0]['count'],
                rows: data
            }
        });
    } catch (error) {
        return res.status(400).json({ result: error });
    }
}

exports.findAllUnBlocked = async (req, res) => {
    try {
        var data = await sequelize.query(`SELECT 
        tr.[id]
        ,tr.[fromLanguageId]
        ,fl.[language]
        ,tr.[toLanguageId]
        ,tl.[language]
        ,tr.[documentTypeId]
        ,dt.[document_type]
        ,tr.[price]
        ,tr.[priceUnitId]
        ,pu.[unit]
        ,tr.[blocked]
        ,tr.[deleted]
        ,tr.[createdBy]
        ,tr.[updatedBy]
        ,tr.[createdAt]
        ,tr.[updatedAt]
        FROM [DB_LOYAL_DEV].[dbo].[translate_prices] tr 
        INNER JOIN languages fl ON tr.fromLanguageId=fl.id
        INNER JOIN languages tl ON tr.toLanguageId=tl.id
        INNER JOIN documents_types dt ON tr.documentTypeId=dt.id
        INNER JOIN price_units pu ON tr.priceUnitId=pu.id
        WHERE tr.blocked=0`,
            { type: sequelize.QueryTypes.SELECT });
        var count = await sequelize.query(`SELECT  COUNT([id]) as count
        FROM [DB_LOYAL_DEV].[dbo].[translate_prices]`,
            { type: sequelize.QueryTypes.SELECT });

        return res.status(200).json({
            result: {
                count: count[0]['count'],
                rows: data
            }
        });
    } catch (error) {
        return res.status(400).json({ result: error });
    }
}

exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        var data = await sequelize.query(`SELECT 
        tr.[id]
        ,tr.[fromLanguageId]
        ,fl.[language]
        ,tr.[toLanguageId]
        ,tl.[language]
        ,tr.[documentTypeId]
        ,dt.[document_type]
        ,tr.[price]
        ,tr.[priceUnitId]
        ,pu.[unit]
        ,tr.[blocked]
        ,tr.[deleted]
        ,tr.[createdBy]
        ,tr.[updatedBy]
        ,tr.[createdAt]
        ,tr.[updatedAt]
        FROM [DB_LOYAL_DEV].[dbo].[translate_prices] tr 
        INNER JOIN languages fl ON tr.fromLanguageId=fl.id
        INNER JOIN languages tl ON tr.toLanguageId=tl.id
        INNER JOIN documents_types dt ON tr.documentTypeId=dt.id
        INNER JOIN price_units pu ON tr.priceUnitId=pu.id
        WHERE tr.id='${id}'`,
            { type: sequelize.QueryTypes.SELECT });

        return res.status(200).json({
            result: data[0]
        });
    } catch (error) {
        return res.status(400).json({ result: error });
    }
}


exports.getPrice = (req, res) => {
    console.log('--------------------')
    const { fromLanguageId, toLanguageId, documemntTypeId } = req.query;
    sequelize.query(`SELECT tp.price, pu.unit
        FROM translate_prices tp INNER JOIN price_units pu ON tp.priceUnitId=pu.id
        WHERE tp.fromLanguageId='${fromLanguageId}'
        AND tp.toLanguageId='${toLanguageId}'
        AND tp.documentTypeId='${documemntTypeId}'`,
        { type: sequelize.QueryTypes.SELECT }).then((data) => {
            if (data) {
                return res.status(200).json({ result: data[0] });
            }
            return res.status(400).json({ message: 'Some thing when wrong' });
        }).catch((error) => {
            return res.status(400).json({ message: error });
        })
}
