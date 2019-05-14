var AuthUser = require('../models/auth');
var ChatMessage = require('../models/chat');

module.exports = {
    getUserList: (socket) => {
        AuthUser.find(({}, (err, data) => {
            if (data.length !== 0) {
                let newList = [];
                data.map(v => {
                    newList.push({ _id: v._id, username: v.username, email: v.email })
                })
                socket.emit('all_Users', newList)
            }
        }))
    },
    getChatList: (socket) => {
        ChatMessage.find({}, (e, chat) => {
            console.log('all_chats')
            socket.emit('all_chats', chat)
        })
    }
}
