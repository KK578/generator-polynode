module.exports = function (server, environment) {
    var morgan = require('morgan');

    switch (environment) {
        case 'developer':
            server.use(morgan('dev', {
                skip: function (req, res) {
                    // True if requesting a bower_component.
                    var bower = req.originalUrl.indexOf('bower') !== -1;
                    // True is it is an error code.
                    var err = res.statusCode >= 400;

                    // Skip if request is a bower_component unless an error occurs.
                    return bower && !err;
                }
            }));
            break;

        case 'production':
            server.use(morgan('tiny'));
            break;
    }
};
