// --------------------------------------------------------------------------------------------------------------------
//
// config.js - tests for node-data2xml
//
// Copyright (c) 2011 Andrew Chilton - http://chilts.org/
// Written by Andrew Chilton <andychilton@gmail.com>
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

var tap = require('tap'),
    test = tap.test,
    plan = tap.plan;
var data2xml = require('../data2xml');

var declaration = '<?xml version="1.0" encoding="utf-8"?>\n';

// --------------------------------------------------------------------------------------------------------------------

test('some simple xml with \'@\' for attributes', function (t) {
    var convert = data2xml({ attrProp : '@', valProp : '#' }),

        tests = [{
            name : 'one element structure with an xmlns',
            element : 'topelement',
            data : { '@' : { xmlns : 'http://www.appsattic.com/xml/namespace' }, second : 'value' },
            exp : declaration + '<topelement xmlns="http://www.appsattic.com/xml/namespace"><second>value</second></topelement>'
        }, {
            name : 'complex 4 element array with some attributes',
            element : 'topelement',
            data : { item : [
                { '@' : { type : 'a' }, '#' : 'val1' },
                { '@' : { type : 'b' }, '#' : 'val2' },
                'val3',
                { '#' : 'val4' },
            ] },
            exp : declaration + '<topelement><item type="a">val1</item><item type="b">val2</item><item>val3</item><item>val4</item></topelement>'
        }];

    tests.forEach(function(test) {
        var xml = convert(test.element, test.data, { attrProp : '@', valProp : '#' });
        t.equal(xml, test.exp, test.name);
    });

    t.end();
});

test('it\'s possible to omit the XML declaration', function (t) {
    var convert = data2xml({xmlDecl: false});

    t.equal(
        convert('moo', {foo: 'bar', baz: 42}),
        '<moo><foo>bar</foo><baz>42</baz></moo>',
        'must not be declared as XML'
    );

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
