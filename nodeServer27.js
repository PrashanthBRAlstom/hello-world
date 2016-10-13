var express = require('C:/Data/nodejs/node_modules/express');
var bodyParser = require('c:/data/nodejs/node_modules/body-parser');
var fs = require('fs');
var path = require('path');
var app = express();
app.use('/public', express.static('../SVN_Local/public'));
app.use(express.static(__dirname));
app.use(bodyParser());
var counter = 0;
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ex27.html'));
});
htmls_list = function (req, res) {
    var htmls = [];
    fs.readdirSync(__dirname).forEach(function (item, index) {
        stats = fs.statSync(__dirname + "/" + item)
        if (stats.isFile()) {
            if (item.startsWith("tinymce")) {
                htmls.push(item)
            }
        }
    })
    res.json(htmls);
}
app.get("/GetHtmls", htmls_list);
app.post("/loadHtml", function (req, res) {
    res.header('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, req.body.value));
});
app.post('/SaveHtml', function (req, res) {
    //console.log(counter + req.body.main);
    fs.writeFile(path.join(__dirname, 'tinymce-' + counter + '.html'), req.body.main);
    res.end('Successfully saved XML to tinymce-' + counter + '.html');
    counter++;
});
var server = app.listen(9080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Node server app listening at http://%s:%s", host, port)
});