var Users = require("../../models/users")
const bcrypt = require('bcrypt');
const saltRounds = 10;

const updateUser = async (req, res, next) => {
    let match;
    try {
        const users = await Users.find({}, "username email");
        match = await Users.findById(req.params.id).exec();
        const request = req.body;
        const {idUser, role} = req.decoded;

        if (!request.id || request.id) {
            request.id = match.id;
        }

        if (request.name === undefined) {
            request.name = match.name;
        }else{
            if(role !== 1 && req.params.id !== idUser){
                request.name = match.name;
            }
        }

        if (request.lastname === undefined) {
            request.lastname = match.lastname;
        }else{
            if(role !== 1 && req.params.id !== idUser){
                request.lastname = match.lastname;
            }
        }

        if (request.username === undefined) {
            request.username = match.username;
        }else{

            if(role !== 1 && req.params.id !== idUser){
                request.username = match.username;
            }

            const match = users.find(user => user.username === request.username);

            if(match && match.id !== req.params.id){
                return res.sendStatus(409);         
            }
        }

        if (request.email === undefined) {
            request.email = match.email;
        }else{

            if(role !== 1 && req.params.id !== idUser){
                request.email = match.email;
            }
            const match = users.find(user => user.email === request.email);

            if(match && match.id !== req.params.id){
                return res.sendStatus(409);
            }
        }

        if (request.password === undefined) {
            request.password = await bcrypt.hash(match.password, saltRounds);
        }else{
            if(role !== 1 && req.params.id !== idUser){
                request.password = await bcrypt.hash(match.password, saltRounds);
            }else{
                request.password = await bcrypt.hash(request.password, saltRounds);
            }
        }

        if (request.role === undefined) {
            request.role = match.role;
        }else{
            if(role != 1){
                request.role = match.role;
            }
        }

        if (!request.createdOn || request.createdOn) {
            request.createdOn = match.createdOn;            
        }

        if (!request.updateAt || request.updateAt) {
            request.updateAt = new Date();
        }

        await Users.findByIdAndUpdate(req.params.id, request);
    
        const customParams = {
            _id: match._id,
            name: match.name,
            lastname: match.lastname,
            email: match.email,
            username: match.username,
            role: match.role,
            createdOn: match.createdOn,
            updateAt: match.updateAt
        }

        return res.status(200).send(customParams);

    } catch (error) {
        if(!match){
            return res.sendStatus(404);
        }
        return res.sendStatus(500);
    }
    
}

exports.updateUser = updateUser;



