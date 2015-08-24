module.exports = {
    options: {
        copy: false,
        targetDir: 'browser/bower_components/',
        layout: 'byComponent'
    },
    developer: {
        options: {
            verbose: true
        }
    },
    production: {
        options: {
            bowerOptions: {
                production: true
            }
        }
    }
};
