CREATE TABLE IF NOT EXISTS games( 
    game_id INTEGER PRIMARY KEY AUTO_INCREMENT, 
    title VARCHAR(100) NOT NULL , 
    category VARCHAR(50) NOT NULL , 
    min_players INT NOT NULL , 
    max_players INT NOT NULL , 
    playing_time INT NOT NULL , 
    age INT NOT NULL , 
    complexity INT NOT NULL , 
    description TEXT NOT NULL,
    image BLOB
);

