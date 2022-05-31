var Users = require("../../models/users")
const { getUsersOrUsersByParams } = require("../../utils/DAO/queries")

const getUsers = async (req, res, next) => {

    try {
        const users = await getUsersOrUsersByParams();
        return res.status(200).json(users)
    } catch (error) {
        throw error;
    }

}

const getUser = async (req, res, next) => {

    try {
        const user = await Users.findById(req.params.id, "_id name lastname email username createdOn updateAt role").exec();
        return res.status(200).json(user)
    } catch (error) {
        return res.sendStatus(404)
    }
}

exports.getUser = getUser;
exports.getUsers = getUsers;


