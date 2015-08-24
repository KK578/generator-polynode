module.exports = {
    bower: {
        files: [
            {
                expand: true,
                cwd: 'browser/bower_components/',
                src: [
                    '**/*.min.js',
                    'sw-toolbox/sw-toolbox.js',
                    '!**/{gruntfile,gulpfile}.js',
                    '!**/{demo,demos,docs,explainer,node_modules,test,tests}/**/*'
                ],
                dest: 'build/public/bower_components/'
            }
        ]
    },
    wct: {
        files: [
            {
                expand: true,
                cwd: 'browser/test/',
                src: ['**/*'],
                dest: 'build/public/test/'
            }
        ]
    }
};
