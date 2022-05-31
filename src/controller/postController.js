const postService = require('../service/postService')


async function getAll(req, res) {
    posts  = await postService.getAll()
    res.json({ data: posts} )
}

async function newScrape(req, res) {
    res.json({ data: await postService.scrapeAndSave()} )
}

module.exports = {
    getAll,
    newScrape
}