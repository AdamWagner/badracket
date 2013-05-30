module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /* Uglify */
    uglify: {
      build: {
        files: {
          'js/build/br_facebook.min.js' : ['js/br_facebook.js']
        }
      }
    },

    /* HASH RES */
    // https://github.com/Luismahou/grunt-hashres/
    hashres: {
      options: {
        fileNameFormat: '${hash}.${name}.cache.${ext}',
        renameFiles: true
      },
      // hashres is a multitask. Here 'prod' is the name of the subtask. You can have as many as you want.
      prod: {
        // Files to hash
        src: [
          // WARNING: These files will be renamed!
          'js/build/br_facebook.min.js',
          'js/build/badracket.audio-player.min.js',
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: ['js/main.js', 'external/enqueue-static-assets.php'],
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-hashres');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'hashres']);

};