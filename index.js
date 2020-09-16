const fs = require('fs');
const moment = require('moment');
const Bluebird = require('bluebird');
const got = require('got');
const cheerio = require('cheerio');

let urls = [];
let from = moment('2006-01-01', 'YYYY-MM-DD');
let to = moment('2008-01-01', 'YYYY-MM-DD');

while (from < to) {
    let url = 'https://whoistory.com/' + from.format("YYYY/MM/DD");
    urls.push(url);
    from.add(1, 'days');
}

async function getAllDomains(urls) {
    await Bluebird.map(urls, async url => {
        try {
            let response = await got(url)
                .then(console.log("Parsing: " + url))
                .catch(function () {
                    console.log('1212');
                });
            let $ = cheerio.load(response.body);

            $('.left a').each(async (i, elem) => {
                let elementToWrite = $(elem).text();
                await fs.promises.appendFile('domains.txt', elementToWrite !== 'Назад' ? `${elementToWrite}\n` : '');
            });

        } catch (err) {
            console.log(err);
        }
    }, {concurrency: 3})
}

getAllDomains(urls);