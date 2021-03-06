class MongooseService {
    constructor (Model) {
        this.model = Model;
    }

    /**
     * @description Create a new document on the Model
     * @param body {object} Body object to create the new document with
     * @returns {Promise} Returns the results of the query
     */
    create(body) {
        return this.model.create(body);
    }

    /**
     * @description Count the number of documents matching the query criteria
     * @param query {object} Query to be performed on the Model
     * @returns {Promise} Returns the results of the query
     */
    count(query) {
        return this.model.count(query).exec();
    }

    /**
     * @description Delete an existing document on the Model
     * @param id {string} ID for the object to delete
     * @returns {Promise} Returns the results of the query
     */
    delete(id) {
        return this.model.findByIdAndDelete(id).exec();
    }

    /**
     * @description Retrieve a single document from the Model with the provided query
     * @param query {object} Query to be performed on the Model
     * @returns {Promise} Returns the results of the query
     */
    findOne(query) {
        return this.model
            .findOne(query)
            .exec();
    }
}

module.exports = MongooseService;