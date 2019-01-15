const router = require('express').Router();
const Users = require('./../models/users');
const Games = require('./../models/games');

var path = require('path')
var multer = require('multer')
var fs = require('fs')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

router.delete('/api/game/delete/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    deleteGame(req, res);
});

router.get('/api/game/update/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    updateGame(req, res);
});

router.patch('/api/game/:id', upload.single('filetoupload'), (req, res) => {
    var buffer = req.file.buffer
    editGame(buffer, req, res);
});

router.get('/admin', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    getAllGames(req, res);
});

router.get('/api/game', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.render('addGame');
});


router.patch('/api/users/addAdmin/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    addAdminPrivileges(req, res);
});

router.patch('/api/users/removeAdmin/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    removeAdminPrivileges(req, res);
});

router.get('/api/users', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    getAllUsers(req, res);
});

router.post('/api/game/add', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    addGame(req, res);
});

function deleteGame(req, res) {
    var gameId = req.params.id;

    Games.asd.deleteGame(gameId, function (err, result) {
        res.render('admin', {
            errors: [""],
            games: []
        });
    });
}

function addAdminPrivileges(req, res) {
    var id = req.params.id;
    Users.asd.updateUser("admin", id, function (err, result) {
        if (err)
            res.render('admin', {
                errors: ["ERROR occurred while updating User privileges!"],
                games: []
            });
        if (result) {
            res.redirect('/api/users');
        }
    });
}

function removeAdminPrivileges(req, res) {
    var id = req.params.id;
    Users.asd.updateUser("user", id, function (err, result) {
        if (err)
            res.render('admin', {
                errors: ["ERROR occurred while updating User privileges!"],
                games: []
            });
        if (result) {
            res.redirect('/api/users');
        }
    });
}

function editGame(buffer, req, res) {
    var bufferBase64 = buffer.toString('base64')
    var game_id = req.params.id;
    var game = req.body;
    var title = game.title;
    var category = game.category;
    var min_players = game.min_players;
    var max_players = game.max_players;
    var playing_time = game.playing_time;
    var age = game.age;
    var complexity = game.complexity;
    var description = game.description;

    Games.asd.updateGame(title, category, min_players, max_players, playing_time, age, complexity, description, game_id, bufferBase64, function (err, result) {
        if (err)
            res.render('admin', {
                errors: ["ERROR occurred while updating the Game!"],
                games: []
            });
        if (result) {
            res.redirect('/admin')
        }
    });
}

function addGame(req, res) {
    console.log(req.body)
    var game = req.body;
    var title = game.title;
    var category = game.category;
    var min_players = game.min_players;
    var max_players = game.max_players;
    var playing_time = game.playing_time;
    var age = game.age;
    var complexity = game.complexity;
    var description = game.description;
    Games.asd.addGame(title, category, min_players, max_players, playing_time, age, complexity, description, function (err, result) {
        if (err) {
            console.log(err)
            res.render('admin', {
                errors: ["ERROR occurred while adding Game!"],
                games: []
            });
        }
        if (result) {
            res.redirect('/admin')
        }
    });
}

function updateGame(req, res) {
    var id = req.params.id;
    Games.asd.getGameById(id, function (err, result) {
        if (err)
            res.render('admin', {
                errors: ["ERROR occurred while updating Game!"],
                games: []
            });
        if (result) {
            res.render('editGame', {
                game: result,
                _method: "PATCH",
                id: result.game_id
            })
        }
    });
}

function getAllGames(req, res) {
    Games.asd.getAllGames(function (err, results) {
        if (err)
            res.render('admin', {
                errors: ["ERROR occurred while getting Games from DB!"],
                games: []
            });
        if (results) {
            res.render('admin', {
                games: results
            })
        }
    });
}

function getAllUsers(req, res) {
    Users.asd.getAllUsers(function (err, results) {
        if (err)
            res.render('admin', {
                errors: ["ERROR occurred while getting Users from DB!"],
                games: []
            });
        if (results) {
            res.render('users', {
                users: results
            })
        }
    });
}

module.exports = router;