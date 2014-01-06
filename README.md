# svg-merge

> Merge a folder of svg files into a single file

[![Build Status](https://secure.travis-ci.org/robdodson/svg-merge.png?branch=master)](http://travis-ci.org/robdodson/svg-merge)


## Installation

Install with npm:

```
npm install --save svg-merge
```


## API

### svgMerge(options, callback)

#### options.inputDir

**Required**  
Default: `null`  
Type: `String`

Input source directory.

#### options.outputDir

**Required**  
Default: `null`  
Type: `String`

Desired location for output files.

#### options.outputFile

**Required**  
Default: `null`  
Type: `String`

Desired file name for output file.

#### options.classPrefix

Default: `iconic`  
Type: `String`

Prefix class names coming from svg files. Ex: `class="arrow-lg"` becomes `class="iconic-arrow-lg"`.

## Testing

From the repo root:

```
npm install
npm test
```
