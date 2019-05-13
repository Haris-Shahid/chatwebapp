const AuthController = require('../controller/authController');
var AuthUser = require('../models/auth');

module.exports = (app) => {
    app.post('/auth/register', AuthController.RegisterUser)
    app.post('/auth/login', AuthController.LoginUser)
    app.get('/auth/profile', AuthController.AuthUserProfile)
    app.get('/auth/profile', (req, res) => {
        AuthUser.find({}).then(user => {
            res.send(user)
        }).catch(err => res.send(err))
    })

}


