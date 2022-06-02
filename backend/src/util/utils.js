const fs = require('fs')

function exsistsFolder(path) {
    return fs.existsSync(path)
}

const createFolder = (path) => {
    return fs.mkdirSync(path)
}

const deleteFolder = (path) => {
    return fs.rmSync(path, { recursive: true, force: true })
}

module.exports = { exsistsFolder, createFolder, deleteFolder }