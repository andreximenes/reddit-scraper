const path = require('path')
const fs = require('fs');
const axios = require('axios').default;
const { exec } = require('child_process')
const imgFolder = 'src/images'



const downloadFile = async (imgUrl, imgName) => {
    const res = await axios({
        method: 'GET',
        url: imgUrl,
        responseType: 'stream',
    });

    const fp = path.join(path.resolve('.'), imgFolder, imgName);

    const writer = fs.createWriteStream(fp, { autoClose: true });

    res.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    })
}


module.exports = { downloadFile };