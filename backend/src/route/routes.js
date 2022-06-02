const express = require('express')
const route = express.Router();
aplicationContext = process.env.APPLICATION_CONTEXT
const postController = require('../controller/postController')
const serverConstants = require('../serverConstants')


route.get(`${serverConstants.APPLICATION_CONTEXT}/server/info`, (req, res) => res.json({
    status: 'running...',
    timestamp: Date.now()
}))
route.get('/' , (req, res) => res.redirect(`app`))
route.get('/api', (req, res) => res.redirect(`${serverConstants.APPLICATION_CONTEXT}/api-docs`))
route.get(`${serverConstants.APPLICATION_CONTEXT}/posts/all`, postController.getAll)
route.get(`${serverConstants.APPLICATION_CONTEXT}/posts/scrape`, postController.newScrape)
route.get(`${serverConstants.APPLICATION_CONTEXT}/posts/reset`, postController.deleteAll)


module.exports = route