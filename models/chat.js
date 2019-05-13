var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ChatSchema = new Schema({
    senderId: String,
    receiverId: String,
    message: String,
    createdAt: { 
        type: Date,
        default: Date.now()
    }
})

const ChatMessage = mongoose.model('chats', ChatSchema)

module.exports = ChatMessage;