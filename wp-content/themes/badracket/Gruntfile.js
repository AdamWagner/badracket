/*

Ideas for sass, etc:
https://gist.github.com/wbond/5337600

https://gist.github.com/jwebcat/5261222

https://gist.github.com/fayimora/5528552

https://gist.github.com/stephenplusplus/5647725

*/


/* 
TODO

[ ] modularize br_audio-player.js
[ ] modularize main.js into pre and post load
[ ] separate build process for hashres
[ ] file watching
[ ] sass
[ ] deploy to staging

*/


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
          'js/src/audio-player/*.js',
          'js/src/facebook/*.js',
          'js/src/post-load/*.js',
          'js/src/payments.js','js/src/mixpanel.js'
          ],
    },

    concat: {
       audioPlayer: {
         src: [
          'js/src/lib/jquery-ui-1.9.2.custom.js',
          'js/src/lib/soundmanager2.js',
          'js/src/audio-player/br_audio-player.js',
         ],
         dest: 'js/build/br_audio-player.js'
       },
       facebook : {
         src: [
          'js/src/facebook/br_facebook.js',
         ],
         dest: 'js/build/br_facebook.js'
       },
       mobile : {
         src: [
          'js/src/lib/jquery.tap.js',
          'js/src/mobile/mobile.js',
         ],
         dest: 'js/build/mobile.js'
       },
       payments : {
         src: [
          'js/src/lib/stripe.js',
          'js/src/lib/jquery.payments.js',
          'js/src/lib/jquery.form.js',
          'js/src/payments.js',
         ],
         dest: 'js/build/payments.js'
       },
       postLoad : {
         src: [
            'js/src/post-load/post-load.js',
            'js/src/lib/froogaloop.js',
            'js/src/lib/bootstrap-modal.js',
            'js/src/lib/bootstrap-carousel.js',
            'js/src/lib/underscore.js',
            'js/src/lib/jquery.fitvids.js',
         ],
         dest: 'js/build/post-load.js'
       },
       base: {
          src: [
           // 'js/src/lib/page.js', // express-style router with context saving
           'js/src/lib/jquery.js',
           'js/src/lib/jquery.djax.js',
           'js/src/lib/enquire.js',
           'js/src/lib/format_date.js',
           'js/src/lib/mixpanel-lib.js',
           'js/src/mixpanel.js',
           'js/src/base/utils.js',
           'js/src/base/br_scripts.js',
           'js/src/base/base.js',
           'js/src/base/normalize-albums.js',
           'js/src/base/router.js',
           'js/src/base/init.js',
          ],
          dest: 'js/build/base.js'
       },
    },

    uglify: {
      first: {
        files: {
          'js/build/post-load.min.js' : ['js/build/post-load.js'],
          'js/build/br_audio-player.min.js' : ['js/build/br_audio-player.js'],
          'js/build/br_facebook.min.js' : ['js/build/br_facebook.js'],
          'js/build/payments.min.js' : ['js/build/payments.js'],
          'js/build/mobile.min.js' : ['js/build/mobile.js']
        }
      },
      second: {
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
      first: {
        // Files to hash
        src: [
          'js/build/br_facebook.min.js',
          'js/build/br_audio-player.min.js',
          'js/build/mixpanel.min.js',
          'js/build/payments.min.js',
          'js/build/post-load.min.js',
          'js/build/mobile.min.js',
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: ['js/src/base/br_scripts.js'],
      },
      second : {
        src: ['js/build/base.min.js'],
        dest: ['external/enqueue-static-assets.php'],
      }
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
         files: ['sass/*.scss','js/src/*/*.js', '*.html', '*.php', 'assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'],
         tasks: ['default'],
         options: {
           nospawn: true,
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
    'compass',
    'clean:initial',
    'concat:audioPlayer',
    'concat:payments',
    'concat:facebook',
    'concat:mobile',
    'concat:postLoad',
    'jshint',
    'uglify:first',
    'hashres:first',
    'concat:base',
    'uglify:second',
    'hashres:second',
    'clean:post',
    ]);

};










