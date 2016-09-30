
//@JS_mine( {"specName":"SayHello","testName":"should say Hello Amit !!","matcher":"toEqual","param":{"ip":[],"xop":{"returnValue":"Hello Amit !!"}}});
function sayHello() {
    return "Hello Amit !!";
}


function dontParse() {
    return "I don't like parsing!!";
}

//@JS_mine({"specName":"Check Sum","testName":"should give you the sum","matcher":"toBe","param":{"ip":[2,6],"xop":{"returnValue":8}}});
function checkTotal(x, y) {
    return x + y;
}


//@JS_mine({"specName":"Check Diff","testName":"should give you the dif","matcher":"toBe","param":{"ip":[12,2],"xop":{"returnValue":10}}});
function checkDiff(x, y) {
    return x - y;
}


function provideName() {
    setInterval(function () {
        return 'Test';
    }, 5000)
}


function getFullName() {
    var self = this;
    //var firstName = provideName();

    setInterval(function () {
        alert(self.firstName + "_Sharma");
    }, 6000);
}