class MongooseService {
    constructor (Model) {
        this.model = Model;
    }

    /**
     * Crée un nouveau document du model
     * 
     * @param {object} body - Objet contenant les informations pour créer le document
     * @returns {Promise} - Retourne le résultat de la requête
     */
    create(body) {
        return this.model.create(body);
    }

    /**
     * Compte le nombre de ressource répondant aux critères de la requête
     * 
     * @param {object} query - Critères de la requête
     * @returns {Promise} - Retourne le résultat de la requête
     */
    count(query) {
        return this.model.count(query).exec();
    }

    /**
     * Supprime une ressource existante du model
     * 
     * @param {string} id - ID de la ressource à supprimer
     * @returns {Promise} - Le résultat de la requête
     */
    delete(id) {
        return this.model.findByIdAndDelete(id).exec();
    }

    /**
     * Retrouve une seule ressource répondant aux critères de la requête
     * 
     * @param {object} query - Critères de la requête
     * @returns {Promise} - Le résultat de la requête
     */
    findOne(query) {
        return this.model
            .findOne(query)
            .exec();
    }
}

module.exports = MongooseService;