const router = require('express').Router();
const Users = require('./../models/users');
const Games = require('./../models/games');
const { check, validationResult } = require('express-validator/check');

router.post('/api/login/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    processUser(req, res);
});

function processUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    Users.asd.findUser(username, function (err, user) {
        if (err)
            console.log("ERROR: ", err);
        if (user) {
            checkPassword(res, user, password);
        }
        else {
            res.render('index', {
                errors: ["Username or password is wrong!"]
            });
        }
    });
}

function checkPassword(res, user, password) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (Users.asd.isValidPassword(password, user.user_password)) {
        if (isAdmin(res, user)) {
            redirectToAdmin(res);
        }
        else {
            redirectToUser(res, user);
        }
    }
    else {
        res.render('index', {
            errors: ["Username or password is wrong!"]
        });
    }
}

function isAdmin(res, user) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (user.user_role === "admin") {
        return true;
    }
}

function redirectToAdmin(res) {
    Games.asd.getAllGames(function (err, games) {
        if (err)
            console.log("ERROR: ", err);
        if (games) {
            res.render('admin', {
                games: games
            });
        }
        else {
            res.render('admin', {
                games: [""]
            });
        }
    });
}

function redirectToUser(res, user) {
    res.render('user', {
        user: user
    });
}

module.exports = router;