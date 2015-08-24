module.exports = {
    developer: {
        options: {
            port: 5000,
            script: 'build/developer.js'
        }
    },
    production: {
        options: {
            port: 5000,
            script: 'build/production.js'
        }
    },
    devPublic: {
        options: {
            port: 25565,
            script: 'build/developer.js'
        }
    }
};
