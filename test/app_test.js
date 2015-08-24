var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('yo polynode:app MyProject', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../app'))
            .inDir(path.join(__dirname, './tmp/app/'))
            .withPrompts({
                appName: 'MyProject',
                themeColor: 'red',
                themeColorAccent: 'green'
            })
            .on('end', done);
    });

    it('should not copy developer directories', function () {
        assert.noFile([
            'bower_components/',
            'browser/bower_components/',
            'build/',
            'node_modules/'
        ]);
    });

    // Config Files
    describe('Config Files', function () {
        it('should be generated', function () {
            assert.file([
                '.bowerrc',
                '.editorconfig',
                '.gitignore',
                '.jscsrc',
                '.jshintrc'
            ]);
        });
    });

    // Package Files
    describe('Package files', function () {
        it('bower.json should be templated with MyProject', function () {
            assert.file(['bower.json']);
            assert.fileContent('bower.json', '"name": "MyProject"');
        });

        it('package.json should be templated with with MyProject', function () {
            assert.file(['package.json']);
            assert.fileContent('package.json', '"name": "MyProject"');
        });
    });

    // GruntFile/Grunt Configs
    describe('Grunt Files', function () {
        it('should generate gruntfile.js', function () {
            assert.file(['gruntfile.js']);
        });

        it('should generate grunt configs', function () {
            assert.file([
                'grunt/aliases.js',
                'grunt/bower.js',
                'grunt/clean.js',
                'grunt/copy.js',
                'grunt/express.js',
                'grunt/imagemin.js',
                'grunt/inline.js',
                'grunt/jscs.js',
                'grunt/jshint.js',
                'grunt/mochaTest.js',
                'grunt/minifyPolymer.js',
                'grunt/minifyPolymerCSS.js',
                'grunt/sass.js',
                'grunt/uglify.js',
                'grunt/watch.js'
            ]);
        });
    });

    // Server Stuff
    describe('Server Files', function () {
        it('should generate runtime scripts', function () {
            assert.file([
                'server/server.js',
                'server/developer.js',
                'server/production.js'
            ]);
        });

        it('should generate util scripts', function () {
            assert.file([
                'server/util/browser_sync_server.js',
                'server/util/logger.js',
                'server/util/router.js',
                'server/util/setup.js',
                'server/util/util.js',
                'server/util/polymer/polymer_css_parse.js',
                'server/util/polymer/polymer_style_transformer.js',
                'server/util/polymer/polymer_style_util.js'
            ]);
        });
    });

    // Web Stuff
    describe('Browser Files', function () {
        it('should template global html files with selected theme', function () {
            assert.file([
                'browser/404.html',
                'browser/elements.html',
                'browser/index.html'
            ]);

            assert.fileContent('browser/index.html',
                '<title>MyProject</title>');
            assert.fileContent('browser/index.html',
                '<meta name="theme-color" content="#F44336" />');
            assert.fileContent('browser/404.html',
                '<meta name="theme-color" content="#F44336" />');
        });

        it('should generate scripts', function () {
            assert.file([
                'browser/scripts/load.js',
                'browser/scripts/browser_sync_client.js'
            ]);
        });

        it('should generate media', function () {
            assert.file([
                'browser/media/webassets/favicon.ico'
            ]);
        });

        describe('Custom Components', function () {
            it('should generate behaviors', function () {
                assert.file([
                    'browser/custom_components/behaviors/pages.html'
                ]);
            });

            it('should generate splash-screen', function () {
                assert.file([
                    'browser/custom_components/splash-screen/splash-screen.html',
                    'browser/custom_components/splash-screen/splash-screen.js',
                    'browser/custom_components/splash-screen/splash-screen.scss'
                ]);
            });

            it('should generate main-screen', function () {
                assert.file([
                    'browser/custom_components/main-screen/main-screen.html',
                    'browser/custom_components/main-screen/main-screen.js',
                    'browser/custom_components/main-screen/main-screen.scss'
                ]);
            });

            it('should generate routed-pages', function () {
                assert.file([
                    'browser/custom_components/routed-pages/routed-pages.html',
                    'browser/custom_components/routed-pages/routed-pages.js',
                    'browser/custom_components/routed-pages/routed-pages.scss'
                ]);
            });

            it('should generate fancy-material', function () {
                assert.file([
                    'browser/custom_components/fancy-material/fancy-material.html',
                    'browser/custom_components/fancy-material/fancy-material.js',
                    'browser/custom_components/fancy-material/fancy-material.scss'
                ]);
            });

            describe('Pages', function () {
                it('should template page-home with MyProject', function () {
                    assert.file([
                        'browser/custom_components/pages/page-home/page-home.html',
                        'browser/custom_components/pages/page-home/page-home.js',
                        'browser/custom_components/pages/page-home/page-home.scss'
                    ]);

                    assert.fileContent(
                        'browser/custom_components/pages/page-home/page-home.html',
                        'Welcome to the MyProject home page'
                    );
                });

                it('should generate page-about', function () {
                    assert.file([
                        'browser/custom_components/pages/page-about/page-about.html',
                        'browser/custom_components/pages/page-about/page-about.js',
                        'browser/custom_components/pages/page-about/page-about.scss'
                    ]);
                });

                it('should template page-theme with MyProject', function () {
                    assert.file([
                        'browser/custom_components/pages/page-theme/page-theme.html',
                        'browser/custom_components/pages/page-theme/page-theme.js',
                        'browser/custom_components/pages/page-theme/page-theme.scss'
                    ]);

                    assert.fileContent(
                        'browser/custom_components/pages/page-theme/page-theme.html',
                        'MyProject/browser/stylesheets/theme.scss'
                    );

                    assert.fileContent(
                        'browser/custom_components/pages/page-theme/page-theme.html',
                        'MyProject/browser/index.html'
                    );
                });
            });
        });

        describe('SCSS', function () {
            it('should template SCSS partials with selected theme', function () {
                assert.file([
                    'browser/stylesheets/scss/_layout.scss',
                    'browser/stylesheets/scss/_material_color.scss',
                    'browser/stylesheets/scss/_mixins.scss',
                    'browser/stylesheets/scss/_theme.scss'
                ]);

                assert.fileContent('browser/stylesheets/scss/_theme.scss',
                    '$theme-primary: $color-red-500;');
                assert.fileContent('browser/stylesheets/scss/_theme.scss',
                    '$theme-accent: $color-green-A400;');
            });

            it('should generate views stylesheets', function () {
                assert.file([
                    'browser/stylesheets/404.scss',
                    'browser/stylesheets/index.scss',
                    'browser/stylesheets/theme.scss'
                ]);
            });
        });
    });
});
