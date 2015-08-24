var path = require('path');
var fs = require('fs');
var glob = require('glob');
var crypto = require('crypto');

module.exports = function (grunt) {
    var logHeader = grunt.log.header;
    grunt.log.header = function (message) {
        if (!/newer(-postrun)?:/.test(message)) {
            logHeader.apply(this, arguments);
        }
    };

    require('time-grunt')(grunt);

    require('load-grunt-config')(grunt, {
        jitGrunt: {
            staticMappings: {
                bower: 'grunt-bower-task',
                express: 'grunt-express-server',
                inline: 'grunt-inline-alt',
                minifyPolymer: 'grunt-minify-polymer',
                minifyPolymerCSS: 'grunt-minify-polymer'
            }
        }
    });

    grunt.registerTask('serviceWorker', 'Creates cache config for Service Worker', function () {
        var done = this.async();

        var pkg = grunt.file.readJSON('package.json');

        var directory = 'build/public/';
        var config = {
            cacheId: pkg.name,
            disabled: false
        };

        // Find all files in the public directory to add to cache.
        glob('**/*.*', { cwd: directory }, function (err, files) {
            if (err) {
                throw err;
            }

            config.precache = files;

            // Cache Checksum
            var checkSum = crypto.createHash('md5');
            checkSum.update(JSON.stringify(config.precache));
            config.precacheFingerprint = checkSum.digest('hex');

            // Save cache-config.json.
            var configDirectory = path.join(directory, 'cache-config.json');
            fs.writeFile(configDirectory, JSON.stringify(config), function () {
                // Create sw-import.js for use by Service Worker.
                var swImport = 'importScripts(\'bower_components/platinum-sw/service-worker.js\');';
                fs.writeFile(path.join(directory, 'sw-import.js'), swImport, function () {
                    grunt.log.ok('ServiceWorker configs successfully generated.');
                    done();
                });
            });
        });
    });

    grunt.registerTask('WCTSuite', 'Creates suite.js for loading WCT Tests', function () {
        var done = this.async();
        var directory = 'build/public/test/';

        glob('**/*/*.html', { cwd: directory }, function (err, files) {
            if (err) {
                throw err;
            }

            var filePath = path.join(directory, 'suite.js');
            var file = 'WCT.loadSuites(' + JSON.stringify(files) + ');';

            fs.writeFile(filePath, file, function (err) {
                if (err) {
                    throw err;
                }

                var message = files.length + ' ' +
                    grunt.util.pluralize(files.length, 'test/tests') +
                    ' loaded into WCT Suite.';
                grunt.log.ok(message);

                done();
            });
        });
    });
};
