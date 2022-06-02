const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')
const serverConstants = require('./serverConstants')

require('dotenv').config();

const routes = require('./route/routes')
const config = require('./config/serverConfig')
const database = require("./config/db");

aplicationContext = process.env.APPLICATION_CONTEXT

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)

// static
app.use(express.static(path.join(path.resolve('.'), 'public/webapp/')));

// static folder to server the frontend app
app.get('/app', (req,res) => res.sendFile('index.html' , { root : path.join(path.resolve('.'), 'public/webapp/') }))
app.use(`${serverConstants.APPLICATION_CONTEXT}/public/images`, express.static(path.join(path.resolve('.'), 'public/images')))


//swagger
app.use(`${serverConstants.APPLICATION_CONTEXT}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(config.createErrorNotFound)
app.use(config.errorHandler);

// application Start
app.listen(process.env.PORT || 8000, () => {
    console.log(('App is running at %s:%d in %s mode'), process.env.HOST || 'http//localhost', process.env.PORT || 8000, app.get('env'))
    console.log('Press CTRL-C to stop\n')

});

// load and sync database (working as in memory database)
;(async () => {
    try {
        const result = await database.sync();
    } catch (error) {
        console.log(error);
    }
})();

module.exports = app;