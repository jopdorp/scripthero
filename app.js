var express = require('express');
const cors = require('cors');
var app = express();


const corsOptions = {
    origin: 'http://localhost:8080'
};

app.use(cors());
app.use(express.static(__dirname + '/src/client'));

app.listen(process.env.PORT || 8080);
console.log("open http://localhost:8080/ in your favorite broswer ;-)");