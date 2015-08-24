/*
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/*
  Extremely simple css parser. Intended to be not more than what we need
  and definitely not necessarily correct =).
*/

// Code adapted to fit from Node.js process.
// Polymer/src/lib/css-parse

var types = {
    STYLE_RULE: 1,
    KEYFRAMES_RULE: 7,
    MEDIA_RULE: 4,
    MIXIN_RULE: 1000
};
var OPEN_BRACE = '{';
var CLOSE_BRACE = '}';
var _rx = {
    comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
    port: /@import[^;]*;/gim,
    customProp: /(?:^|[\s;])--[^;{]*?:[^{};]*?(?:[;\n]|$)/gim,
    mixinProp: /(?:^|[\s;])--[^;{]*?:[^{;]*?{[^}]*?}(?:[;\n]|$)?/gim,
    mixinApply: /@apply[\s]*\([^)]*?\)[\s]*(?:[;\n]|$)?/gim,
    varApply: /[^;:]*?:[^;]*var[^;]*(?:[;\n]|$)?/gim,
    keyframesRule: /^@[^\s]*keyframes/
};
var VAR_START = '--';
var MEDIA_START = '@media';
var AT_START = '@';

function removeCustomPropApply(cssText) {
    return cssText.replace(_rx.mixinApply, '')
        .replace(_rx.varApply, '');
}

function removeCustomPropAssignment(cssText) {
    return cssText.replace(_rx.customProp, '')
        .replace(_rx.mixinProp, '');
}

function removeCustomProps(cssText) {
    cssText = removeCustomPropAssignment(cssText);
    return removeCustomPropApply(cssText);
}

function _hasMixinRules(rules) {
    return (rules[0].selector.indexOf(VAR_START) >= 0);
}

function _handleSelectors(node, text, cssText) {
    var cssString = text;

    if (node.selector) {
        cssString += node.selector + ' ' + OPEN_BRACE + '\n';
    }

    cssString += cssText;

    if (node.selector) {
        cssString += CLOSE_BRACE + '\n\n';
    }

    return cssString;
}

function stringify(node, preserveProperties, text) {
    function concatRules() {
        var cssString = '';
        var rules = node.rules;

        if (rules && (preserveProperties || !_hasMixinRules(rules))) {
            for (var i = 0; i < rules.length; i++) {
                cssString = stringify(rules[i], preserveProperties, cssString);
            }
        }
        else {
            cssString = preserveProperties ? node.cssText : removeCustomProps(node.cssText);
            cssString = cssString.trim();

            if (cssString) {
                cssString = '  ' + cssString + '\n';
            }
        }

        return cssString;
    }

    text = text || '';
    var cssText = '';

    if (node.cssText || node.rules) {
        cssText = concatRules();
    }

    if (cssText) {
        text = _handleSelectors(node, text, cssText);
    }

    return text;
}

function _lex(text) {
    var root = { start: 0, end: text.length };
    var node = root;

    for (var i = 0; i < text.length; i++) {
        switch (text[i]) {
            case OPEN_BRACE:
                //console.group(i);
                if (!node.rules) {
                    node.rules = [];
                }

                var parent = node;
                var previous = parent.rules[parent.rules.length - 1];
                node = {
                    start: i + 1,
                    parent: parent,
                    previous: previous
                };
                parent.rules.push(node);
                break;

            case CLOSE_BRACE:
                //console.groupEnd(n.start);
                node.end = i + 1;
                node = node.parent || root;
                break;
        }
    }

    return root;
}

function _setNodeType(node, selector) {
    // note, support a subset of rule types...
    if (node.atRule) {
        if (selector.indexOf(MEDIA_START) === 0) {
            node.type = types.MEDIA_RULE;
        }
        else if (selector.match(_rx.keyframesRule)) {
            node.type = types.KEYFRAMES_RULE;
        }
    }
    else {
        if (selector.indexOf(VAR_START) === 0) {
            node.type = types.MIXIN_RULE;
        }
        else {
            node.type = types.STYLE_RULE;
        }
    }
}

function _determineRule(node, text) {
    var s = node.previous ? node.previous.end : node.parent.start;
    var t = text.substring(s, node.start - 1);
    t = t.substring(t.lastIndexOf(';') + 1);

    var selector = node.parsedSelector = node.selector = t.trim();
    node.atRule = (selector.indexOf(AT_START) === 0);

    _setNodeType(node, selector);
}

function _parseCss(node, text) {
    var t = text.substring(node.start, node.end - 1);
    node.parsedCssText = node.cssText = t.trim();

    if (node.parent) {
        _determineRule(node, text);
    }

    var rules = node.rules;

    if (rules) {
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            _parseCss(rule, text);
        }
    }

    return node;
}

function _clean(cssText) {
    return cssText.replace(_rx.comments, '').replace(_rx.port, '');
}

function parse(text) {
    text = _clean(text);
    return _parseCss(_lex(text), text);
}

module.exports = {
    parse: parse,
    stringify: stringify,
    removeCustomProps: removeCustomProps,
    removeCustomPropAssignment: removeCustomPropAssignment,
    removeCustomPropApply: removeCustomPropApply,
    types: types
};
