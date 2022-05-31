const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

require('dotenv').config();

const routes = require('./route/routes')
const config = require('./config/server-configuration')


// load and sync database (working as in memory database)
;(async () => {
    const database = require('./config/db');
    try {
        const result = await database.sync({ force: true });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
})();


const app  = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)
app.use(config.errorHandler);

// static images
app.use('/public/images', express.static(path.join(__dirname, '/images')))


// application Start
app.listen(process.env.PORT, () => {
    console.log(('App is running at http://localhost:%d in %s mode'), process.env.PORT, app.get('env'))
    console.log('Press CTRL-C to stop\n')

});

module.exports = app;