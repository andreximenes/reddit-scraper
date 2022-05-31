const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

require('dotenv').config();

const routes = require('./route/routes')
const config = require('./config/serverConfig')
const database = require("./config/db");



const app  = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)


// static images
app.use('/api/v1/public/images', express.static(path.join(__dirname, '/images')))

//swagger
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(config.createErroNotFound)
app.use(config.errorHandler);

// application Start
app.listen(process.env.PORT, () => {
    console.log(('App is running at http://localhost:%d in %s mode'), process.env.PORT, app.get('env'))
    console.log('Press CTRL-C to stop\n')

});

// load and sync database (working as in memory database)
;(async () => {
    const database = require('./config/db');
    try {
        const result = await database.sync();
    } catch (error) {
        console.log(error);
    }
})();

module.exports = app;