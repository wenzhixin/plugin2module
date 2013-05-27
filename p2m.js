/**
 * plugin to module (v1.0.0)
 * 
 * Convert jquery plugin to seajs/spmjs module from github repository.
 * 
 * wenzhixin2010@gmail.com
 * http://wenzhixin.net.cn
 * 
 * TODO:
 * 1. support url source
 * 2. auto add dependencies
 */

var fs = require('fs');

function main() {
    var source = process.argv[2];
        target = process.argv[3] || getTarget(source);
    convert(source, target);
}

function getTarget(source) {
    return source.substring(source.lastIndexOf('/') + 1);
}

function convert(source, target) {
    fs.readFile(source, function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var content = String(data);
        content = [
            'define(function() { return function(jQuery) { var $ = jQuery;\n', 
            content,
            '\n}});'
        ].join('');
        fs.writeFile(target, content, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('OK!');
        });
    });
}


main();
