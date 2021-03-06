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
        try {
            userData.password = bcrypt.hashSync(userData.password, 8);
            const newUser = await this.MongooseServiceInstance.create(userData);
            var token = jwt.sign({ id: newUser._id}, config.secret);
            
            return { success: true, token };
        } catch (e) {
            return  { success: false, error: e };
        }
    }

    async login({ email, password }) {
        try {
            const user = await this.MongooseServiceInstance.findOne({ email });
            var payload;

            //validation de user TODO
            if (bcrypt.compareSync(password, user.password)) {
                var token = jwt.sign({ id:user._id }, config.secret);
                payload = { success: true, token };    
            } else {
                payload = { success: false, error: "Incorrect password"}
            }
            return payload;
        } catch (e) {
            return  { success: false, error: e };
        }
    }

    async getLoggedUser(_id) {
        try {
            const {email, firstname, lastname} = await this.MongooseServiceInstance.findOne({ _id });
            const data =  {email, firstname, lastname };

            return { success: true, data };
        } catch (e) {
            return { success:false, error: e };
        }
    }
}

module.exports = UserService;