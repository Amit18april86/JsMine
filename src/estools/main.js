/**
 * Created by amitsh on 08-02-2016.
 */
/*jslint node: true */
var fs = require('fs');
var esTemplate = require('estemplate');
var escodegen = require('escodegen');
var esprima = require('esprima');

var templateCode = fs.readFileSync('src/estools/template.jst', 'utf-8');
var template = esTemplate.compile(templateCode, {attachment: true});

var program = esprima.parse(fs.readFileSync('src/estools/index.js', 'utf-8'), {
    loc: true,
    source: 'index.js'
});

var ast = template({body: program.body});
var output = escodegen.generate(ast, {
    sourceMap: true,
    sourceMapWithCode: true
});

console.log('output: => \n' + output.code);