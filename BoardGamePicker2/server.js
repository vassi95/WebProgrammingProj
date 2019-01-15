const express = require('express');
const app = express();
const bdParser = require('body-parser');
const methodOverride = require('method-override');
const fs = require('fs');
const path = require('path');
const port = 4300;

app.use(bdParser.json());
app.use(bdParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('styles'));
app.use(express.static('helpers'));

//Initialize DB
var sqlSchemaUsers = fs.readFileSync('./db/app-schema-users.sql').toString();
var sqlSchemaGames = fs.readFileSync('./db/app-schema-games.sql').toString();
var sqlSchemaUsersGames = fs.readFileSync('./db/app-schema-users-games.sql').toString();

app.all('/', (req, res, next) => {
    res.render('index', {
        errors: [""]
    });
});

app.use('/', require('./routes/login'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/admin'));
app.use('/', require('./routes/user'));

app.all('*', (req, res) => {
    res.status(404)
    res.format({
        html: () => { res.render('404', {}) },
        'application/json': () => { res.json({ status: '404 Not Found' }) }
    })
});

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'my-db.cvnxbpfneqqj.eu-central-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'my_db'
});

connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected!:)');
    }
});

connection.query(sqlSchemaUsers);
connection.query(sqlSchemaGames);
connection.query(sqlSchemaUsersGames);


app.listen(port, () => {
    console.log('Backend NodeJS listening on ' + port);
});

require('./models/users').connection(connection);
require('./models/games').connection(connection);