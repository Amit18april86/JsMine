/**
 * Created by amitsh on 08-02-2016.
 */

var dependency1 = require('dependency1');
var dependency2 = require('dependency2');
var fs = require('fs');

module.exports = function () {
    'use strict';
    return dependency1() + dependency2();
};