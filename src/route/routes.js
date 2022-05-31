const express = require('express')
const route = express.Router();

const postController = require('../controller/postController')


route.get('/server/info', (req, res) => res.json({
    status: 'running...',
    timestamp: Date.now()
}))
route.get('/api/v1/posts/all', postController.getAll)
route.get('/api/v1/posts/scrape', postController.newScrape)
route.get('/', (req, res) => res.redirect('/api/v1/api-docs'))

module.exports = route