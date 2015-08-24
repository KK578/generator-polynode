module.exports = {
    components: {
        files: [
            {
                expand: true,
                cwd: 'build/public/custom_components/',
                src: ['**/*.html'],
                dest: 'build/public/custom_components/'
            }
        ]
    },
    views: {
        files: [
            {
                expand: true,
                cwd: 'build/public/',
                src: ['*.html'],
                dest: 'build/public/'
            }
        ]
    }
};
