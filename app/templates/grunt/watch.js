module.exports = {
    options: {
        spawn: false,
        interrupt: true
    },
    bower: {
        files: ['bower.json'],
        tasks: ['build:bower']
    },
    components: {
        files: ['browser/custom_components/**/*'],
        tasks: [
            'newer:jshint:components',
            'newer:jscs:components',
            'build:components'
        ]
    },
    media: {
        files: ['browser/media/**/*'],
        tasks: ['build:media']
    },
    node: {
        options: {
            reload: true
        },
        files: [
            'gruntfile.js',
            'grunt/*.js',
            'server/**/*.js'
        ],
        tasks: [
            'express:developer:stop',
            'newer:jshint:node',
            'newer:jscs:node',
            'build:node',
            'express:developer'
        ]
    },
    // On changing SASS Partials, rebuild all SCSS files.
    scss: {
        files: ['browser/stylesheets/scss/*.scss'],
        tasks: ['sass']
    },
    views: {
        files: [
            'browser/*.html',
            'browser/stylesheets/*.scss',
            'browser/scripts/*.js'
        ],
        tasks: [
            'newer:jshint:views',
            'newer:jscs:views',
            'build:views'
        ]
    },
    test: {
        files: [
            'browser/test/**/*'
        ],
        tasks: [
            'newer:jshint:test',
            'newer:jscs:test',
            'build:test'
        ]
    }
};
