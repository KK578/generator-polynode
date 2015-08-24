var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('yo polynode:element my-element', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../element'))
            .inDir(path.join(__dirname, './tmp/element/'))
            .withArguments('my-element')
            .withPrompts({ addImport: false })
            .on('end', done);
    });

    it('should generate element files', function () {
        assert.file([
            'browser/custom_components/my-element/my-element.html',
            'browser/custom_components/my-element/my-element.scss',
            'browser/custom_components/my-element/my-element.js'
        ]);
    });

    describe('my-element.html', function () {
        var file = 'browser/custom_components/my-element/my-element.html';

        it('should reference polymer.html', function () {
            assert.fileContent(file,
                '<link rel="import" href="../../bower_components/polymer/polymer.html" />');
        });

        it('should reference my-element.css', function () {
            assert.fileContent(file,
                '<link rel="import" type="css" href="my-element.css?__inline" />');
        });

        it('should reference my-element.js', function () {
            assert.fileContent(file, '<script src="my-element.js?__inline"></script>');
        });
    });

    describe('my-element.scss', function () {
        var file = 'browser/custom_components/my-element/my-element.scss';

        it('should contain a :host selector rule', function () {
            assert.fileContent(file, ':host');
            assert.fileContent(file, 'display: block');
        });
    });

    describe('my-element.js', function () {
        var file = 'browser/custom_components/my-element/my-element.js';

        it('should contain correct "is" property', function () {
            assert.fileContent(file, 'is: \'my-element\'');
        });
    });
});

