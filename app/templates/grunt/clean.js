module.exports = {
    build: ['build/**/*'],
    bower: ['browser/bower_components/**/*'],
    production: [
        'build/public/custom_components/**/*.css',
        'build/public/custom_components/**/*.js',
        'build/public/stylesheets/',
        'build/public/scripts/browser_sync_client.js'
    ]
};
