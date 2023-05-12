const sequelize = require('../configs/db');
const admin = require('firebase-admin');
const fcm = require('fcm-notification');
const serviceAccount = require('../firebase/service.account.json');
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

module.exports.sendNotification = async function sendNotification(memberId, title, body, page) {
    const mobileToken = await sequelize.query(`SELECT [MOBILE_TOKEN]
                                        FROM [UPAY].[dbo].[Tb_UPAY_MEMBER]
                                        WHERE MEMBER_ID='${memberId}'`,
        { type: sequelize.QueryTypes.SELECT });
    let message = {
        notification: {
            title,
            body: body
        },
        data: { page: page },
        token: mobileToken[0]['MOBILE_TOKEN']
    };
    FCM.send(message, function (err, resp) { });
}