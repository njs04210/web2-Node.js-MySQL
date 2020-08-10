var db = require('./db.js')
var template = require('./template.js');
exports.home = function (request, response) {
    db.query(`SELECT * FROM topic`, function (error, topics) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(topics);
        var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
        );
        response.writeHead(200); //웹페이지로써 꼭 알려줘야하는 중요한 코드
        response.end(html);
    });
}
