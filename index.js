const needle = require('needle');
const fs = require('fs');
const cheerio = require('cheerio');
const moment = require('moment');
const tress = require('tress');

let from = moment('2006-02-01', "YYYY-MM-DD");
let to = moment('2007-01-01', "YYYY-MM-DD");
let url = null;
var domains = [];

let q = tress(function (url, callback) {
    needle.get(url, function (err, res) {
        if (err) throw err;

        // вытянули всю html страницу
        let $ = cheerio.load(res.body);

        // Фильтруем
        $('.left a').each(function () {
            let temp_node = $(this).text();
            if (temp_node != 'Назад') {
                fs.appendFileSync('./domains.txt', temp_node + "\n");
            }
        });
    });

    callback();
}, 5);

while (from < to) {
    url = 'https://whoistory.com/' + from.format("YYYY/MM/DD");
    q.push(url);
    from.add(1, 'day');
};

q.drain = function () {
    console.log('end');
    fs.writeFileSync('./domains.txt', domains);
}

q.success = function () {
    console.log(this);
};