const needle = require('needle');
const fs = require('fs');

let from = new Date('2006-02-01');
let to = new Date('2006-05-02');
let url = null;

while (from < to) {
    url = 'https://whoistory.com/' + from.getFullYear() + '/' + ("0" + (from.getMonth() + 1)) + '/' + (from.getDate() < 10 ? "0" + from.getDate(): from.getDate());
    console.log(url);
    needle.get(url, function(err, res){
        if (err) throw err;
    });

    from.setDate(from.getDate() + 1);
}
//1

fs.appendFile("domains.txt", "test", function (error) {
    if (error) throw error;
})
