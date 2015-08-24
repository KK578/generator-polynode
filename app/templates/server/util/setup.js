var path = require('path');

module.exports = function (server) {
    // Renderer
    var ejs = require('ejs');
    // Views are in root directory of web files.
    server.set('views', path.join(__dirname, '/../public/'));
    server.engine('html', ejs.renderFile);
    server.set('view engine', 'html');

    // GZIP
    var compression = require('compression');
    server.use(compression());
};
