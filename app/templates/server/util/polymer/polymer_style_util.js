/*
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

// Code adapted to fit from Node.js process.
// Polymer/src/lib/style-util

var CssParse = require('./polymer_css_parse.js');

function toCssText(rules, callback, preserveProperties) {
    if (typeof rules === 'string') {
        rules = this.parser.parse(rules);
    }

    if (callback) {
        this.forEachStyleRule(rules, callback);
    }

    return this.parser.stringify(rules, preserveProperties);
}

function forEachStyleRule(node, callback) {
    var skipRules = false;

    if (node.type === this.ruleTypes.STYLE_RULE) {
        callback(node);
    }
    else if (node.type === this.ruleTypes.KEYFRAMES_RULE ||
        node.type === this.ruleTypes.MIXIN_RULE) {
        skipRules = true;
    }

    var rules = node.rules;

    if (rules && !skipRules) {
        for (var i = 0; i < rules.length; i++) {
            this.forEachStyleRule(rules[i], callback);
        }
    }
}

module.exports = {
    toCssText: toCssText,
    forEachStyleRule: forEachStyleRule,
    parser: CssParse,
    ruleTypes: CssParse.types
};
