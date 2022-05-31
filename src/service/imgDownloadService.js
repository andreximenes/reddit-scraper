const path = require('path')
const { exec } = require('child_process')
const imgFolder = 'src/images'


function download(imgUrl, imgName) {
    const imagePath = path.join(path.resolve('.'), imgFolder, imgName)
    exec(`wget '${imgUrl}' -O ${imagePath}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err)
        }
    });
}

module.exports = { download };