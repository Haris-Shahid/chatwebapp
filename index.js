var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var routes = require('./routes/auth');

mongoose.connect('mongodb://imageUpload:imageUpload1@ds151596.mlab.com:51596/image_database', { useNewUrlParser: true });

app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

routes(app);

mongoose.connection.once('open', () => console.log('database connected'))
app.listen(5000, () => console.log('server started on port 5000'))