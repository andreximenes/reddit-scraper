const express = require('express')
const route = express.Router();

const postController = require('../controller/postController')


route.get('/server/info', (req, res) => res.json({
    status: 'running...',
    timestamp: Date.now()
}))
route.get('/posts/all', postController.getAll)
route.get('/posts/scrape', postController.newScrape)

module.exports = route