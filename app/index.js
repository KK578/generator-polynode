'use strict';
var yeoman = require('yeoman-generator');

var colors = {
    primary: [
        'red',
        'pink',
        'purple',
        'deep-purple',
        'indigo',
        'blue',
        'light-blue',
        'cyan',
        'teal',
        'green',
        'light-green',
        'lime',
        'yellow',
        'amber',
        'orange',
        'deep-orange'
    ],
    secondary: [
        'brown',
        'grey',
        'blue-grey'
    ]
};

function getColorHex(themeColor) {
    switch (themeColor) {
        case 'red': return '#F44336';
        case 'pink': return '#E91E63';
        case 'purple': return '#9C27B0';
        case 'deep-purple': return '#673AB7';
        case 'indigo': return '#3F51B5';
        case 'blue': return '#2196F3';
        case 'light-blue': return '#03A9F4';
        case 'cyan': return '#00BCD4';
        case 'teal': return '#009688';
        case 'green': return '#4CAF50';
        case 'light-green': return '#8BC34A';
        case 'lime': return '#CDDC39';
        case 'yellow': return '#FFEB3B';
        case 'amber': return '#FFC107';
        case 'orange': return '#FF9800';
        case 'deep-orange': return '#FF5722';
        case 'brown': return '#795548';
        case 'grey': return '#9E9E9E';
        case 'blue-grey': return '#607D8B';

        default: return '#3F51B5';
    }
}

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
    },
    prompting: function () {
        var done = this.async();

        var prompts = [
            {
                type: 'input',
                name: 'appName',
                message: 'What is the name of your app?'
            },
            {
                type: 'list',
                name: 'themeColor',
                message: 'What is the primary color for your app?',
                default: 'indigo',
                choices: colors.primary.concat(colors.secondary)
            },
            {
                type: 'list',
                name: 'themeColorAccent',
                message: 'What is the accent color for your app?',
                default: 'cyan',
                choices: colors.primary
            }
        ];

        this.prompt(prompts, function (answers) {
            this.appName = answers.appName;
            this.themeColor = answers.themeColor;
            this.themeColorHex = getColorHex(answers.themeColor);
            this.themeColorAccent = answers.themeColorAccent;

            done();
        }.bind(this));
    },
    app: function () {
        /* jshint maxstatements:30 */
        // Config Files
        this.copy('.bowerrc');
        this.copy('.editorconfig');
        this.copy('.gitignore');
        this.copy('.jscsrc');
        this.copy('.jshintrc');

        // Package Files
        this.copy('package.json');
        this.copy('bower.json');

        // GruntFile/Grunt Configs
        this.copy('gruntfile.js');
        this.directory('grunt/');

        // Server Stuff
        this.directory('server/');

        // Web Stuff
        this.copy('browser/404.html');
        this.copy('browser/elements.html');
        this.copy('browser/index.html');
        this.directory('browser/custom_components/');
        this.directory('browser/media/');
        this.directory('browser/scripts/');
        this.directory('browser/stylesheets/');

        // Testing
        this.directory('test/');
        this.directory('browser/test/');
    }
});
