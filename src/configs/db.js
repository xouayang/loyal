const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mssql',
        timezone: '+07:00',
        dialectOptions: {
            useUTC: true,
            options: {
                encrypt: false,
            }
        },
        // define: {
        //     // underscored: true,
        // },
    });

//test database connection

sequelize.authenticate().then(() => {
    console.log('Database connection success')
}).catch((error) => {
    console.log(error)
});


//show all tables in database

// sequelize
//     .getQueryInterface().showAllSchemas()
//     .then(result => {
//         console.log(result)
//     })

//create table when table name is not exit
// sequelize.sync().then(data => {
//     // console.log(data);
// });

module.exports = sequelize;