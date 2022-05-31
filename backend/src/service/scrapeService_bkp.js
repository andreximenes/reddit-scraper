const puppeteer = require('puppeteer');
const url = 'https://www.reddit.com/r/photo';


init = async() => {
    const browser = await puppeteer.launch(); //{ headless: false }
    const page = await browser.newPage();
    await page.goto(url)

    await page.waitForTimeout(5000)

    const data  = await page.evaluate(async () => {
        const list = []
        const items = await document.querySelectorAll(".scrollerItem.Post")

        for (const item of items) {
            const postTitle = item.querySelector("h3").innerHTML

            imagesList = Array.from(
                await item.querySelectorAll("img")
            )
                .map((img) => img.getAttribute("src"))
                .filter((imgSrc) => !imgSrc.includes('www.redditstatic.com'))

            if(imagesList.length <= 0){
                continue
            }

            list.push({
                title: postTitle,
                images: imagesList,
                htmlText: item.innerHTML
            })
        }
        return list
    });
    await browser.close()

    return data
}

module.exports = { init }