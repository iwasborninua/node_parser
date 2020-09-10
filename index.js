const needle = require('needle');
const fs = require('fs');
const cheerio = require('cheerio');
const moment = require('moment');

let from = moment('2006-02-01', "YYYY-MM-DD");
let to = moment('2006-06-01', "YYYY-MM-DD");
let url = null;

while (from < to) {
    url = 'https://whoistory.com/' + from.format("YYYY/MM/DD");

    needle.get(url, function (err, res) {
        if (err) {
            throw err;
        }

        // Вытянули всю html страницу
        let $ = cheerio.load(res.body);
        // Фильтруем и пишем в файл
        $('.left a').each(function () {
            let temp_node = $(this).text();
           if (temp_node != 'Назад') {
               try {
                   fs.appendFileSync('domains.txt', temp_node + "\n")
               } catch (e) {
                   throw e;
               }
           }
        });
    });

    console.log(url);
    from.add( 1, 'day');
}
