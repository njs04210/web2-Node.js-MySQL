var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring');

exports.home = function (request, response) {
    db.query(`SELECT * FROM topic`, function (error, topics) {
        db.query(`SELECT * FROM author`, function (error2, authors) {
            var title = 'author';
            var list = template.list(topics);
            var html = template.HTML(title, list,
                `
                ${template.authorTable(authors)}
                <style>
                    table {
                        border-collapse:collapse;
                    }
                    td {
                        border: 1px solid black;
                    }
                </style>
                <form action="/author/create_process" method="post">
                    <p>
                        <input type="text" name="name" placeholder="name">
                    </p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
                `,
                ``
            );
            response.writeHead(200); //웹페이지로써 꼭 알려줘야하는 중요한 코드
            response.end(html);
        });
    });
}

exports.create_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`
      INSERT INTO author (name, profile)
        VALUES (?, ?)`,
            [post.name, post.description], function (error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, { Location: `/author` });
                response.end();
            })
    });
}