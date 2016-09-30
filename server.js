/**
 * Created by amitsh on 24-01-2016.
 */
var express = require('express');
var app = express();
app.use(express.static(__dirname+'/public'));
app.get('/', function (req,res) {
    res.sendfile('coverage/html/index.html')
});

app.listen(8080);
console.log('Server Started');