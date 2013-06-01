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

    concat: {
       audioPlayer: {
         src: [
          'js/src/lib/jquery-ui-1.9.2.custom.js',
          'js/src/lib/soundmanager2.js',
          'js/src/audio-player/badracket.audio-player.js',
         ],
         dest: 'js/build/br_audio-player.js'
       },
       facebook : {
         src: [
          'js/src/facebook/br_facebook.js',
         ],
         dest: 'js/build/br_facebook.js'
       },
       payments : {
         src: [
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
            'js/src/lib/jquery.fitvids.js',
         ],
         dest: 'js/build/post-load.js'
       },
       base: {
          src: [
           'js/src/lib/jquery.js',
           'js/src/lib/jquery.djax.js',
           'js/src/lib/enquire.js',
           'js/src/lib/underscore.js',
           'js/src/lib/format_date.js',
           'js/src/lib/mixpanel-lib.js',
           'js/src/mixpanel.js',
           'js/src/base/base.js',
           'js/src/base/utils.js',
           'js/src/base/normalize-albums.js',
           'js/src/base/router.js',
          ],
          dest: 'js/build/base.js'
       },
       // css: {
       //   src: 'src/css/*.css',
       //   dest: 'dest/css/concat.css'
       // }
     },

    /* Uglify */
    uglify: {
      build: {
        files: {
          'js/build/base.min.js' : ['js/build/base.js'],
          'js/build/post-load.min.js' : ['js/build/post-load.js'],
          'js/build/br_audio-player.min.js' : ['js/build/br_audio-player.js'],
          'js/build/br_facebook.min.js' : ['js/build/br_facebook.js'],
          'js/build/payments.min.js' : ['js/build/payments.js'],
        }
      }
    },

    /* HASH RES */
    // https://github.com/Luismahou/grunt-hashres/
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
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: ['js/src/base/base.js', 'js/build/base.min.js'],
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
      'js/build/base.js'
      ]
     }

  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean:initial', 'concat', 'uglify', 'hashres','clean:post',]);

};