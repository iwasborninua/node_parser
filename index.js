const needle = require('needle');
const fs = require('fs');
const cheerio = require('cheerio');

let from = new Date('2006-02-01');
let to = new Date('2006-06-01');
let url = null;

while (from < to) {
    url = 'https://whoistory.com/' + from.getFullYear() + '/' +
        ((from.getMonth() + 1) < 10 ? '0' + (from.getMonth() + 1) : (from.getMonth() + 1)) + '/' +
        (from.getDate() < 10 ? "0" + from.getDate() : from.getDate());

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
               fs.appendFileSync('domains.txt', temp_node + "\n");
           }
        });
    });


    console.log(url);
    from.setDate(from.getDate() + 1);
}
