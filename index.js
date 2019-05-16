var express = require('express');
var app = express();
const port = process.env.PORT || 4000;
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

var ChatMessage = require('./models/chat');
var ChatController = require('./controller/chatController');
var AuthUser = require('./models/auth');

var routes = require('./routes/routes');

////// firebase storage initialize end
const keyFilename = "./utils/react-projects-4cc3f-firebase-adminsdk-8zna6-94529b2828.json"; //replace this with api key file
const projectId = "react-projects-4cc3f" //replace with your project id
const bucketName = 'react-projects-4cc3f.appspot.com';
const gcs = require('@google-cloud/storage')
const stg = new gcs.Storage({
    projectId,
    keyFilename
})
const bucket = stg.bucket(bucketName);
///////////  firebase storage initialize end
app.use(cors());
mongoose.connect('mongodb://imageUpload:imageUpload1@ds151596.mlab.com:51596/image_database', { useNewUrlParser: true });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

routes(app);

var usersConnected = []

io.on('connection', socket => {
    usersConnected.push(socket);
    console.log('user connected')

    socket.on('newRegistration', (user) => {
        io.emit('newRegisterUserAdded', user)
    })

    socket.on('getUsersAndChats', (authuser) => {
        ChatController.getChatList(io, authuser.userUid)
        ChatController.getUserList(io)
    })

    socket.on('message_send', (message) => {
        ChatController.handleMessageSend(message, io, bucket)
    })

    socket.on('disconnect', function () {
        usersConnected.splice(usersConnected.indexOf(socket), 1);
    });
})

mongoose.connection.once('open', () => console.log('database connected'))
server.listen(port, () => console.log('server started on port ' + port))