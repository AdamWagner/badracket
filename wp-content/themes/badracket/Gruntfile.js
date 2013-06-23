module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    compass: {
       dist: {
         options: {
           config: 'config.rb'
         }
       }
    },

    jshint: {
        options: {
            /* relax */
            eqeqeq: false,
            indent: false,
            eqnull: true,
            // globalstrict: true,
            strict: false,
            smarttabs: true,
            /* enforce */
            curly: true,
            eqnull: true,
            browser: true,
            globals: { jQuery: true },
        },
        all: [
          'js/src/base/*.js',
          ],
    },

    concat: {
       base: {
          src: [
           'js/src/lib/jquery/jquery.js',
           'js/src/lib/angular/angular.js',
           'js/src/data.js',
           'js/src/lib/lodash.js',
           'js/src/app.js',
          ],
          dest: 'js/build/base.js'
       },
    },

    uglify: {
      first: {
        files: {
          'js/build/base.min.js' : ['js/build/base.js'],
        }
      }
    },

    hashres: {
      options: {
        fileNameFormat: '${hash}.${name}.${ext}',
        renameFiles: true
      },
      // hashres is a multitask. Here 'prod' is the name of the subtask. You can have as many as you want.
      first : {
        src: ['js/build/base.js'],
        dest: ['external/enqueue-static-assets.php'],
      },
    },

    clean: {
      initial: ['js/build/*.js'],
      post: [
      'js/build/br_facebook.js',
      'js/build/br_audio-player.js',
      'js/build/mixpanel.js',
      'js/build/payments.js',
      'js/build/post-load.js',
      'js/build/mobile.js',
      'js/build/base.js'
      ]
    },

    watch: {
       scripts: {
         files: ['sass/*.scss','js/src/*.js', '*.html', '*.php', 'assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'],
         tasks: ['default'],
         options: {
           nospawn: false,
           livereload : true,
         },

       },
    },

  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', [
    'clean:initial',
    'compass',
    'jshint',
    'concat:base',
    // 'uglify:first',
    'hashres:first',
    'clean:post',
    ]);

};










