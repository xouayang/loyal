const routes = require('express').Router();

const user = require('./user.routes');
const province = require('./province.routes');
const district = require('./district.routes');
const role = require('./role.routes');
const employee = require('./employee.routes');
const permission = require('./permission.routes');
const upload = require('../routes/upload.routes');
const document = require('../routes/document.routes');
const documentFile = require('./document.file.routes');
const language = require('./language.routes');
const problem = require('./problem.routes');
const translatePrice = require('./translate.price.routes');
const priceUnit = require('./price.unit.routes');
const consultLawyer = require('./consult.lawyer.routes');
const consultLawyerLog = require('./consult.lawyer.log.routes');
const translateDocument = require('./translate.document.routes');
const translateDocumentLog = require('./translate.document.log.routes');
const carryOutDocument = require('./carry.out.document.routes');
const carryOutDocumentLog = require('./carry.out.document.log.routes');
const lawyers = require('./lawyer.routes');
const documentType = require('./document.type.routes');
const lawyerUser = require('./lawyer.user.routes');
const chat = require('./chat.routes');
const chatImage = require('./chat.image.routes');
const servicePrice = require('./service.price.routes');
const consultPrice = require('./consult.price.routes');
const carryOutPrice = require('./carry.out.price.routes');
const companyInfo = require('./company.info.routes');
const report = require('./retport.routes')
const checkAdmin = require('./checkAdmin.routes')

//use routes
routes.use('/users', user);
routes.use('/provinces', province);
routes.use('/districts', district);
routes.use('/roles', role);
routes.use('/employees', employee);
routes.use('/permissions', permission);
routes.use('/uploads', upload);
routes.use('/documents', document);
routes.use('/documents-files', documentFile);
routes.use('/languages', language);
routes.use('/problems', problem);
routes.use('/translates-prices', translatePrice);
routes.use('/prices-units', priceUnit);
routes.use('/consults-lawyers', consultLawyer);
routes.use('/consults-lawyers-logs', consultLawyerLog);
routes.use('/translates-documents', translateDocument);
routes.use('/translates-documents-logs', translateDocumentLog);
routes.use('/carrys-outs-documents', carryOutDocument);
routes.use('/carrys-outs-documents-logs', carryOutDocumentLog);
routes.use('/lawyers', lawyers);
routes.use('/document-type', documentType);
routes.use('/lawyers-users', lawyerUser);
routes.use('/chats', chat);
routes.use('/chats-images', chatImage);
routes.use('/services-prices', servicePrice);
routes.use('/consults-prices', consultPrice);
routes.use('/carrys-outs-prices', carryOutPrice);
routes.use('/company-infos', companyInfo);
routes.use('/report',report);
routes.use('/checkAdmin',checkAdmin);


module.exports = routes;