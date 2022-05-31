const axios = require('axios')
const imgDownloadService = require('./imgDownloadService')
const imageService = require("./imgDownloadService");
const oauthUrl = 'https://www.reddit.com/api/v1/access_token'
const subredditUrl = 'https://oauth.reddit.com/r/photo'
const postSearchLimit = 25

async function getOAuthToken() {
    return axios({
        url: oauthUrl,
        method: 'post',
        params: {
            grant_type: 'client_credentials'
        },
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            username: process.env.CLIENT_ID,
            password: process.env.CLIENT_SECRET
        }
    }).then((response)=> {
        return response.data.access_token
    }).catch((error) => {
        console.log(error)
    })
}



async function start() {
    const result = await fetchPhotoPosts()
    const posts = []

    for(const item of result) {
        post = extractPostData(item)
        posts.push(post)
    }

    return posts
}

async function fetchPhotoPosts() {
    const token = await getOAuthToken();

    const response = await axios.get(`${subredditUrl}?limit=${postSearchLimit}`,
        { headers: {"Authorization" : `Bearer ${await getOAuthToken()}`} })
        .then(res => {
            return res.data.data.children
        })
        .catch((error) => {
            console.log(error)
        });
    return response
}


function extractPostData(item) {
    const title  = item.data.title
    const author = item.data.author
    let postImages = []

    // post with a single image
    if (item.data.preview) {
        const images = item.data.preview.images
        const imgName = images[0].source.url.split('/').pop().split('?')[0]
        const imgUrl = images[0].source.url.split('&amp;').join('&')

        postImages.push({
            name: imgName,
            url: imgUrl
        })
    }

    // post with multiple images
    if (item.data.media_metadata) {
        const imageList = item.data.media_metadata
        if (item.data.media_metadata) {
            const imageList = item.data.media_metadata

            for (const property in imageList) {
                const img = imageList[property]
                const imgName = img.s.u.split('/').pop().split('?')[0]
                const imgUrl = img.s.u.split('&amp;').join('&')

                postImages.push({
                    name: imgName,
                    url: imgUrl
                })
            }
        }
    }

    return {
        title: title,
        author: author,
        images: postImages
    };
}

module.exports = { start }