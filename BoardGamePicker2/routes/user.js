const router = require('express').Router();
const Users = require('./../models/users');
const Games = require('./../models/games');

router.get('/api/user/profile/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    getUserProfile(req, res);
});

router.get('/user/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    goToUserHome(req, res);
});

router.get('/api/game/show/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    showGameInfo(req, res);
});

router.delete('/api/user/:userId/game/delete/:gameId', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    deleteGameFromFavourites(req, res);
});

router.get('/api/games/pickrandom/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    pickRandomGame(req, res);
});

router.get('/api/games/filter/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    navigateToFilteringGames(req, res);
});

router.post('/api/games/getfiltered/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var game = req.body;
    var title = game.title;
    var category = game.category;
    var min_players = game.min_players;
    var max_players = game.max_players;
    var age = game.age;
    var complexity = game.complexity;
    filterOutGames(title, category, min_players, max_players, age, complexity, req, res);
});

router.post('/api/user/:userId/favourites/add/:gameId', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    addToFavourites(req, res);
});

function filterOutGames(title, category, min_players, max_players, age, complexity, req, res) {
    var get = require('get-parameter-names')
    var parameters = get(filterOutGames);
    var userId = req.params.id;
    Users.asd.getGamesByFiltering(arguments, parameters, function (err, results) {
        if (err)
            res.redirect('/user/' + userId)
        if (results) {
            res.render('pickedGames', {
                games: results,
                userId: userId
            })
        }
    });
}

function addToFavourites(req, res) {
    var gameId = req.params.gameId;
    var userId = req.params.userId;
    Games.asd.addGameToFavList(userId, gameId, function (err, result) {
        if (err)
            res.redirect('/user/' + userId)
        if (result) {
            res.redirect("/api/user/profile/" + userId);
        }
    });
}

function navigateToFilteringGames(req, res) {
    var userId = req.params.id;
    res.render('filterGames', {
        userId: userId
    });
}

function pickRandomGame(req, res) {
    var id = req.params.id;
    Users.asd.getRandomGame(function (err, result) {
        if (err)
            res.redirect('/user/' + userId)
        if (result) {
            res.render('pickedGames', {
                games: [result],
                userId: id
            })
        }
    });
}

function deleteGameFromFavourites(req, res) {
    var gameId = req.params.gameId;
    var userId = req.params.userId;
    Games.asd.removeGameFromFavList(gameId, userId, function (err, result) {
        if (err)
            res.redirect('/user/' + userId)
        if (result) {
            res.redirect("/api/user/profile/" + userId);
        }
    });
}


function showGameInfo(req, res) {
    var id = req.params.id;
    Games.asd.getGameById(id, function (err, result) {
        if (err)
            res.redirect('/user/' + userId)
        if (result) {
            res.render('gameInfo', {
                game: result
            })
        }
    });
}

function getUserProfile(req, res) {
    var id = req.params.id;
    Users.asd.findUserById(id, function (err, result) {
        if (err)
            res.redirect('/user/' + id)
        if (result) {
            Users.asd.getFavGames(result.user_id, function (err, games) {
                if (err)
                    res.redirect('/user/' + id)
                if (games) {
                    res.render('userProfile', {
                        user: result,
                        games: games
                    })
                }
            })
        }
    });
}

function goToUserHome(req, res) {
    var id = req.params.id;
    Users.asd.findUserById(id, function (err, result) {
        if (err)
            res.redirect('/user/' + userId)
        if (result) {
            res.render('user', {
                user: result
            })
        }
    });
}
module.exports = router;