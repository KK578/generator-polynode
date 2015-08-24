var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('yo polynode:page page-test', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../app'))
            .inDir(path.join(__dirname, './tmp/page/'))
            .withArguments('MyProject')
            .withPrompts({
                themeColor: 'red',
                themeColorAccent: 'green'
            })
            .on('end', done);
    });

    before(function (done) {
        helpers.run(path.join(__dirname, '../page'))
            .inDir(path.join(__dirname, './tmp/page/'))
            .withArguments('page-test')
            .withPrompts({
                title: 'Test',
                includeWCT: false
            })
            .on('end', done);
    });

    it('generated element', function () {
        assert.file([
            'browser/custom_components/pages/page-test/page-test.html',
            'browser/custom_components/pages/page-test/page-test.scss',
            'browser/custom_components/pages/page-test/page-test.js'
        ]);
    });

    it('added entry to PageBehavior', function () {
        var file = 'browser/custom_components/behaviors/pages.html';

        assert.fileContent(file, '\'tag\': \'/test\'');
        assert.fileContent(file, '\'title\': \'Test\'');
        assert.fileContent(file, '\'element\': \'page-test\'');
    });

    describe('page-test.html', function () {
        var file = 'browser/custom_components/pages/page-test/page-test.html';

        it('reference polymer.html', function () {
            assert.fileContent(file,
                '<link rel="import" href="../../bower_components/polymer/polymer.html" />');
        });

        it('reference page-test.css', function () {
            assert.fileContent(file,
                '<link rel="import" type="css" href="page-test.css?__inline" />');
        });

        it('reference page-test.js', function () {
            assert.fileContent(file, '<script src="page-test.js?__inline"></script>');
        });
    });

    describe('page-test.scss', function () {
        var file = 'browser/custom_components/pages/page-test/page-test.scss';

        it('contain a :host selector rule', function () {
            assert.fileContent(file, ':host');
            assert.fileContent(file, 'display: block');
        });
    });

    describe('page-test.js', function () {
        var file = 'browser/custom_components/pages/page-test/page-test.js';

        it('contains correct "is" property', function () {
            assert.fileContent(file, 'is: \'page-test\'');
        });
    });
});
