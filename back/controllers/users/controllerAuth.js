var Users = require("../../models//users");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var moment = require('moment');
moment().format(); 

const loginUser = async (req, res, next) => {

    try {
        const user = await Users.findOne({ email: req.body.email }, 'name email password');
        if (!user) {
            return res.sendStatus(401);
        }

        const result = await bcrypt.compare(req.body.password, user.password);
        
        if (result) {
            const login = {
                sub: moment().unix(),
                idUser: user.id,
                iat: moment().add(10, "hours").unix()
            }
            
            const token = jwt.sign(login, 'secretkey');   
            
            return res.json({token});
        } else {
            return res.sendStatus(401);
        }

    } catch (error) {
        return res.sendStatus(500);
    }
}

exports.loginUser = loginUser;