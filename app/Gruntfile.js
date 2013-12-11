module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint : {
      files : ['scripts/*.js'],
    },

    uglify: {
      js: {
        options: {
          mangle: false
        },
        files: {
          'public/assets/js/slower.js': ['scripts/*.js']
        }
      }
    },

    compass : {
      dist : {
        options : {
          sassDir : 'styles',
          cssDir : 'public/assets/css',
          environment : 'production',
          outputStyle : 'compressed'
        }
      }
    },
    
    watch : {
      css : {
        files : ['styles/*.scss'],
        tasks : ['compass']
      },
      js : {
        files : ['scripts/*.js'],
        tasks : ['jshint', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['compass']);
};