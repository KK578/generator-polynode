var express = require('express');

function initialise(server, environment) {
    var util = require('./util/util.js');

    util.setup(server);
    util.logger(server, environment);
    util.router(server, environment);
    util.browserSync(server, environment);
}

module.exports = function (environment) {
    var server = express();
    initialise(server, environment);
    return server;
};
