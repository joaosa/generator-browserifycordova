(function() {
  'use strict';

  module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        gruntfile: {
          src: 'Gruntfile.js'
        },
        lib: {
          src: ['lib/**/*.js']
        },
        test: {
          src: ['test/**/*.js']
        }
      },
      simplemocha: {
        options: {
          uid: 'bdd',
          reporter: 'tap'
        },
        all: {
          src: ['test/**/*.js']
        }
      },
      browserify: {
        'dist/bundle.js': ['lib/**/*.js'],
        options: {
          alias: ['lib/<%= projectName %>.js']
        }
      },
      watch: {
        gruntfile: {
          files: '<%%= jshint.gruntfile.src %>',
          tasks: ['jshint:gruntfile']
        },
        lib: {
          files: '<%%= jshint.lib.src %>',
          tasks: ['jshint:lib', 'base']
        },
        test: {
          files: '<%%= jshint.test.src %>',
          tasks: ['jshint:test', 'base']
        }
      },
      copy: {
        dist: {
          files: [{
              expand: true,
              cwd: 'cordova/platforms/android/assets/www/',
              dest: 'cordova/www/',
              src: ['cordova.js', 'cordova_plugins.json']
            }, {
              expand: true,
              cwd: 'dist',
              dest: 'cordova/www/js/',
              src: ['bundle.js']
            }, {
              expand: true,
              cwd: 'css',
              dest: 'cordova/www/css/',
              src: ['data.css']
            }
          ]
        }
      },
      shell: {
        build: {
          command: 'cordova build',
          options: {
            execOptions: {
              cwd: 'cordova'
            }
          }
        },
        run: {
          command: 'cordova run',
          options: {
            stdout: true,
            stderr: true,
            execOptions: {
              cwd: 'cordova'
            }
          }
        }
      }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('deploy', ['shell:build', 'shell:run']);

    // Default task.
    grunt.registerTask('base', ['simplemocha', 'browserify', 'copy:dist']);
    grunt.registerTask('default', ['base', 'watch']);
  };
}());
