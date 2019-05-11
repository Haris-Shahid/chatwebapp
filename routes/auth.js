const AuthController = require('../controller/authController');

module.exports = (app) => {
    app.post('/auth/register', AuthController.RegisterUser )
    app.post('/auth/login', AuthController.LoginUser )
    app.get('/auth/profile', AuthController.AuthUserProfile )
}


