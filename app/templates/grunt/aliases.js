module.exports = {
    default: {
        description: 'Builds the current build for Development',
        tasks: [
            'jshint',                       // Linting
            'jscs',                         // Linting
            'bower:developer',              // Install all bower_components
            'build:node',                   // Minify server files
            'build:views',                  // Minify standard web files
            'build:bower',                  // Minify bower_components
            'build:components',             // Minify custom_components
            'build:media',                  // Optimise images,
            'build:test'
        ]
    },
    build: {
        description: 'Build the project for Production.',
        tasks: [
            'jshint',                       // Linting
            'jscs',                         // Linting
            'clean',                        // Fully clean working directory
            'bower:production',             // Install main bower_components (no devDependencies)
            'build:node',                   // Minify server files
            'build:views',                  // Minify standard web files
            'build:bower',                  // Minify bower_components
            'build:components',             // Minify custom_components
            'build:media',                  // Optimise images
            'inline',                       // Inline css/js imports on custom_components
            'minifyPolymer:production',     // Minify inlined custom_components
            'clean:production'              // Remove css/js files which are now inlined
            //'serviceWorker'               // Note: Add to array to enable ServiceWorker (3/3)
        ]
    },
    serve: {
        description: 'Serve the current build under Developer state.',
        tasks: [
            'express:developer',
            'watch'
        ]
    },
    'serve:production': {
        description: 'Serve the current build under Production state.',
        tasks: [
            'express:production',
            'watch'
        ]
    },
    'serve:public': {
        description: 'Serve the current build under Developer status on the public port.',
        tasks: [
            'express:devPublic',
            'watch'
        ]
    },
    'test:developer': {
        tasks: ['mochaTest:developer']
    },
    'test:production': {
        tasks: ['mochaTest:production']
    },
    'build:bower': [
        'newer:minifyPolymer:bower',        // HTML
        'newer:minifyPolymerCSS:bower',     // CSS
        'newer:uglify:bower',               // JS
        'newer:copy:bower'                  // Minified JS
    ],
    'build:components': [
        'newer:minifyPolymer:components',   // HTML
        'newer:sass:components',            // SCSS
        'newer:uglify:components'           // JS
    ],
    'build:media': [
        'newer:imagemin'                    // Images
    ],
    'build:node': [
        'newer:uglify:node'                 // JS
    ],
    'build:views': [
        'newer:minifyPolymer:views',        // HTML
        'newer:sass:views',                 // SCSS
        'newer:uglify:views'                // JS
    ],
    'build:test': [
        'newer:copy:wct',
        'WCTSuite'
    ]
};
