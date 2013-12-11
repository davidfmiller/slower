module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint : {
      files : ['public/assets/js/*.js'],
    },

    uglify: {
      js: {
        options: {
          mangle: false
        },
        files: {
//          'public/assets/js/strava.js': ['scripts/strava.js']
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
        files : ['public/assets/js/*.js'],
        tasks : ['jshint']
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