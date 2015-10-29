'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    mocha_istanbul: {
      test: {
        src: 'tests/**/*.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-istanbul')

  grunt.registerTask('build', []);
  grunt.registerTask('test', [
    'mocha_istanbul:test'
  ]);
};
