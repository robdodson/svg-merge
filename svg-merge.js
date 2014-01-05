'use strict';

var fs = require('fs'),
    path = require('path'),
    easy = require('libxmljs-easy'),
    async = require('async'),
    mkdirp = require('mkdirp');

module.exports = function (inputDir, outputDir, outputFile, done) {
  // Use optional outputFile name or set it equal to the output dir
  // plus a '-out' suffix. So foo/arrow would produce bar/arrow/arrow-out.svg
  // outputFile = outputFile || inputDir.split(path.sep).pop() + '-out.svg';

  function getInputs(callback) {
    var paths = [];
    fs.readdir(inputDir, function(err, files) {
      if (err) {
        return callback(err);
      }

      files.forEach(function(file) {
        if(path.extname(file) !== '.svg') {
          return;
        }

        var filepath = path.join(inputDir, file);
        paths.push(filepath);
      });
      callback(null, paths);
    });
  }

  function stackFiles(files, callback) {
    var stack = [];
    files.forEach(function (file) {
      var id = path.basename(file, '.svg');
      var svgXml = fs.readFileSync(file, 'utf8');
      var svg = easy.parse(svgXml);

      // manipulate svg
      svg.$class = 'i';
      svg.$id = id;

      stack.push({
        id: id,
        svg: svg.$.toString().replace('xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"', ''),
        w: svg.$width,
        h: svg.$height
      });
    });
    callback(null, stack);
  }

  function merge(stack, callback) {
    var svg = [];
    svg.push('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">');
    // need to make same ids from different files unique
    stack.forEach(function(icon) {
      svg.push(icon.svg);
    });
    
    svg.push('</svg>');

    var svgText = svg.join("\n");
    callback(null, svgText);
  }

  function output(svgText, callback) {
    var filename = path.join(outputDir, outputFile);
    mkdirp.sync(path.join(outputDir));
    fs.writeFile(filename, svgText, function(err) {
      if (err) {
        return callback(err);
      }
      callback();
    });
  }

  function error(err) {
    console.error(err.stack);
    process.exit(err.code || 1);
  }

  async.waterfall([
    getInputs,
    stackFiles,
    merge,
    output
  ], function (err) {
    if (err) {
      error(err);
    }

    done();
  });
};