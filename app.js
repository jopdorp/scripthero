var express = require('express');
var app = express();

app.use(express.static(__dirname + '/src/client'));
app.use(express.static(__dirname + '/bin'));

app.listen(process.env.PORT || 8080);
console.log("open http://localhost:8080/ in your favorite broswer ;-)");