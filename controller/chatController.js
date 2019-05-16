var AuthUser = require('../models/auth');
var ChatMessage = require('../models/chat');
var uuid = require('uuidv4');

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
    getChatList: (socket, uid) => {
        ChatMessage.find({ $or: [{ receiverId: uid }, { senderId: uid }] })
            .then(chats => socket.emit('all_chats', chats))
            .catch(e => console.log(e))
    },
    handleMessageSend: async (message, io, bucket) => {
        var imageFile = message.chat.image
        if (imageFile) {
            var fileName = `${uuid()}.png`
            var file2 = bucket.file('chat-images/' + fileName);
           await file2.save(imageFile, {
                metadata: { contentType: 'image/jpeg' },
            })
            var yearlater = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            file2.getSignedUrl({ action: 'read', expires: yearlater }).then(url => {
                message.chat.image = url[0]
                ChatMessage.create(message).then((chat) => {
                    io.emit('update_chat', chat)
                }).catch(e => console.log(e))
            })
        } else {
            ChatMessage.create(message).then((chat) => {
                io.emit('update_chat', chat)
            }).catch(e => console.log(e))
        }
    }
}
