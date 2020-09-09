let needle = require('needle');
let fs = require('fs');

let from = new Date('2006-02-01');
let to = new Date('2006-02-02');
let url = null;
// q1212

while (from < to) {
    url = 'https://whoistory.com/' + from.getFullYear() + '/' + ("0" + (from.getMonth() + 1)) + '/' + (from.getDate() < 10 ? "0" + from.getDate(): from.getDate());

    needle.get(url, function(err, res){
        if (err) throw err;
        console.log(res.body);
        console.log(res.statusCode);
    });

    from.setDate(from.getDate() + 1);
}
//1

fs.appendFile("domains.txt", "test", function (error) {
    if (error) throw error;
})
