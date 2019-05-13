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

app.use(cors());
mongoose.connect('mongodb://imageUpload:imageUpload1@ds151596.mlab.com:51596/image_database', { useNewUrlParser: true });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

routes(app);
var interval;
io.on('connection', socket => {
    console.log('user connected')
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => {
        ChatController.getUserList(socket)
        ChatController.getChatList(socket)
    }, 5000);

    socket.on('message_send', (chat) => {
        ChatMessage.create(chat).then(() => {
            ChatMessage.find({}, (e, updateChat) => {
                socket.emit('all_chats', updateChat)
            })
        }).catch(e => console.log(e))
    })

})

mongoose.connection.once('open', () => console.log('database connected'))
server.listen(port, () => console.log('server started on port ' + port))