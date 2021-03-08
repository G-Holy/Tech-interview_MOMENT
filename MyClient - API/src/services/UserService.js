const bcrypt            = require("bcryptjs");
const config            = require("../../config/index");
const jwt               = require("jsonwebtoken");
const MongooseService   = require("./db/MongooseService");
const UserModel         = require("../models/User");

/**
 * Class qui encapsule la Business Logic du model User
 * 
 * @property {object} MongooseServiceInstance - Instance de la class d'abstraction de communication avec BDD
 */
class UserService {
    
    constructor() {
        this.MongooseServiceInstance = new MongooseService(UserModel);
    }

    /**
     * Crée un nouvel utilisateur de l'application
     * 
     * @param {object} userData - Les informations de l'utilisateur à créer
     * @param {string} userData.email - Email
     * @param {string} userData.password - Mot de passe
     * @param {string} userData.firstname - Prénom
     * @param {string} userData.lasttname - Nom
     * @returns {Object} - L'objet de réponse avec un JWT
     */
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

    /**
     * Connecte un utilisateur existant
     * 
     * @param {string} email - Email de l'utilisateur
     * @param {string} password - Mot de passe de l'utilisateur
     * @returns {Object} - L'objet de réponse avec un JWT
     */
    async login({ email, password }) {
        const user = await this.MongooseServiceInstance.findOne({ email });
        
        if (!user || !bcrypt.compareSync(password, user.password))
            throw ({ status: 403, message: "You have entered an invalid username or password" });

        var token = jwt.sign({ id:user._id }, config.secret);
        return { success: true, token };
    }

    /**
     * Récupère les information de l'utilisateur connecté
     * 
     * @param {string} _id - id dans le BDD de l'utilisateur
     * @returns {Object} - L'objet de réponse avec les informations personelles de l'utilisateur
     */
    async getLoggedUser(_id) {
        const {email, firstname, lastname} = await this.MongooseServiceInstance.findOne({ _id });
        const user =  {email, firstname, lastname };
        
        return { success: true, user };
    }
}

module.exports = UserService;