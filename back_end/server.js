'use strict'

const Hapi = require('hapi');
const mongoskin = require('mongoskin');
const Good = require('good');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000,
    routes: {
        cors: true
    }

});



const db = mongoskin.db('mongodb://@localhost:27017/oussouss', { safe: true })
const id = mongoskin.helper.toObjectID

const sequenceName = "memberid";

let loadCollection = function (name, callback) {
    callback(db.collection(name))
}

server.route([
    {
        method: 'GET',
        path: '/{collectionName}',
        handler: function (req, reply) {
            loadCollection(req.params.collectionName, function (collection) {
                collection.find().toArray(function (e, results) {
                    if (e) return reply(e);
                    reply(results);
                })
            })
        }
    },
    {
        method: 'GET',
        path: '/{collectionName}/{id}',
        handler: function (req, reply) {
            loadCollection(req.params.collectionName, function (collection) {
                collection.findOne({ memberId: +req.params.id }, function (e, result) {
                    if (e) return reply(e);
                    reply(result);
                })
            })
        }
    },
    {
        method: 'POST',
        path: '/{collectionName}',
        handler: function (req, reply) {
            loadCollection(req.params.collectionName, function (collection) {

                //retourner l'id Max de la table membre
                collection.find().sort({ memberId: -1 }).limit(1).toArray(function (e, results) {
                    let member = {
                        memberId : 1 + results[0].memberId,
                        name : req.payload.name
                    };
                    collection.insert(member, {}, function (e, results) {
                        if (e) return reply(e)
                        reply(member);
                    })
                });


            })
        }
    },
    {
        method: 'PUT',
        path: '/{collectionName}/{id}',
        handler: function (req, reply) {
            loadCollection(req.params.collectionName, function (collection) {
                let member = {
                    name: req.payload.name
                };
                collection.update({ memberId: +req.params.id },
                    { $set: member },
                    { safe: true, multi: false }, function (e, result) {

                        if (e) return reply(e)
                        reply((result === 1) ? { msg: 'success' } : { msg: 'error' })
                    })
            })
        }
    },
    {
        method: 'DELETE',
        path: '/{collectionName}/{id}',
        handler: function (req, reply) {
            loadCollection(req.params.collectionName, function (collection) {
                collection.remove({ memberId: +req.params.id }, function (e, result) {
                    if (e) return reply(e)
                    reply((result === 1) ? { msg: 'success' } : { msg: 'error' })
                })
            })
        }
    }
])

server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    server.log('Server running at:', server.info.uri);
});
});