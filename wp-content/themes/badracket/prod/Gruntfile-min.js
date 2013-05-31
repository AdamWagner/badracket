/*

Ideas for sass, etc:
https://gist.github.com/wbond/5337600

https://gist.github.com/jwebcat/5261222

https://gist.github.com/fayimora/5528552

https://gist.github.com/stephenplusplus/5647725

*/module.exports=function(e){e.initConfig({pkg:e.file.readJSON("package.json"),concat:{audioPlayer:{src:["js/src/audio-player/jquery.js","js/src/audio-player/froogaloop.js"],dest:"js/build/audio-player.js"},facebook:{src:["js/src/facebook/br_facebook.js"],dest:"js/build/br_facebook.js"},payments:{src:["js/src/payments.js"],dest:"js/build/payments.js"},main:{src:["js/src/lib/jquery.js","js/src/lib/jquery.djax.js","js/src/lib/enquire.js","js/src/lib/underscore.js","js/src/lib/format_date.js","js/src/lib/bootstrap-modal.js","js/src/lib/bootstrap-carousel.js","js/src/lib/froogaloop.js","js/src/mixpanel.js","js/src/main.js"],dest:"js/build/main.js"}},uglify:{build:{files:{"js/build/main.min.js":["js/build/main.js"],"js/build/badracket.audio-player.min.js":["js/build/audio-player.js"],"js/build/br_facebook.min.js":["js/build/br_facebook.js"],"js/build/payments.min.js":["js/build/payments.js"]}}},hashres:{options:{fileNameFormat:"${hash}.${name}.cache.${ext}",renameFiles:!0},prod:{src:["js/build/br_facebook.min.js","js/build/badracket.audio-player.min.js","js/build/mixpanel.min.js","js/build/main.min.js"],dest:["js/main.js","external/enqueue-static-assets.php"]}}});e.loadNpmTasks("grunt-contrib-concat");e.loadNpmTasks("grunt-contrib-uglify");e.loadNpmTasks("grunt-hashres");e.registerTask("default",["concat","uglify","hashres"])};