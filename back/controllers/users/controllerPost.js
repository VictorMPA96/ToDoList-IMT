var Users = require("../../models//users")
const { createDefaultUsername } = require("../../utils/functions")
const bcrypt = require('bcrypt');
const saltRounds = 10;
var moment = require('moment'); // require
moment().format();

const createBase = async (user, name, lastname, email, password, username) => {
    user.username = username === undefined
        ? createDefaultUsername(lastname, name)
        : username.trim()
    ;
    user.name = name.trim();
    user.lastname = lastname.trim();
    user.email = email.trim();
    user.password = await bcrypt.hash(password, saltRounds);
    user.createdOn = new Date();

    return user;
}

const sendUser = async (req, res, next) => {

    try {
        const users = await Users.find({}, "username email");        

        const checkUsername = (username) => {
            let currentUsername = username;

            if (!req.body.username) {
                
                let pass = false;

                while (!pass) {
                    const match = users.find(user => user.username === currentUsername);
                    if (match) {
                        let extra = "_" + Math.floor(Math.random() * 1000).toString();

                        currentUsername = currentUsername.split("_");
                        currentUsername = currentUsername[0] + "_" + currentUsername[1];
                        currentUsername = currentUsername + extra;
                    } else {
                        pass = true;
                    }
                }

                return currentUsername;

            } else {
                const match = users.find(user => user.username === currentUsername);

                if (match) {
                    return "CONFLICT-TAKEN_USERNAME";
                } else {
                    return currentUsername;
                }
            }
        }

        let username = req.body.username === undefined
            ? checkUsername(createDefaultUsername(req.body.lastname, req.body.name))
            : checkUsername(req.body.username)
        ;

        if(username === "CONFLICT-TAKEN_USERNAME"){return res.sendStatus(409)};

        const match = users.find(user => user.email === req.body.email);

        if (match) {
            return res.sendStatus(409);
        } 

        const user = await createBase(req.body, req.body.name, req.body.lastname, req.body.email, req.body.password, username);
        let userCreate = await Users.create(user);

        const customParams = {
            _id: userCreate._id,
            name: userCreate.name,
            lastname: userCreate.lastname,
            email: userCreate.email,
            username: userCreate.username,
            role: userCreate.role,
            createdOn: userCreate.createdOn
        }

        return res.status(201).json(customParams);


    } catch (error) {
        return res.sendStatus(500)
    }
}


exports.sendUser = sendUser;


