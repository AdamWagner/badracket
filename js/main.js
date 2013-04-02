/* @codekit-prepend "lib/jquery.js" */
/* @codekit-prepend "lib/jquery.djax.js" */
/* @codekit-prepend "lib/enquire.js" */
/* @codekit-prepend "lib/underscore.js" */

/*
 * jQuery Tiny Pub/Sub
 * https://github.com/cowboy/jquery-tiny-pubsub
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

(function($) {

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
  BADRACKET APP
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var s,
badracket = {

  settings: {
    bd : $('body'),
    mainContent : $('.main-content'),
    video : $('.video')
  },

  init: function() {
    s = this.settings;
    this.docReady();
    this.load();
    this.djaxLoad();
  },

  enquire: function(){
    enquire
      .register("screen and (max-width : 1024px)", badracket.setupMobile())
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
      match : function() {},
      unmatch : function() {}
    };
  },

  setup: function(){
    badracket.loader.require([
    badracket_theme_path + "/js/prod/badracket.audio-player.min.js",
    badracket_theme_path + "/js/lib/jquery.fitvids.js",
    "//connect.facebook.net/en_US/all.js",
    badracket_theme_path + "/js/prod/br_facebook.min.js"],
        function() {
            // Callback
            console.log('All Scripts Loaded');
            badracket.postSetupTasks();
            s.video.fitVids();
            badracket.doAjaxRequest('album');
            badracket.doAjaxRequest('show');
            setupFacebook();
        });
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


  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Normalize album data
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  stringContains : function(string, search) { return string.indexOf(search) != -1; },

  count_tracks: function(obj) {
    var trackCount = 0;
    for (var prop in obj) {
      if ( badracket.stringContains( prop.toString(), 'songTitle' ) ) {
        trackCount++;
      }
    }
    return trackCount;
  },

 createTrackHierarchy :function (obj, type) {
    var tracks = [];
    var trackCount = badracket.count_tracks(obj);
    for ( var i = 01; i <= trackCount; i++ ) {
      if (i >= 10) { enumerator = i.toString(); } else { enumerator = '0' + i.toString(); }
      if (type === 'album') {
        tracks.push({
          songTitle: obj['_br_songTitle-' + enumerator][0],
          duration: obj['_br_duration-' + enumerator][0],
          trackNumber: obj['_br_songTrackNumber-' + enumerator][0],
          songUrl: obj['_br_songUrl-' + enumerator][0],
          isSampleTrack: obj['_br_isSampleTrack-' + enumerator][0]
        });
      } else {
         tracks.push({
          songTitle: obj['_br_songTitle-' + enumerator][0],
          artist: obj['_br_artist-' + enumerator][0],
          duration: obj['_br_duration-' + enumerator][0],
          trackNumber: obj['_br_songTrackNumber-' + enumerator][0],
          songUrl: obj['_br_songUrl-' + enumerator][0],
          isSampleTrack: 1
        });
      }
    }
    return tracks;
  },

  albumNormalization : function(rawData) {
    return _.map(rawData, function(value, key, list ){
      return {
        artist : value._br_artist[0],
        albumName : value.albumName,
        kind : 'album',
        coverUrl : value._br_cover_url[0],
        buyURL : value._br_buy_url[0],
        zipFile : value._br_zip_file[0],
        tracks : badracket.createTrackHierarchy(value, 'album'),
        albumUrl : value.albumUrl
      };
    });
  },

  albumNormalizationShows : function(rawData) {
    return _.map(rawData, function(value, key, list ){
      var date = value._br_datetime[0];

      return {
        albumName : value.albumName,
        kind : 'show',
        date : date,
        albumUrl : value.albumUrl,
        tracks : badracket.createTrackHierarchy(value, 'show')
      };
    });
  },


  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Get album data via ajax
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  doAjaxRequest: function( type ){
       // here is where the request will happen
       console.log('jquery ajax request ran');
       jQuery.ajax({
            url: 'http://localhost:8888/sites/brv5/wp-br/wp-admin/admin-ajax.php',
            data:{
                 'action':'do_ajax',
                 'fn':'get_latest_posts',
                 'post_type': type,
                 'count':99
                 },
            dataType: 'JSON',
            success:function(data){
                   console.log('got the json');
                   console.log(data);
                   var cleanAlbums;
                   if (type == 'show') {
                    cleanAlbums = badracket.albumNormalizationShows(data);
                   } else {
                    cleanAlbums = badracket.albumNormalization(data);
                   }

                   (function setData(){
                   if ( typeof br_player !== 'undefined' ) {
                    br_player.albumData.set(cleanAlbums);
                   } else {
                    setTimeout(function() {
                      setData();
                    }, 250);
                   }
                   })();

                   init.dataReady();
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
      $('body').djax('.updatable', ['###']);
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

    });
  },

  djaxLoad: function(){

    // when djax element loads, remove loadin class & mimic doc ready stuff
    $(window).bind('djaxLoad', function(e, data) {
      badracket.lazyLoadImg();

      var html = data.response,
          search = '<body class="',
          start = html.indexOf(search) + search.length,
          end = html.indexOf('"', start),
          bodyClass = html.slice( start, end );

      $('body').attr('class', bodyClass);

      $.publish('/view/change', data.url);

      // badracket.soundmanager.djaxInit();
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

  postSetupTasks: function() {
    $.publish('/view/change', document.URL);
  },

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   beforeUnload()
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


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
 }

};


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Page State
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


var func = function(fn, params) {
    return function() {
        fn.apply(this, params);
    };
};

var sayHi = function(word) { console.log(word); };

var test = func(sayHi, ['hi there fuckeeeeerrr!']);




function facebookTest(){
  var f = br_facebook;
  console.log('fb test ran');
  if ( f.user.first_name && f.user.likesBR && f.user.eventsAttending.length > 0 && f.BR.events.length > 0 ) {
    console.log('fb test passed');
    console.log(f.user.first_name);
    return true;
  }
}


var br_state = function() {

  var viewState = 'unknown';

  var urls = {
    home : 'http://localhost:8888/sites/brv5/wp-br/',
    albumDetail : 'album=',
    showDetail : 'show='
  };

  function viewSet( url ) {
    console.log('view set ran and url is ' + url);
    if ( typeof url === 'undefined' ) { url = window.location.toString(); }

    if ( badracket.stringContains( url, urls.albumDetail ) ) {
      viewState = 'album-detail';
      setupAlbumDetail();
    } else if ( url === urls.home ) {
      viewState = 'home';
    } else if ( badracket.stringContains( url, urls.showDetail ) ) {
      viewState = 'show-detail';

      if ( facebookTest() ) {
        setupShow();
      } else {
        var setupShowFunc = func(setupShow, []);
        br_facebook.logic.callstack.push(setupShowFunc);
      }

    } else {
      viewState = 'unknown';
    }

    applyViewState(viewState);

    return viewState;

  }

  function viewGet() {
    return viewState;
  }

  function applyViewState(viewState) {
    console.log('apply view state ran');
    $('body').attr('data-view', viewState);
  }

  function setupAlbumDetail(){
    if ( br_player.state.isPlaying ) {
      if ( br_player.state.currAlbum.albumName === $('[data-album-title]').attr('data-album-title') ) {
        var trackNumber = br_player.state.currSong.trackNumber;
        $('[data-track-number="'+ trackNumber +'"]').addClass('song-playing');
      }
    }
  }

  function setupShow() {
    console.log('setup show ran just fine, and username is ' + br_facebook.user.first_name);
  }


  return {
    viewSet : viewSet,
    viewGet : viewGet
  };

}();




badracket.init();

