/* @codekit-prepend "lib/enquire.js" */

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
  BADRACKET APP
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var s,
badracket = {

  settings: {
    bd: $('body'),
    playBar: $('.controls .position'),
    playSlider: $('.slider'),
    audioPlayer: $('.audio-player')
  },

  init: function() {
    s = this.settings;
    this.docReady();
    this.load();
    this.djaxLoad();
  },

  enquire: function(){
    enquire .register("screen and (max-width : 1024px)", badracket.setupMobile())
      .listen();
  },


  setupMobile: function(){
    return {
      setup: function() {
        badracket.loader.require([
        badracket_theme_path + "/js/lib/jquery.tap.js"],
            function() {
                // Callback
                badracket.bindMobileUI();
            });
      },
      deferSetup: true,
      match : function() {
      },
      unmatch : function() {  }
    };
  },

  setup: function(){
    badracket.loader.require([
    badracket_theme_path + "/js/lib/soundmanager2.js",
    badracket_theme_path + "/js/lib/jquery-ui-1.9.2.custom.js",
    badracket_theme_path + "/js/badracket.audio-player.js",
    badracket_theme_path + "/js/lib/jquery.fitvids.js"],
        function() {
            // Callback
            console.log('All Scripts Loaded');
            $('.video').fitVids();
        });
    badracket.beforeUnload();
  },

  setupAlbumPage: function() {
    badracket.loader.require([
    badracket_theme_path + "/js/lib/jqTweets.js",
    badracket_theme_path + "/js/album-page.js"],
        function() {
            // Callback
            console.log('Album page scripts loaded');
        });
  },

   loader: {
      require: function (scripts, callback) {
          this.loadCount      = 0;
          this.totalRequired  = scripts.length;
          this.callback       = callback;

          for (var i = 0; i < scripts.length; i++) {
              this.writeScript(scripts[i]);
          }
      },
      loaded: function (evt) {
          this.loadCount++;

          if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
      },
      writeScript: function (src) {
          var self = this;
          var s = document.createElement('script');
          s.type = "text/javascript";
          s.async = true;
          s.src = src;
          s.addEventListener('load', function (e) { self.loaded(e); }, false);
          var head = document.getElementsByTagName('head')[0];
          head.appendChild(s);
        }
      },

  setCookie: function(key,value,days){
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      expires = "; expires="+date.toGMTString();
    } else {
     expires = "";
   }
   document.cookie = key +"="+value+expires+"; path=/";
    },

  getCookie: function(sKey) {
    if (!sKey || !badracket.hasCookie(sKey)) { return null; }
    return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
  },
  removeCookie: function(key) {
    document.cookie = encodeURIComponent(key) + "=deleted; expires=" + new Date(0).toUTCString() + "; path=/";
  },
  hasCookie: function(sKey) {
    return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Normalize album data
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


  objValueToString: function(obj, key) {
    if (obj.hasOwnProperty(key)) {
       obj[key] = obj[key].toString();
    }
    return obj;
  },

  deleteProperty: function (obj, key) {
      if (obj.hasOwnProperty(key)) {
        delete obj[key];
      }
      return obj;
  },

  renameProperty: function (obj, oldName, newName) {
      if (obj.hasOwnProperty(oldName)) {
          obj[newName] = obj[oldName];
          delete obj[oldName];
      }
      return obj;
  },

  count_tracks: function(obj) {
      var trackCount=0;
      for (var prop in obj) {
        if (prop.toString().contains('songTitle')) {
          trackCount++;
        }
      }
      return trackCount;
  },

  // de-enumerate keys of all track objects within album object
  createAblumHierarchy: function(obj) {
    obj.tracks = [];
    var trackCount = badracket.count_tracks(obj);
    for (var i=1; i <= trackCount; i++) {
      var trackTemp = {};
      for (var prop in obj) {
        var enumerator = prop.split('-')[1];
        if (parseInt(enumerator, 10) === i) { // if property name containers enumerator
          trackTemp[prop] = obj[prop].toString();
          delete obj[prop];
          }
        }
        obj.tracks.push(trackTemp);
      }
  },

  cleanTrackPropKeys: function(array) {
    trackcount = array.length;
    for (i=0; i<trackcount; i++) {
      for (var prop in array[i]) {
        if (prop.contains('duration')) { badracket.renameProperty(array[i], prop, 'duration'); }
        else if (prop.contains('songTitle')) { badracket.renameProperty(array[i], prop, 'songTitle'); }
        else if (prop.contains('TrackNumber')) { badracket.renameProperty(array[i], prop, 'trackNumber'); }
        else if (prop.contains('songUrl')) { badracket.renameProperty(array[i], prop, 'songUrl'); }
        else if (prop.contains('isSampleTrack')) { badracket.renameProperty(array[i], prop, 'isSampleTrack'); }
      }
    }
  },

  cleanAlbumProperties: function(albumObject) {

    // Delete WP properties from album object
    badracket.deleteProperty(albumObject, '_edit_last');
    badracket.deleteProperty(albumObject, '_edit_lock');

    // Clean Album property key names
    // oldName, newName
    badracket.renameProperty(albumObject, '_br_artist','artist');
    badracket.renameProperty(albumObject, '_br_zip_file','zipFile');
    badracket.renameProperty(albumObject, '_br_cover_url','cover');
    badracket.renameProperty(albumObject, '_br_release_date','releaseDate');
    badracket.renameProperty(albumObject, '_br_buy_url','buyUrl');
    badracket.renameProperty(albumObject, '_br_recording_studio','recordingStudio');

    // Set album-level property values to strings instead of arrays
    badracket.objValueToString(albumObject, 'artist');
    badracket.objValueToString(albumObject, 'zipFile');
    badracket.objValueToString(albumObject, 'cover');
    badracket.objValueToString(albumObject, 'releaseDate');
    badracket.objValueToString(albumObject, 'buyUrl');
    badracket.objValueToString(albumObject, 'recordingStudio');
  },

  initAlbumNormalization: function(objArray) {
    console.log('album normalization ran');
    var len = objArray.length;
    for (var i=len; i--;) {
      badracket.createAblumHierarchy(objArray[i]);
      badracket.cleanAlbumProperties(objArray[i]);
      badracket.cleanTrackPropKeys(objArray[i].tracks);
    }
    return objArray;
  },


  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Get album data via ajax
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  doAjaxRequest: function(){
       // here is where the request will happen
       console.log('jquery ajax request ran');
       jQuery.ajax({
            url: 'http://localhost:8888/sites/brv5/wp-br/wp-admin/admin-ajax.php',
            data:{
                 'action':'do_ajax',
                 'fn':'get_latest_posts',
                 'post_type': 'album',
                 'count':99
                 },
            dataType: 'JSON',
            success:function(data){
                   console.log('got the json');
                   var cleanAlbums = badracket.initAlbumNormalization(data);
                   br_audio.albums.set(cleanAlbums);
                   br_doTheStuff();
                 },
            error: function(errorThrown){
                 alert('error');
                 console.log(errorThrown);
            }
       });

  },

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Document.ready()
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  docReady: function(){
    $(document).ready(function(){
      badracket.enquire();

      console.log('document ready fires');

      badracket.doAjaxRequest();





    });
  },

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Window.load()
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  load: function(){
    $(window).load(function(){
      badracket.setup();


      badracket.lazyLoadImg();
      if ($('body').attr('data-view') === 'album') {
        badracket.setupAlbumPage();
      }
    });
  },

  djaxLoad: function(){

    // when djax element loads, remove loadin class & mimic doc ready stuff
    $(window).bind('djaxLoad', function(e, data) {
      badracket.lazyLoadImg();

      badracket.setView(data.url);
      if ($('body').attr('data-view') === 'album') {
        badracket.setupAlbumPage();
      }

      badracket.soundmanager.djaxInit();
      $('.main-content').removeClass('loading');
    });

    // when djax link clicked, add loading class
    $(window).bind('djaxClick', function(e, data) {
      $('.main-content').addClass('loading');
    });
  },

  lazyLoadImg: function(){
    $('.lazyload').each(function() {
     console.log('lazyload ran');
     var lazy = $(this);
     var src = lazy.attr('data-src');
     $('<img>').attr('src', src).load(function(){
          lazy.css('background-image', 'url("'+src+'")');
          if (lazy.hasClass('fade')) {
            lazy.parent().addClass('loaded');
          } else if (lazy.hasClass('fade-this')) {
            lazy.addClass('loaded');
          }
        });
    });
  },



  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Extend javascript prototypes
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */




  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   beforeUnload()
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  beforeUnload: function() {
    window.onbeforeunload = function() {
      // if (badracket.soundmanager.getCurrentSong()) {
      //   var mySound = badracket.soundmanager.getCurrentSong();
      //   if (mySound  && mySound.position) { // sound is playing
      //     badracket.setCookie('sm_lastPosition', mySound.position);
      //     badracket.setCookie('sm_duration', mySound.duration);
      //     badracket.setCookie('sm_paused', mySound.paused);
      //     badracket.setCookie('sm_stopped', mySound.playState);
      //     badracket.setCookie('sm_currentURL', mySound.url);
      //     badracket.setCookie('songTitle', $('.song').text());
      //     badracket.setCookie('artistName', $('.artist').text());
        // }
      // } else {
        // no sound, or not playing etc. Remove play state cookies.
        badracket.removeCookie('sm_lastPosition');
        badracket.removeCookie('sm_paused');
        badracket.setCookie('sm_stopped');
        badracket.removeCookie('sm_currentURL');
        badracket.removeCookie('sm_duration');
        badracket.removeCookie('songTitle');
        badracket.removeCookie('artistName');
      // }
    };
  }, // end beforeUnload

  bindMobileUI: function(){
    $('.menu').on('tap',function(){
      badracket.updatePageState('nav-state');
    });

    $('nav[role="navigation"] a').on('tap',function(){
     s.bd.attr('data-state', 'default-state');
    });

    $('.info').on('tap',function(){
      badracket.updatePageState('info-state');
    });

    $(document).bind("pageinit", function(event) {
      $.event.special.swipe.verticalDistanceThreshold = 40;
      $.event.special.swipe.horizontalDistanceThreshold = 160;
      $.event.special.swipe.durationThreshold = 300;
      $('body').bind('swipeleft', function(){ badracket.updatePageState('info-state'); });
      $('body').bind('swiperight', function(){ badracket.updatePageState('nav-state'); });
    });
  },

  updatePageState: function(pageState){
    if (s.bd.attr('data-state') === 'default-state') {
      s.bd.attr('data-state', pageState);
    } else {
      s.bd.attr('data-state', 'default-state');
    }
  },

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Utilities
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

 msToTime : function(s) {
   var ms = s % 1000;
   s = (s - ms) / 1000;
   var secs = s % 60;
   s = (s - secs) / 60;
   var mins = s % 60;

   if (secs < 10) {secs = "0"+secs;}
   return mins + ':' + secs;
 },

 stringToTime : function(time) {
     time = time.toString().split(/:/);
     return time[0] * 60000 + time[1] * 1000;
 },



};

badracket.init();






