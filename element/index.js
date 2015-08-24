'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var wiring = require('html-wiring');

function appendElement(name) {
    var href = 'custom_components/' + name + '/' + name + '.html';
    var elementImport = '<link rel="import" href="' + href + '" />';

    var elements = wiring.readFileAsString('browser/elements.html');
    elements = elements + elementImport + '\n';
    wiring.writeFileFromString(elements, 'browser/elements.html');
}

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('element-name', {
            desc: 'Name of the element to scaffold',
            required: true
        });
    },
    init: function () {
        this.elementName = this['element-name'];

        if (this.elementName.indexOf('-') === -1) {
            this.emit('error', new Error(
                'Element name must contain a dash "-"\nEx: yo polynode:element my-element'
            ));
        }
    },
    prompting: function () {
        var done = this.async();

        var prompts = [
            {
                type: 'confirm',
                name: 'addImport',
                message: 'Add this element to global imports? [elements.html]'
            },
            {
                type: 'confirm',
                name: 'includeWCT',
                message: 'Generate a template for WCT for this element?'
            }
        ];

        this.prompt(prompts, function (answers) {
            this.addImport = answers.addImport;
            this.includeWCT = answers.includeWCT;

            done();
        }.bind(this));
    },
    app: function () {
        /* jshint maxstatements:30 */
        // 'x-foo/x-foo'
        var element = path.join(this.elementName, this.elementName);
        // 'browser/custom_components/x-foo/x-foo'
        var elementPath = path.join('browser/custom_components/', element);

        this.template('element.html', elementPath + '.html');
        this.copy('element.scss', elementPath + '.scss');
        this.template('element.js', elementPath + '.js');

        if (this.addImport) {
            appendElement(this.elementName);
            this.log('Successfully added ' + this.elementName + ' to App Element Dependencies.');
        }

        if (this.includeWCT) {
            var testPath = path.join('browser/test/', element + '-test');

            this.template('wct/element-test.html', testPath + '.html');
            this.template('wct/element-test.js', testPath + '.js');
        }
    }
});
