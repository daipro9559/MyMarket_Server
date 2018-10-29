const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const app = express();
const passport = require('passport')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
const v1    = require('./routes/v1')
const CONFIG = require('./config/conf')
const pe = require('parse-error')
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())
    //Passport
app.use(passport.initialize())

//DATABASE
const models = require("./models");
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database');
})
.catch(err=>{
    console.error('Unable to connect to SQL database:',CONFIG.db_name, err)
})
// models.sequelize.sync()
app.use(cors())
// use route
app.use('/v1',v1)
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});
app.listen(CONFIG.port, () => {
    console.log("server listening on port 3000")
})