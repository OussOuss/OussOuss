'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000,
    routes: {
        cors: true
    }

});

const mongoskin = require('mongoskin');

const db = mongoskin.db('mongodb://@localhost:27017/oussouss', { safe: true })
const id = mongoskin.helper.toObjectID

const sequenceName = "memberid";

let loadCollection = function (name, callback) {
    callback(db.collection(name))
}

let getMaxId = function (collectionName) {
    loadCollection(collectionName, function (collection) {
        return collection.find().sort({id:-1}).limit(1);
    });
}

server.route([
    {
        method: 'GET',
        path: '/{collectionName}',
        handler: function (req, reply) {
            loadCollection(req.params.collectionName, function (collection) {
                collection.find({ _id: { $ne: sequenceName } }).toArray(function (e, results) {
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
                collection.find({ _id: +req.params.id }).toArray(function (e, result) {
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
                let member = {
                    id:getMaxId(req.params.collectionName),
                    name:req.name
                };
                console.log(member.id);
                collection.insert(member, {}, function (e, results) {
                    if (e) return reply(e)
                    reply(member);
                })
            })
        }
    },
    {
        method: 'PUT',
        path: '/{collectionName}/{id}',
        handler: function (req, reply) {
            loadCollection(req.params.collectionName, function (collection) {
                collection.update({ _id: id(req.params.id) },
                    { $set: req.payload },
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
                collection.remove({ _id: id(req.params.id) }, function (e, result) {
                    if (e) return reply(e)
                    reply((result === 1) ? { msg: 'success' } : { msg: 'error' })
                })
            })
        }
    }
])


let options = {
    subscribers: {
        'console': ['ops', 'request', 'log', 'error']
    }
};

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});