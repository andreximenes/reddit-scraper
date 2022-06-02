const path = require('path')
const fs = require('fs')
const axios = require('axios').default
const utils = require('../util/utils')

async function downloadFile(imgUrl, imgName) {
    const res = await axios({
        method: 'GET',
        url: imgUrl,
        responseType: 'stream',
    });

    if (!utils.exsistsFolder(path.join(path.resolve('.'), 'public/images'))) {
        utils.createFolder(path.join(path.resolve('.'), 'public/images'))
    }

    const fp = path.join(path.resolve('.'), 'public/images', imgName);
    const writer = fs.createWriteStream(fp, { autoClose: true });

    res.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    })
}

module.exports = { downloadFile };