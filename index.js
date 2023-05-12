const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
// require('./src/configs/db');
const { admin } = require('./src/firebase/firebase_config')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use(require('./src/routes/routes'));

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};
app.post('/firebase/notification', (req, res) => {
    const registrationToken = 'eRG0V5GzQSCoJ-wmRBQFor:APA91bGOnO03gZlQpXCNA3dmTRyeOz_t6194DC3EVK7KO-ydAfdE-u72cK1DJ3LbLsv-4Q6wzmYRiqkb08pjm2j86A4xKTCDoOLnoTimTIKfuAlgAGr1mdCT9cgcnTlZiPIyVGrwpn17'
    // const registrationToken = 'eQ2EdS4oSSiAqMNP93qS8M:APA91bFs7917iFbfYxo3ynwoG5KEx5b8BEygd-TcISWHaYbwGMNpfU4TqUhth4Xi-GMndkik-2TkPcXW64PcG8lNZWE4ryrvgOqlxlFoxoaeCE74G7HCiflkalWLsdP4iedu56Ozqak2'
    // const message = 'test notification'
    const options = notification_options

    const payload = {
        data: {
            MyTitle1: 'Title test0'
        }
    };

    admin.messaging().sendToDevice(registrationToken, payload, options)
        .then(response => {
            console.log(response)
            console.log(response.results[0])

            res.status(200).send("Notification sent successfully")

        })
        .catch(error => {
            console.log(error);
        });


    // const payload = {
    //     notification: {
    //         'title': `Title test00`,
    //         'body': `Just for tseting`,
    //     },
    //     data: {
    //         'personSent': registrationToken
    //     }
    // };
    // console.log(payload);
    // admin.messaging().sendToTopic("pet_Id", payload).then(response => {
    //     console.log(response)
    //     // console.log(response.results[0])

    //     res.status(200).send("Notification sent successfully")

    // })
    //     .catch(error => {
    //         console.log(error);
    //     });

})


app.get('/', (req, res) => {
    return res.status(200).json({ MESSAGE: "WELCOME TO IT CAPITAL HR API" })
});

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is runing on port: ${port}`);
})