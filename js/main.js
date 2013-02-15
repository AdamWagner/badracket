/* @codekit-prepend "lib/enquire.js" */

var s,
badracket = {

  settings: {
    bd: $('body'),
    playBar: $('.controls .position'),
    playSlider: $('#slider'),
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
        "js/lib/jquery.tap.js"],
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
    "js/lib/soundmanager2.js",
    "js/lib/jquery-ui-1.9.2.custom.js",
    "js/badracket.audio-player.js",
    "js/lib/jquery.fitvids.js"],
        function() {
            // Callback
            console.log('All Scripts Loaded');
            $('.video').fitVids();
            badracket.soundmanager.smSetup();
            if (badracket.hasCookie('sm_currentURL')) {
              badracket.resumePlayback();
            }
        });
    badracket.beforeUnload();
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
    Document.ready()
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  docReady: function(){
    $(document).ready(function(){
      badracket.enquire();
      console.log('document ready fires');
    });
  },
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Window.load()
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  load: function(){
    $(window).load(function(){
      badracket.setup();

      badracket.lazyLoadImg();
      getShit();
    });
  },

  djaxLoad: function(){

    // when djax element loads, remove loading class & mimic doc ready stuff
    $(window).bind('djaxLoad', function(e, data) {
      badracket.lazyLoadImg();
      badracket.soundmanager.djaxInit();
      $('.main-content').removeClass('loading');
      getShit();
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



};

badracket.init();