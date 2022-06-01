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

    if (!fs.existsSync(path.join(path.resolve('.'), imgFolder))) {
        fs.mkdirSync(path.join(path.resolve('.'), imgFolder))
    }

    const fp = path.join(path.resolve('.'), imgFolder, imgName);

    const writer = fs.createWriteStream(fp, { autoClose: true });

    res.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    })
}

downloadFile('https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  , 'teste.jpeg')

module.exports = { downloadFile };