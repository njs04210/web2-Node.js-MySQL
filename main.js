var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var db = require('./lib/db.js');
var topic = require('./lib/topic.js');
var author = require('./lib/author.js');

const { authorSelect } = require('./lib/template.js');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === '/') {
    //home일때의 경우 . web눌렀을 때. 홈으로 들어왔을 때.
    if (queryData.id === undefined) {
      topic.home(request, response);
    } else {//HTML, CSS, JavaScript 눌렀을때. 선택한 목록 상세보기. 
      topic.page(request, response);
    }
  } else if (pathname === '/create') {//create 눌렀을 때
    topic.create(request, response);
  } else if (pathname === '/create_process') {//create하고 제출 버튼 눌렀을 때
    topic.create_process(request, response);
  } else if (pathname === '/update') {  //update를 눌렀을 때
    topic.update(request, response);
  } else if (pathname === '/update_process') {//update하고 제출버튼 눌렀을 때
    topic.update_process(request, response);
  } else if (pathname === '/delete_process') {//delete 눌렀을 때
    topic.delete_process(request, response);
  } else if (pathname === '/author') {//author 눌렀을때
    author.home(request, response);
  } else if (pathname === '/author/create_process') {//author 정보입력후 create 눌렀을 때
    author.create_process(request, response);
  } else if (pathname === '/author/update') {//author 테이블의 update 눌렀을 때
    author.update(request, response);
  } else if (pathname === '/author/update_process') {//author 테이블의 update 눌렀을 때
    author.update_process(request, response);
  } else if (pathname === '/author/delete_process') {//author 테이블의 delete 눌렀을 때
    author.delete_process(request, response);
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);