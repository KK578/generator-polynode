require('assert');
require('should');
var request = require('supertest');

var script = require('../build/server.js');
var server = script('production');

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
    });

    it('should contain a Body element with relevant elements for loading', function () {
        var body = response.text.split(/<\/?body>/)[1];
        body.should.match(/<splash-screen.*?>.*<\/splash-screen>/,
            'Did not find splash-screen element.');
        body.should.match(/<main-screen.*?>.*<\/main-screen>/,
            'Did not find main-screen element.');
        body.should.match(/<paper-toast.*?>.*<\/paper-toast>/,
            'Did not find paper-toast element.');
    });

    it('should not contain BrowserSync add-ons', function () {
        var head = response.text.split(/<\/?head>/)[1];
        var body = response.text.split(/<\/?body>/)[1];

        head.should.not.match(/<style>#__bs_notify__{.*}<\/style>/,
            'Did not find BrowserSync Notification styling.');
        body.should.not.match(/<script src="scripts\/browser_sync_client\.js".*<\/script>/,
            'Did not find browser_sync_client script element.');
    });
});

describe('GET "/MiddleOfNowhere"', function () {
    var response;

    it('should respond with a 404 error', function (done) {
        request(server).get('/MiddleOfNowhere').end(function (err, res) {
            res.status.should.equal(404);
            err.message.should.equal('Not Found');
            res.text.should.match(/Couldn't find what you were looking for/,
                'Did not find 404 message.');
            response = res;

            done();
        });
    });

    it('should contain inlined content', function () {
        var head = response.text.split(/<\/?head>/)[1];

        head.should.not.match(
            /<link rel="stylesheet" href="stylesheets\/404.css?__inline=true" *\/?>/);
    });
});

describe('GET "/bower/paper-material/"', function () {
    it('should respond with a 404 error', function (done) {
        request(server).get('/bower/paper-material/').end(function (err, res) {
            res.status.should.equal(404);
            err.message.should.equal('Not Found');

            done();
        });
    });
});
