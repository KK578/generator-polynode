require('assert');
require('should');
var request = require('supertest');

var script = require('../build/server.js');
var server = script('developer');

describe('GET "/"', function () {
    var response;

    it('should successfully respond', function (done) {
        request(server).get('/').end(function (err, res) {
            res.status.should.equal(200);
            response = res;

            done(err);
        });
    });

    it('should contain a Head element with relevant information', function () {
        var head = response.text.split(/<\/?head>/)[1];

        head.should.match(/<meta charset="utf-8" *\/?>/,
            'Did not find utf-8 charset declaration.');
        head.should.match(/<meta name="theme-color" content="#[0-9a-fA-F]{6}" *\/?>/,
            'Invalid theme-color meta tag value.');
        head.should.match(/<script src="scripts\/load.js".*><\/script>/,
            'Did not find load.js script import.');
        head.should.match(/<style>#__bs_notify__{.*}<\/style>/,
            'Did not find BrowserSync Notification styling.');
    });

    it('should contain a Body element with relevant elements for loading', function () {
        var body = response.text.split(/<\/?body>/)[1];
        body.should.match(/<splash-screen.*?>.*<\/splash-screen>/,
            'Did not find splash-screen element.');
        body.should.match(/<main-screen.*?>.*<\/main-screen>/,
            'Did not find main-screen element.');
        body.should.match(/<paper-toast.*?>.*<\/paper-toast>/,
            'Did not find paper-toast element.');
        body.should.match(/<script src="scripts\/browser_sync_client\.js".*<\/script>/,
            'Did not find browser_sync_client script element.');
    });
});

describe('GET "/MiddleOfNowhere"', function () {
    it('should respond with a 404 error', function (done) {
        request(server).get('/MiddleOfNowhere').end(function (err, res) {
            res.status.should.equal(404);
            err.message.should.equal('Not Found');
            res.text.should.match(/Couldn't find what you were looking for/,
                'Did not find 404 message.');

            done();
        });
    });
});

describe('GET "/bower/paper-material/"', function () {
    var response;

    it('should respond successfully', function (done) {
        request(server).get('/bower/paper-material/').end(function (err, res) {
            res.status.should.equal(200);
            response = res;

            done(err);
        });
    });

    it('should contain iron-component-page', function (done) {
        response.text.should.match(
            /<link rel="import" href="..\/iron-component-page\/iron-component-page.html" *\/?>/,
            'Did not find import for iron-component-page.');
        response.text.should.match(/<iron-component-page><\/iron-component-page>/,
            'Did not find iron-component-page element.');

        done();
    });
});
