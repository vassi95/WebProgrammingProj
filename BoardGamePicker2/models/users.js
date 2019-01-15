const bcrypt = require('bcryptjs');
var connect;
module.exports.connection = function (conn) {
    connect = conn;
}
module.exports.asd = {


    createUser(firstName, lastName, username, email, password, userRole, callback) {
        var sql = `insert into users (first_name, last_name, username, email, user_password, user_role) 
        VALUES (?, ?, ?, ?, ?, ?);`;
        var values = [firstName, lastName, username, email, password, userRole];

        connect.query(sql, values, function (err, result) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    },

    findUserById(id, callback) {
        var sql = "SELECT * FROM my_db.users where user_id = ?";
        connect.query(sql, [id], function (err, results) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, results[0]);
            }
        });
    },

    getAllUsers(callback) {
        var sql = "SELECT * FROM users";
        connect.query(sql, function (err, results) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, results);
            }
        });
    },

    findUser(username, callback) {
        var sql = "SELECT * FROM my_db.users where username = ?";
        connect.query(sql, [username], function (err, results) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, results[0]);
            }
        });
    },

    updateUser(userRole, id, callback) {
        var sql = "UPDATE my_db.users SET user_role = ? WHERE user_id = ?";
        connect.query(sql, [userRole, id], function (err, result) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    },

    generateHash(password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    },

    isValidPassword(password, passFromDb) {
        return bcrypt.compareSync(password, passFromDb);
    },

    getFavGames(id, callback) {
        var sql = "SELECT * FROM games LEFT JOIN users_games ON users_games.game_id = games.game_id WHERE users_games.user_id = ? ";
        connect.query(sql, [id], function (err, results) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, results);
            }
        });
    },

    getRandomGame(callback) {
        var sql = "SELECT * FROM games ORDER BY rand() LIMIT 1";
        connect.query(sql, function (err, results) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, results[0]);
            }
        });
    },

    getGamesByFiltering(args, params, callback) {
        var replaceLast = require('replace-last');

        var sql = "SELECT * FROM games where ";
        for (var i = 0, j = args.length - 2; i < j; i++) {
            if (args[i]) {
                sql += (params[i] + " = '" + args[i] + "'" + " and ");
            }
        }
        if (sql.endsWith("where ")) {
            sql = replaceLast(sql, " where ", "");
        }
        connect.query(replaceLast(sql, " and ", ""), function (err, results) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, results);
            }
        });
    }
}