const fs = require('fs');
const moment = require('moment');
const Bluebird = require('bluebird');
const got = require('got');
const cheerio = require('cheerio');

let urls = [];
let from = moment('2006-01-01', 'YYYY-MM-DD');
let to = moment('2020-01-01', 'YYYY-MM-DD');

while (from < to) {
    let url = 'https://whoistory.com/' + from.format("YYYY/MM/DD");
    urls.push(url);
    from.add(1, 'days');
}

async function getAllDomains(urls) {
    await Bluebird.map(urls, async url => {
        try {
            let domains_string = '';
            let response = await got(url)
                .then(console.log("Parsing: " + url))
                .catch(function () {
                    console.log("ERROR: " + url);
                });

            let $ = cheerio.load(response.body);

            $('div.left > a:not(.backlink)').each(async (i, elem) => {
                domains_string += $(elem).text() + '\n';
            });

            await fs.promises.appendFile('domains.txt', domains_string != undefined ? domains_string: '');

        } catch (err) {
            console.log(err);
        }
    }, {concurrency: 3})
}

getAllDomains(urls);