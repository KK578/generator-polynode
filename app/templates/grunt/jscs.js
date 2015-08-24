module.exports = {
    options: {
        config: '.jscsrc'
    },
    components: {
        src: ['browser/custom_components/**/*.js']
    },
    node: {
        src: [
            'gruntfile.js',
            'grunt/*.js',
            'server/**/*.js'
        ]
    },
    views: {
        src: ['browser/scripts/*.js']
    },
    test: {
        src: ['browser/test/**/*.js']
    }
};
