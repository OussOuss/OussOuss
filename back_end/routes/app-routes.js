const config = require('../config');
const mongoskin = require('mongoskin');

const db = mongoskin.db(config.server.db.url, { safe: true })

let loadCollection = function (name, callback) {
    callback(db.collection(name))
}

module.exports = [
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
];