'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var program = require('ast-query');
var wiring = require('html-wiring');

function appendPage(elementName, title) {
    var newPage = {
        tag: '/' + elementName.split('page-')[1],
        title: title,
        element: elementName
    };

    var pageBehavior = wiring.readFileAsString('browser/custom_components/behaviors/pages.html');
    // Remove <script> and </script> tags
    var js = pageBehavior.split('<script>')[1].split('<\/script>')[0];

    var ast = program(js);
    // Find the value of Behaviors.PageBehavior and append the new page to the pages property.
    ast.assignment('Behaviors.PageBehavior')
        .value()
        .key('properties')
        .key('pages')
        .key('value')
        .push(JSON.stringify(newPage));

    pageBehavior = '<script>\n' + ast.toString() + '\n</script>';
    wiring.writeFileFromString(pageBehavior, 'browser/custom_components/behaviors/pages.html');
}

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('page-name', {
            desc: 'Name of the page to scaffold',
            required: true
        });
    },
    init: function () {
        this.elementName = this['page-name'];

        // If element name does not start with 'page-', throw an error.
        if (this.elementName.indexOf('page-') !== 0) {
            this.emit('error', new Error(
                'Element name must contain "page-"\nEx: yo polynode:page page-element'
            ));
        }
    },
    prompting: function () {
        var done = this.async();

        var prompts = [
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of this page?'
            },
            {
                type: 'confirm',
                name: 'includeWCT',
                message: 'Generate a template for WCT for this element?'
            }
        ];

        this.prompt(prompts, function (answers) {
            this.title = answers.title;
            this.includeWCT = answers.includeWCT;

            done();
        }.bind(this));
    },
    app: function () {
        /* jshint maxstatements:30 */
        // 'x-foo/x-foo/'
        var element = path.join(this.elementName, this.elementName);
        // 'browser/custom_components/page/page-foo/page-foo/'
        var elementPath = path.join('browser/custom_components/pages/', element);

        this.template('element.html', elementPath + '.html');
        this.copy('element.scss', elementPath + '.scss');
        this.template('element.js', elementPath + '.js');

        appendPage(this.elementName, this.title);
        this.log('Successfully added ' + this.elementName + ' to PageBehavior.');

        if (this.includeWCT) {
            var testPath = path.join('browser/test/pages/', element + '-test');

            this.template('wct/element-test.html', testPath + '.html');
            this.template('wct/element-test.js', testPath + '.js');
        }
    }
});
