const { Post , PostImage}  = require('../model/models')
const scrapeService = require('./scrapeService')
const imageService = require('./imgDownloadService')
const utils = require('../util/utils')


async function getAll() {

    let posts = await Post.findByPk(1)
    posts.images = await getPostImagesByPostId(posts.id)
    // for (const post of posts) {
    //     post.images = await getPostImagesByPostId(post.id)
    // }

    return posts
}

async function getPostImagesByPostId(postId){
    return await PostImage.findAll({
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


async function scrapeAndSave() {
    const items = await scrapeService.start()

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

        for(const image of item.images){
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
    }

    return items;
}


module.exports = {
    getAll,
    scrapeAndSave
}