let config = {};
config.server = {};
config.server.db = {};

//Server Config
config.server.host = 'localhost';
config.server.port = 8000;

//DataBase Config
config.server.db.url = 'mongodb://@localhost:27017/oussouss';

module.exports = config;