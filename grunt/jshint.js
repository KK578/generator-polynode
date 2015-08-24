module.exports = {
    options: {
        jshintrc: true
    },
    generator: {
        files: [
            {
                expand: true,
                src: [
                    'gruntfile.js',
                    'grunt/*.js',
                    'test/*_test.js'
                ]
            }
        ]
    },
    app: {
        files: [
            {
                expand: true,
                cwd: 'app/',
                src: [
                    '**/*.js',
                    '!**/bower_components/**/*',
                    '!**/build/**/*',
                    '!**/node_modules/**/*'
                ]
            }
        ]
    },
    element: {
        files: [
            {
                expand: true,
                cwd: 'element/',
                src: ['**/*.js']
            }
        ]
    },
    page: {
        files: [
            {
                expand: true,
                cwd: 'page/',
                src: ['**/*.js']
            }
        ]
    }
};
