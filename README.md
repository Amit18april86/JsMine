# Let me write 'Unit Test Cases' for you 

This is a PoC project, which is at its initial stage to demonstrate the auto test case writing in javascript.

Libraries used:

[Esprima](http://esprima.org/)
[Jasmine](http://jasmine.github.io/)
[Grunt](http://gruntjs.com/)
[Plato](https://github.com/es-analysis/plato)

take the configuration object from your API and 


1. Creates test cases from that
2. Execute those test cases
3. Generate useful reports

Configuration for the API will work like :


//@JS_mine("matcher":"toBe",
//         "param":{"ip":[12,2],
//         "xop":{"returnValue":10}}});
function checkDiff(x, y) {
    return x - y;
}

where Param are input parameter for test , xop is expected output.
'//' are used with @JS_mine tag, as the compiler will read only the comments for given api with @JS_mine tag in it.

Clone and run this application using:
```sh
//first install the dependencies.
npm install 

//run the compiler
grunt
```

#Developers
."Amit Sharma" <amit18april86@gmail.com>
