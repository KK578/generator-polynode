module.exports = {
    'default': [
        'jshint',
        'jscs',
        'clean:test',
        'mochaTest:all'
    ],
    'app': [
        'jshint:app',
        'jscs:app',
        'clean:test',
        'mochaTest:app'
    ],
    'element': [
        'jshint:element',
        'jscs:element',
        'clean:test',
        'mochaTest:element'
    ],
    'page': [
        'jshint:page',
        'jscs:page',
        'clean:test',
        'mochaTest:page'
    ]
};
