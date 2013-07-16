/*
 * grunt-quote-json
 * https://github.com/kawanet/grunt-quote-json
 *
 * Copyright (c) 2013 kawanet
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
          'Gruntfile.js',
          'tasks/*.js',
          '<%= nodeunit.tests %>',
      ],
      options: {
        'node': true
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    copy: {
      tests: {
        src: 'test/defaults/test2.json',
        dest: 'tmp/test2.json'
      }
    },

    // Configuration to be run (and then tested).
    quoteJson: {
      test1: {
        src: 'package.json',
        dest: 'tmp/test1.json',
        options: {
          fields: {
            name: 1,
            description: 1
          }
        }
      },
      test2: {
        src: 'test/sources/test2.json',
        dest: 'tmp/test2.json',
        options: {
          fields: {
            string: 1,
            numeric: 1,
            object: 1,
            array: 1,
            "children.boy": 1,
            "children.baby": 1
          }
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'quoteJson', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
