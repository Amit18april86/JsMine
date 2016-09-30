/*
 *create by Amit Sharma 22/01/2016 08:26 PM
 */

esprima = require('esprima');// Javascript Parser
fs = require('fs');// Node File System
util = require('util');// Utility libs

var srcFile;
var args = process.argv[2];

if (!args) {
    //Load source File
    srcFile = require('../appFiles/MyApp');
} else {
    //Or take it as argument
    srcFile = args;
}

//Read src file async
var readSrc = fs.readFileSync(srcFile);

// define all options for your esprima parser
var options = {
    attachComment: true,
    tokens: true,
    tolerant: true
};

// parse your code to get abstract syntax tree (AST)
var ast = esprima.parse(readSrc, options);
//var rangeObj = ast.range;
var bodyObj = ast.body;

// Maintain an array to hold the ATG methods and their comments
var methodCommentHolder = [];
for (var i = 0; i < bodyObj.length; i++) {
    var bodyO = bodyObj[i];
    if ((bodyO.type === "FunctionDeclaration") && (bodyO.leadingComments)) {
        var comments = bodyO.leadingComments;
        for (var j = 0; j < comments.length; j++) {
            var comment = comments[j];
            if (comment.value.indexOf("@JS_mine") == 0) {
                var commentText = comment.value.substr(9, comment.value.lastIndexOf(")") - 9);
                var jsonComment = JSON.parse(commentText);
                var jsonCommentq = util.inspect(jsonComment, {depth: null});
                methodCommentHolder.push({
                    "method": bodyO.id.name,
                    "commnt": jsonComment
                });
            }
        }
    }
}

//CodeGenerator
var testSpec = "";
for (var k = 0; k < methodCommentHolder.length; k++) {
    var methCommntObj = methodCommentHolder[k];
    var methName = methCommntObj.method;
    var commnt = methCommntObj.commnt;
    var specName = commnt.specName;
    var testCaseName = commnt.testName;
    var matchr = commnt.matcher;
    var expectedOP = commnt.param.xop;
    var ip = commnt.param.ip;
    var ips = "";

    for (var l = 0; l < ip.length; l++) {
        if (l == (ip.length - 1)) {
            ips = ips + ip[l];
        } else {
            ips = ips + ip[l] + ",";
        }
    }
    ips = "(" + ips + ")";
    methName = methName + ips;

    //Limitation for initial phase , hardcoded string, this can be kept in a separate
    // file and can read from there.Also most of the boilerplate can be remove here.
    var returnval = "";
    if (matchr === "toBe") {
        returnval = expectedOP.returnValue
    } else {
        returnval = "'" + expectedOP.returnValue + "'"
    }
    testSpec = testSpec + " describe('" + specName + "' ,function(){" +
        "it('" + testCaseName + "',function(){" +
        "expect(" + methName + ")." + matchr + "(" + returnval + ");" +
        "});});";
}

//outPut JSON for debugging purpose
fs.writeFile("static/outPutJson.json", JSON.stringify(ast, null, 4), function (error) {
    if (error) {
        console.log(error);
    } else {

    }
});
fs.writeFile("spec/HelloWorldSpec.js", testSpec, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Test cases created successfully !!");
    }

});