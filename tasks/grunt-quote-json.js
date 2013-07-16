/*
 * grunt-quote-json
 * https://github.com/kawanet/grunt-quote-json
 *
 * Copyright (c) 2013 kawanet
 * Licensed under the MIT license.
 */

'use strict';

var obop = require('obop');

module.exports = function(grunt) {
  grunt.registerMultiTask('quoteJson', 'Quoting JSON parameters', function() {
    var options = this.options();
    this.files.forEach(function(file) {
      quoteJson(grunt, file.src, file.dest, options);
    });
  });
};

function quoteJson(grunt, srcfile, dstfile, options) {
  grunt.log.writeln(srcfile + ' -> ' + dstfile);

  // read source file
  var srcjson = grunt.file.read(srcfile);
  var srcdata = JSON.parse(srcjson);

  // read target file
  var dstjson, dstdata;
  if (grunt.file.exists(dstfile)) {
    dstjson = grunt.file.read(dstfile);
    dstdata = JSON.parse(dstjson);
  } else {
    dstjson = srcjson; // copy for indent&trailer detection
    dstdata = {}; // empty document
  }

  // indent
  var spacer = dstjson.split(/[\r\n]+([\x20\t]+)\"/)[1];

  // newline at end of file
  var lastline = dstjson.split(/([\r\n]+)/).splice(-2);
  var trailer = (lastline[1] === '') ? lastline[0] : '';

  // projection fields
  var fields = options.fields;
  if (!fields) grunt.fatal('Empty update fields: ' + fields);

  // check number of fields to quote
  var list = Object.keys(fields).filter(function(key) {
    return fields[key];
  });
  if (!list.length) grunt.fatal('Invalid update fields: ' + JSON.stringify(fields));

  // read fields from source
  // var projector = obop.view(fields);
  // var $set = projector(srcdata);
  var $set = view(srcdata, fields);

  // update fields to target
  var update = {
    $set: $set
  };
  var updater = obop.update(update);
  var outdata = updater(dstdata);

  // write target JSON
  var outjson = JSON.stringify(outdata, null, spacer) + trailer;
  grunt.file.write(dstfile, outjson);
}

function view(src, fields) {
  var out = {};
  var undef;
  Object.keys(fields).forEach(function(key) {
    var val = get(src, key);
    if (val === undef) val = "";
    out[key] = val;
  });
  return out;
}

function get(src, key) {
  if (!src || 'object' !== typeof src) src = {};
  var pos = key.indexOf(".");
  if (pos < 0) return src[key];
  var pre = key.substr(0, pos);
  var post = key.substr(pos + 1);
  return get(src[pre], post);
}
