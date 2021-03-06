const UserService = require("../services/UserService");
const UserServiceInstance = new UserService();
// Faire la validation avec joi
// Validation de la requete

//  POST auth/register
exports.registerUser = async (req, res, next) => {
    let userData = { ...req.body };
    // validation de la requete TODO

    try {
        const createUser = await UserServiceInstance.create(userData);
        return res.send(createUser);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.loginUser = async (req, res, next) => {
    let userData = { ...req.body };
    // validation de la requete TODO

    try {
        const logUser = await UserServiceInstance.login(userData);
        return res.send(logUser);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.logoutUser = (req, res, next) => {
    return res.send({success: true, message:"you have been successfully logged out"});
};

exports.getAuthenticatedUser = async (req, res, next) => {
    const loggedUser = await UserServiceInstance.getLoggedUser(req.userId);
    return res.send(loggedUser);
};