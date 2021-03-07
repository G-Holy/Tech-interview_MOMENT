// BUSINESS LOGIC
// BUSINESS VALIDATION
// PAS DE REQ NI RES QUE DE LA DATA PROPRE
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MongooseService = require("./db/MongooseService");
const UserModel = require("../models/User");
const config = require("../../config/index");

class UserService {
    
    constructor() {
        this.MongooseServiceInstance = new MongooseService(UserModel);
    }

    async create(userData) {
        let {email, password} = userData;
        
        const userExist = await this.MongooseServiceInstance.findOne({ email });
        if (userExist)
            throw ({ status:409, message: "This email is already registered" });

        userData.password = bcrypt.hashSync(password, 8);
        const newUser = await this.MongooseServiceInstance.create(userData);
        var token = jwt.sign({ id: newUser._id}, config.secret);
            
        return { success: true, token };      
    }

    async login({ email, password }) {
        const user = await this.MongooseServiceInstance.findOne({ email });
        
        if (!user || !bcrypt.compareSync(password, user.password))
            throw ({ status: 403, message: "You have entered an invalid username or password" });

        var token = jwt.sign({ id:user._id }, config.secret);
        return { success: true, token };
    }

    async getLoggedUser(_id) {
        const {email, firstname, lastname} = await this.MongooseServiceInstance.findOne({ _id });
        const data =  {email, firstname, lastname };
        
        return { success: true, data };
    }
}

module.exports = UserService;