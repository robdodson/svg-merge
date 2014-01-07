/* globals describe, it, beforeEach, afterEach */

'use strict';

var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var file = require('file-utils');
var easy = require('libxmljs-easy');
var svgMerge = require('../svg-merge');

var inputDir = path.join(__dirname, 'fixtures', 'arrow');
var outputDir = path.join(__dirname, '../tmp/arrow');
var outputFile = 'arrow-out.svg';
var outputPath = path.join(outputDir, outputFile);

describe('svgMerge()', function () {
  beforeEach(function () {
    rimraf.sync('tmp');
  });

  describe('arrow', function () {
    var opts = {
      inputDir: inputDir,
      outputDir: outputDir,
      outputFile: outputFile
    };

    it('should output an svg', function (done) {
      svgMerge(opts, function () {
        expect(file.exists(outputPath)).to.equal(true);
        done();
      });
    });

    it('should create a group for every file', function (done) {
      svgMerge(opts, function () {
        var svg = easy.parse(fs.readFileSync(outputPath, 'utf8'));
        expect(svg.g.length).to.equal(3);
        done();
      });
    });

  });
});
