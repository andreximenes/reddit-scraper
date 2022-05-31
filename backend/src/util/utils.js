getImgType = (imgSrc) => {
    if(imgSrc.includes('jpg') || imgSrc.includes('jpeg')) {
        return 'jpg'
    }

    if(imgSrc.includes('png')) {
        return 'png'
    }

}

module.exports = { getImgType }