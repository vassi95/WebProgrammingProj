CREATE TABLE IF NOT EXISTS users_games (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    CONSTRAINT un UNIQUE (user_id, game_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(game_id) REFERENCES games(game_id),
    CONSTRAINT `users_games_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `users_games_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
