module.exports = {
    options: {
        mangle: {},
        screwIE8: true
    },
    bower: {
        files: [
            {
                expand: true,
                cwd: 'browser/bower_components/',
                src: [
                    '**/*.js',
                    '!sw-toolbox/sw-toolbox.js',
                    '!async/support/sync-package-managers.js',
                    '!**/*.min.js',
                    '!**/{gruntfile,gulpfile}.js',
                    '!**/{demo,demos,docs,explainer,node_modules,test,tests}/**/*'
                ],
                dest: 'build/public/bower_components/'
            }
        ]
    },
    components: {
        files: [
            {
                expand: true,
                cwd: 'browser/custom_components/',
                src: ['**/*.js'],
                dest: 'build/public/custom_components/'
            }
        ]
    },
    node: {
        files: [
            {
                expand: true,
                cwd: 'server/',
                src: ['**/*.js'],
                dest: 'build/'
            }
        ]
    },
    views: {
        files: [
            {
                expand: true,
                cwd: 'browser/scripts/',
                src: ['*.js'],
                dest: 'build/public/scripts/'
            }
        ]
    }
};
