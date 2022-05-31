var jwt = require('jsonwebtoken');
var moment = require('moment');
moment().format();
var Users = require("../../models/users");

exports.isNotAuthenticated = async (req, res, next) => {

    try {
        const token = req.get("X-Session-Token");

        const decoded = jwt.verify(token, 'secretkey');

        const currentDate = new Date();

        let { iat } = decoded;
        iat = new Date(iat * 1000);

        if (currentDate >= iat) {
            return res.status(401).json({ tokenStatus: "Expired" });
        }

        const { idUser } = decoded;

        const user = await Users.findById(idUser);

        decoded.role = user.role;
        decoded.name = user.name;
        decoded.lastname = user.lastname;
        decoded.email = user.email;

        req.decoded = decoded;

        return next();

    } catch (error) {
        return res.sendStatus(401);
    }
};




