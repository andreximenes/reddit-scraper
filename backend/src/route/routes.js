const express = require('express')
const route = express.Router();
aplicationContext = process.env.APPLICATION_CONTEXT
const postController = require('../controller/postController')


route.get(`${aplicationContext}/server/info`, (req, res) => res.json({
    status: 'running...',
    timestamp: Date.now()
}))
route.get(`${aplicationContext}/posts/all`, postController.getAll)
route.get(`${aplicationContext}/posts/scrape`, postController.newScrape)
route.get('/', (req, res) => res.redirect(`${aplicationContext}/api-docs`))

module.exports = route