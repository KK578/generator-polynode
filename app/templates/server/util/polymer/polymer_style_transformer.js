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
// Polymer/src/lib/style-transformer

var styleUtil = require('./polymer_style_util.js');

var SCOPE_NAME = 'style-scope';
var COMPLEX_SELECTOR_SEP = ',';
var SIMPLE_SELECTOR_SEP = /(^|[\s>+~]+)([^\s>+~]+)/g;
var HOST = ':host';
// NOTE: this supports 1 nested () pair for things like
// :host(:not([selected]), more general support requires
// parsing which seems like overkill
var HOST_PAREN = /(\:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/g;
var HOST_CONTEXT = ':host-context';
var HOST_CONTEXT_PAREN = /(.*)(?:\:host-context)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))(.*)/;
var CONTENT = '::content';
var SCOPE_JUMP = /\:\:content|\:\:shadow|\/deep\//;
var CSS_CLASS_PREFIX = '.';
var CSS_ATTR_PREFIX = '[' + SCOPE_NAME + '~=';
var CSS_ATTR_SUFFIX = ']';
var PSEUDO_PREFIX = ':';

function _transformSimpleSelector(selector, scope) {
    var p$ = selector.split(PSEUDO_PREFIX);
    p$[0] += scope;
    return p$.join(PSEUDO_PREFIX);
}

function _transformCompoundSelector(selector, combinator, scope, hostScope) {
    function handleHostContext(jumpIndex) {
        if (selector.indexOf(HOST_CONTEXT) >= 0) {
            return true;
        }

        if (selector.indexOf(HOST) >= 0) {
            // :host(...) -> scopeName...
            selector = selector.replace(HOST_PAREN, function (m, host, paren) {
                return hostScope + paren;
            });
            // now normal :host
            // replace other selectors with scoping class
            selector = selector.replace(HOST, hostScope);
        }
        else if (jumpIndex !== 0) {
            selector = scope ? _transformSimpleSelector(selector, scope) : selector;
        }

        return false;
    }

    // replace :host with host scoping class
    var jumpIndex = selector.search(SCOPE_JUMP);
    var hostContext = handleHostContext(jumpIndex);

    // remove left-side combinator when dealing with ::content.
    if (selector.indexOf(CONTENT) >= 0) {
        combinator = '';
    }

    // process scope jumping selectors up to the scope jump and then stop
    // e.g. .zonk ::content > .foo ==> .zonk.scope > .foo
    var stop;

    if (jumpIndex >= 0) {
        selector = selector.replace(SCOPE_JUMP, ' ');
        stop = true;
    }

    return {
        value: selector,
        combinator: combinator,
        stop: stop,
        hostContext: hostContext
    };
}

function _transformComplexSelector(selector, scope, hostScope) {
    var stop = false;
    var hostContext = false;

    selector = selector.replace(SIMPLE_SELECTOR_SEP, function (m, c, s) {
        if (!stop) {
            var info = _transformCompoundSelector(s, c, scope, hostScope);
            stop = stop || info.stop;
            hostContext = hostContext || info.hostContext;
            c = info.combinator;
            s = info.value;
        }
        else {
            s = s.replace(SCOPE_JUMP, ' ');
        }

        return c + s;
    });

    if (hostContext) {
        selector = selector.replace(HOST_CONTEXT_PAREN, function (m, pre, paren, post) {
            return pre + paren + ' ' + hostScope + post +
                    COMPLEX_SELECTOR_SEP + ' ' + pre + hostScope + paren + post;
        });
    }

    return selector;
}

function _transformRule(rule, scope, hostScope) {
    var selectors = rule.selector.split(COMPLEX_SELECTOR_SEP);
    for (var i = 0; i < selectors.length; i++) {
        var selector = selectors[i];
        selectors[i] = _transformComplexSelector(selector, scope, hostScope);
    }

    // NOTE: save transformedSelector for subsequent matching of elements
    // agsinst selectors (e.g. when calculating style properties)
    rule.selector = rule.transformedSelector = selectors.join(COMPLEX_SELECTOR_SEP);
}

function _calcElementScope(scope, useAttr) {
    if (scope) {
        return useAttr ? CSS_ATTR_PREFIX + scope + CSS_ATTR_SUFFIX : CSS_CLASS_PREFIX + scope;
    }
    else {
        return '';
    }
}

function _calcHostScope(scope, ext) {
    return ext ? '[is=' + scope + ']' : scope;
}

function css(rules, scope, ext, callback, useAttr) {
    var hostScope = _calcHostScope(scope, ext);
    scope = _calcElementScope(scope, useAttr);

    return styleUtil.toCssText(rules, function (rule) {
        if (!rule.isScoped) {
            _transformRule(rule, scope, hostScope);
            rule.isScoped = true;
        }

        if (callback) {
            callback(rule, scope, hostScope);
        }
    });
}

module.exports = {
    css: css
};
