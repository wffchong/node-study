// 抓取豆瓣读书中的数据信息
const axios = require('axios').default
const cheerio = require('cheerio')
const Book = require('../modules/Book')

/**
 * 获取豆瓣读书网页的源代码
 */
// const headers = {
//     'User-Agent':
//         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
//     Cookie: 'bid=KZk07SMnz70; ap_v=0,6.0; viewed="36099237"; gr_user_id=4f5ce72c-6fd8-4481-ad54-b9c1db709994; gr_cs1_dae41576-daff-45f9-8b6f-42eba6b52bf9=user_id%3A0; dbcl2="263924169:Bh1pRDJ1yBI"; ck=eX3o; push_noty_num=0; push_doumail_num=0; gr_session_id_22c937bbd8ebd703f2d8e9445f7dfd03=c4ae5dd0-efdc-4624-82ff-47156574ab50; gr_session_id_22c937bbd8ebd703f2d8e9445f7dfd03_c4ae5dd0-efdc-4624-82ff-47156574ab50=false; gr_cs1_c4ae5dd0-efdc-4624-82ff-47156574ab50=user_id%3A0',
//     Referer: 'https://book.douban.com/latest'
// }

async function getBooksHTML() {
    const resp = await axios({
        url: 'https://book.douban.com/latest',
        method: 'GET'
        // headers
    })
    return resp.data
}

/**
 * 从豆瓣读书中得到一个完整的网页，并从网页中分析出书籍的基本信息，然后得到一个书籍的详情页链接数组
 */
async function getBookLinks() {
    const html = await getBooksHTML()
    const $ = cheerio.load(html)
    const alinkElements = $('#content .grid-16-8 .media a')
    console.log(alinkElements.length)
    console.log(alinkElements)
    const links = alinkElements
        .map((i, ele) => {
            const href = ele.attribs['href']
            console.log(href)
            return href
        })
        .get()
    return links
}

/**
 * 根据书籍详情页的地址，得到该书籍的详细信息
 * @param {*} detailUrl
 */
async function getBookDetail(detailUrl) {
    const resp = await axios.get(detailUrl)
    const $ = cheerio.load(resp.data)
    const name = $('h1 span').text().trim()
    const imgUrl = $('#mainpic .nbg img').attr('src')
    const spans = $('#info span.pl')
    const authorSpan = spans.filter((i, ele) => {
        return $(ele).text().includes('作者')
    })
    const author = authorSpan.next('a').text()
    const publishSpan = spans.filter((i, ele) => {
        return $(ele).text().includes('出版年')
    })
    const publishDate = publishSpan[0] ? publishSpan[0].nextSibling.nodeValue.trim() : '2022-10'

    return {
        name,
        imgUrl,
        publishDate,
        author
    }
}

/**
 * 获取所有的书籍信息
 */
async function fetchAll() {
    const links = await getBookLinks() //得到书籍的详情页地址
    const promiseAll = links.map(link => {
        return getBookDetail(link)
    })
    return Promise.all(promiseAll)
}

// /**
//  * 得到书籍信息，然后保存到数据库
//  */
async function saveToDB() {
    const books = await fetchAll()
    await Book.bulkCreate(books)
    console.log('抓取数据并保存到了数据库')
}

saveToDB()
