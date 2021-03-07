const UserService = require("../services/UserService");
const UserServiceInstance = new UserService();

exports.registerUser = async (req, res, next) => {
    try {
        let userData = { ...req.body };

        const createUser = await UserServiceInstance.create(userData);
        return res.send(createUser);
    } catch (e) {
        next(e);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        let userData = { ...req.body };

        const logUser = await UserServiceInstance.login(userData);
        return res.send(logUser);
    } catch (e) {
        next(e);
    }
};

exports.getAuthenticatedUser = async (req, res, next) => {
    try {
        const loggedUser = await UserServiceInstance.getLoggedUser(req.userId);
        return res.send(loggedUser);
    } catch (e) {
        next(e);
    }
};

exports.logoutUser = (req, res, next) => {
    return res.send({success: true, message:"you have been successfully logged out"});
};