/// <binding ProjectOpened='default' />
const { watch, src, dest } = require('gulp');
var config = require('./paths.json');

// read in from the paths.json. 
const sources = config.sources;
const destinations = config.destinations;

function copy(path, base) {

    destinations.forEach(function (target) {
        console.log(
            '[\x1b[32m%s\x1b[0m] \x1b[33m%s\x1b[0m >> \x1b[34m%s\x1b[0m',
            time(), path.substring(base.length + 1), target);

        src(path, { base: base })
            .pipe(dest(target));
    });
}

function time() {
    return new Date().toLocaleTimeString();
}

exports.default = function () {

    sources.forEach(function (source) {

        var searchPath = source + '/**/*';

        watch(searchPath, { ignoreInitial: false })
            .on('change', function (path, stats) {
                copy(path, source);
            })
            .on('add', function (path, stats) {
                copy(path, source);
            });
    });
};



