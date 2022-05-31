const { Post , PostImage}  = require('../model/models')
const scrapeService = require('./scrapeService')
const imageService = require('./imgDownloadService')
const utils = require('../util/utils')


async function getAll() {
    let posts = await Post.findAll({
        attributes:['id', 'title', 'author']
    })
    for (let post of posts) {
        post.setDataValue('images', await getPostImagesByPostId(post.id))
    }

    return posts
}

async function getPostImagesByPostId(postId){
    return await PostImage.findAll({
        attributes: [ 'name', [ 'sourceUrl', 'src'] ] ,
        where: {
            postId: postId
        }
    }).catch((err) => {
        console.error(err)
        throw err
    })
}


async function postAlreadyExists(post) {
    return await Post.count({ where: { title: post.title }})
        .then( count => {
            if (count > 0){
                return true
            }
            return false
        })
}


async function scrapeAndSave(customLimit) {
    const items = await scrapeService.start(customLimit)
    let count = 0;
    let post;
    for (const item of items) {

        if (await postAlreadyExists(item)) {
            continue
        }

        post = await Post.create({
            title: item.title,
            author: item.author
        }).catch((err) => {
            console.error(err)
            throw err
        })

        for (const image of item.images) {
            await PostImage.create({
                postId: post.id,
                name: image.name,
                sourceUrl: `http://localhost:${process.env.PORT}/public/images/${image.name}`
            }).catch((err) => {
                console.error(err)
                throw err
            })

            imageService.download(image.url, image.name)
        }

        count++
    }

    return count;
}


module.exports = {
    getAll,
    scrapeAndSave
}