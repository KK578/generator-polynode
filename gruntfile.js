module.exports = function (grunt) {
    var time = require('time-grunt');
    time(grunt);

    var configs = require('load-grunt-config');
    configs(grunt, { jitGrunt: true });
};
