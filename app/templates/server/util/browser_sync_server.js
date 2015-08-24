var fs = require('fs');
var browserSync = require('browser-sync');
var util = require('./util.js');

function handleCustomElement(event, file) {
    var browserSyncInstance = browserSync.get('Server');
    var directories = file.split(/[\\\/]/);
    var element = directories[directories.length - 2];

    fs.readFile(file, { encoding: 'utf-8' }, function (err, css) {
        if (err) {
            throw err;
        }

        var scopedCss = util.polymer.styleTransformer.css(css, element);

        var details = {
            element: element,
            style: scopedCss
        };

        browserSyncInstance.sockets.emit('custom-component-css', details);
    });
}

module.exports = function (server, environment) {
    if (environment === 'developer') {
        var browserSyncInstance = browserSync.create('Server');

        // Run async to allow for app to prepare server.
        process.nextTick(function () {
            // Proxy BrowserSync through the node server.
            var port = 3000;
            var proxy = 'localhost:' + parseInt(server.get('port'));

            browserSyncInstance.init({
                files: [
                    {
                        match: ['build/public/custom_components/**/*.css'],
                        fn: handleCustomElement
                    },
                    {
                        match: [
                            'build/public/',
                            '!build/public/custom_components/**/*.css'
                        ]
                    }
                ],
                logPrefix: 'BrowserSync',
                minify: true,
                open: false,
                reloadOnRestart: true,
                server: false,
                port: port,
                proxy: proxy
            });

            console.log('[BrowserSync] Loading');
        });
    }
};
