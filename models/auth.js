var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    createdAt: { 
        type: Date,
        default: Date.now()
    }
})

const AuthUser = mongoose.model('users', UserSchema)

module.exports = AuthUser;