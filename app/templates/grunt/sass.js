module.exports = {
    options: {
        sourceMap: false,
        outputStyle: 'compressed'
    },
    components: {
        files: [
            {
                expand: true,
                cwd: 'browser/custom_components/',
                src: ['**/*.scss'],
                ext: '.css',
                dest: 'build/public/custom_components/'
            }
        ]
    },
    views: {
        files: [
            {
                expand: true,
                cwd: 'browser/stylesheets/',
                src: ['*.scss'],
                ext: '.css',
                dest: 'build/public/stylesheets/'
            }
        ]
    }
};
