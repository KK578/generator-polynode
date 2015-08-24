module.exports = {
    options: {
        config: '.jscsrc'
    },
    generator: {
        files: '<%= jshint.generator.files %>'
    },
    app: {
        files: '<%= jshint.app.files %>'
    },
    element: {
        files: '<%= jshint.element.files %>'
    },
    page: {
        files: '<%= jshint.page.files %>'
    }
};
