/*jshint esversion: 6 */


var mongoClient = require('mongodb').MongoClient;
var mongoDbUrl = 'mongodb://localhost:27017/airtel_money';

class DBConnection {
    connect() {
        return mongoClient.connect(mongoDbUrl)
            .then(function(connection) {
                console.log("COnnect")
                return connection;
            }).catch(function(err) {
                console.log("ERROR WHILE CONNECTING TO DB");
            })
    }
};

module.exports = new DBConnection();