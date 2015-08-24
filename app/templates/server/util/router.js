var path = require('path');
var express = require('express');
var fs = require('fs');

function injectBrowserSync(req, res) {
    function injectScript(data) {
        var script = '<script src="scripts/browser_sync_client.js" async></script>';
        // Find the last </body> tag and prepend the script.
        return data.replace(/<\/body>(?![\s\S]*<\/body>)/i, script + '</body>');
    }

    function injectCss(data) {
        var css = '<style>#__bs_notify__{' +
            'font-family:"Roboto","Noto",sans-serif !important;' +
            'max-width:50%;}</style>';
        // Find the last </head> tag and prepend the style tag.
        return data.replace(/<\/head>(?![\s\S]*<\/head>)/i, css + '</head>');
    }

    // Read content of index.html
    var indexPath = path.join(__dirname, '/../public/index.html');
    fs.readFile(indexPath, { encoding: 'utf-8' }, function (err, data) {
        if (err) {
            throw err;
        }

        var indexHtml = data;
        indexHtml = injectScript(indexHtml);
        indexHtml = injectCss(indexHtml);

        res.send(indexHtml);
    });
}

module.exports = function (server, environment) {
    if (environment === 'developer') {
        // Inject BrowserSync handler for custom_components.
        server.get('/', injectBrowserSync);
        // Provide an access route to demo pages in development
        server.use('/bower', express.static(
            path.join(__dirname, '/../../browser/bower_components/'))
        );
    }

    // Serve static HTML
    server.use('/', express.static(path.join(__dirname, '/../public/')));

    // 404 Route
    server.use('*', function (req, res) {
        res.status(404).render(path.join(__dirname, '/../public/404.html'));
    });
};
