var Users = require("../../models/users");
const { getUsersOrUsersByParams } = require("../../utils/DAO/queries");


const deleteUser = async (req, res, next) => {

    try {
        await Users.deleteOne({ _id: req.params.id });        
        const users =  await getUsersOrUsersByParams();
        return res.status(200).send(users)
    } catch (error) {
        return res.sendStatus(500);
    }
}

const deleteAllUsers = async (req, res, next) => {
    
    try{
        const users =  await Users.find({}, "email");
        const match = users.find(user => user.email === "superadmin@gmail.com");
        const ids = users.filter(user => user.id !== match.id).map(user => user.id);

        if(ids.length >= 1){
            ids.forEach( async (id) => {
                try {
                    await Users.deleteOne({ _id: id });
                    return res.sendStatus(200);
                } catch (error) {
                    return res.sendStatus(500);
                }
            })
        }else{
            return res.sendStatus(200);
        }
        
    } catch (error) {
        return res.sendStatus(500);
    }
}

exports.deleteUser = deleteUser;
exports.deleteAllUsers = deleteAllUsers;





