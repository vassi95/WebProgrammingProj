const router = require('express').Router();
const Users = require('./../models/users');

router.post('/api/register/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    processUser("user", req, res);
});

router.post('/api/register/admin', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    processUser("admin", req, res);
});

function processUser(userType, req, res) {
    if (validateRequest(req, res))
        insertUser(userType, req.body, res);
}

function insertUser(userType, user, res) {
    var first_name = user.firstName;
    var last_name = user.lastName;
    var username = user.username;
    var email = user.email;
    var password = user.user_password;
    var confirmedPassword = user.confirmedPassword;
    var user_role = userType;
    var password_pattern = /[a-z0-9_]{3,10}/i;
    if (!password_pattern.test(password)) {
        res.render('index', {
            errors: ["Password does not fulfill the requiremens!"]
        });
    }

    if (confirmedPassword != password) {
        res.render('index', {
            errors: ["Passwords do not match!"]
        });
    }

    var hashedPassword = Users.asd.generateHash(password)
    var user = Users.asd.createUser(first_name, last_name, username, email, hashedPassword, user_role, function (err, games) {
        if (err)
            res.render('index', {
                errors: ["There is already a user registered with this e-mail or this username!"]
            });
        else
            if (user) {
                res.render('index', {
                    errors: [""]
                });
            }
    });
}

function validateRequest(req, res) {
    var fs = require('fs');
    var replaceLast = require('replace-last');
    var schema = JSON.parse(fs.readFileSync('db/user-schema.json', 'utf8'));

    var Validator = require('jsonschema').Validator;
    var v = new Validator();
    var instance = req.body;
    var r = v.validate(instance, schema);
    var valid = r.valid;
    if (!valid) {
        var validationErrors = r.errors;
        var errorMessages = [""];
        validationErrors.forEach(function (entry) {
            errorMessages.push(replaceLast(entry.stack, "instance.", ""));
        });
        res.render('index', {
            errors: errorMessages
        });
    }
    return valid;
};
module.exports = router;