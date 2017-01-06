'use strict'
const config = require('./config');
const Hapi = require('hapi');

const Good = require('good');
var routes = require('./routes');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: config.server.host,
    port: config.server.port,
    routes: {
        cors: true
    }

});

server.route(routes);

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