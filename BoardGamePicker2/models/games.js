var connect;
module.exports.connection = function (conn) {
    connect = conn;
}
module.exports.asd = {
    getAllGames(callback) {
        var sql = "SELECT * FROM games";
        connect.query(sql, function (err, results) {
            if (err) {

                callback(err, null);
            }
            else {
                callback(null, results);
            }
        });
    },

    updateGame(title, category, min_players, max_players, playing_time, age, complexity, description, game_id, image, callback) {
        var sql = "update games set title = ?, category = ?, min_players = ?, max_players = ?, playing_time = ?, age = ?, complexity = ?, description = ?, image = '" + image + "' where game_id = ?;";
        var values = [title, category, min_players, max_players, playing_time, age, complexity, description, game_id];
        connect.query(sql, values, function (err, result) {
            if (err) {

                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    },

    removeGameFromFavList(gameId, userId, callback) {
        var sql = "DELETE FROM users_games WHERE users_games.game_id = ? and users_games.user_id = ?";
        connect.query(sql, [gameId, userId], function (err, result) {
            if (err) {

                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    },

    deleteGame(id, callback) {
        var sql = "DELETE FROM games WHERE games.game_id = ?";
        connect.query(sql, [id], function (err, result) {
            if (err) {
                console.log(err)
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    },

    addGame(title, category, min_players, max_players, playing_time, age, complexity, description, callback) {
        var sql = "insert into games (title, category, min_players, max_players, playing_time, age, complexity, description) VALUES  (?, ?, ?, ?, ?, ?, ?, ?);";

        var values = [title, category, min_players, max_players, playing_time, age, complexity, description];
        connect.query(sql, values, function (err, result) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    },

    getGameById(id, callback) {
        var sql = "SELECT * FROM games where game_id = ?";
        connect.query(sql, [id], function (err, results) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, results[0]);
            }
        });
    },

    addGameToFavList(user_id, game_id, callback) {
        var sql = `insert into users_games (user_id, game_id) VALUES (?, ?);`;
        connect.query(sql, [user_id, game_id], function (err, result) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    }
}