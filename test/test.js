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
var classPrefix = 'iconic';

describe('svgMerge()', function () {
  beforeEach(function () {
    rimraf.sync('tmp');
  });

  describe('arrow', function () {
    var opts = {
      inputDir: inputDir,
      outputDir: outputDir,
      outputFile: outputFile,
      classPrefix: classPrefix
    };

    it('outputs an svg', function (done) {
      svgMerge(opts, function () {
        expect(file.exists(outputPath)).to.equal(true);
        done();
      });
    });

    it('has a group for every file', function (done) {
      svgMerge(opts, function () {
        var svg = easy.parse(fs.readFileSync(outputPath, 'utf8'));
        expect(svg.g.length).to.equal(3);
        done();
      });
    });

    it('uses the classPrefix on the groups', function (done) {
      svgMerge(opts, function () {
        var svg = easy.parse(fs.readFileSync(outputPath, 'utf8'));
        expect(svg.g[0].$class).to.equal('iconic-arrow-lg');
        expect(svg.g[1].$class).to.equal('iconic-arrow-md');
        expect(svg.g[2].$class).to.equal('iconic-arrow-sm');
        done();
      });
    });
  });
});
