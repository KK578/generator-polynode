module.exports = {
    options: {
        optimizationLevel: 3,
        progressive: true
    },
    production: {
        files: [
            {
                expand: true,
                cwd: 'browser/media/',
                src: [
                    '**/*.jpg',
                    '**/*.png',
                    '**/*.ico'
                ],
                dest: 'build/public/media/'
            }
        ]
    }
};
