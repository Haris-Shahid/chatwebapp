var AuthUser = require('../models/auth');
const brcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret';

module.exports = {
    RegisterUser: (req, res) => {
        const today = new Date();
        const AuthUserData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            createdAt: today
        }
        AuthUser.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    brcrypt.hash(req.body.password, 10, (err, hash) => {
                        AuthUserData.password = hash
                        AuthUser.create(AuthUserData)
                            .then(user => {
                                res.json({ status: 'registered!', user: { username: user.username, email: user.email } })
                            }).catch(e => {
                                res.send('error: ' + e)
                            })
                    })
                } else {
                    res.json({ error: "User already exists" })
                }
            })
            .catch(e => {
                res.send('error: ' + e)
            })
    },
    LoginUser: (req, res) => {
        AuthUser.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    if (brcrypt.compareSync(req.body.password, user.password)) {
                        const payload = {
                            _id: user._id,
                            username: user.username,
                            email: user.email,
                        }
                        // let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })
                        res.send({ payload });
                    } else {
                        res.json({ error: 'You type a wrong password' })
                    }
                } else {
                    res.json({ error: "The email you entered doesn't belong to any User" })
                }
            })
            .catch(e => {
                res.send('error: ' + e)
            })
    },
    AuthUserProfile: (req, res) => {
        var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
        AuthUser.findOne({
            _id: decoded._id
        }).then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("User does not exist")
            }
        }).catch(e => res.send('error: ' + e))
    }
}
