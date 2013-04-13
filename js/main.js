/* @codekit-prepend "lib/jquery.js" */
/* @codekit-prepend "lib/jquery.djax.js" */
/* @codekit-prepend "lib/enquire.js" */
/* @codekit-prepend "lib/underscore.js" */
/* @codekit-prepend "lib/format_date.js" */
/* @codekit-prepend "lib/bootstrap-modal.js" */
/* @codekit-prepend "lib/froogaloop.js" */


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
    video : $('.video'),
    domain : document.location.origin
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
            badracket.getVimeo();
            br_fb.init();
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
        price : value._br_price[0],
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
       var domain = document.location.origin + document.location.pathname;

       jQuery.ajax({
            url: domain + 'wp-admin/admin-ajax.php',
            data:{
                 'action':'do_ajax',
                 'fn':'get_latest_posts',
                 'post_type': type,
                 'count':99
                 },
            dataType: 'JSON',
            success:function(data){
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

                   init.dataReady( type );
                 },
            error: function(errorThrown){
                 console.log(errorThrown);
            }
       });

  },

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
     Get Vimeo
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  getVimeo : function() {

    var albumID = '1979291',
        api_endpoint = 'http://vimeo.com/api/v2/album/',
        path = '/videos.json?callback=?';

    var url = api_endpoint + albumID + path;

    jQuery.ajax({
         url: url,
         dataType: 'JSON',
         success:function(data){
          br_fb.BR.videos = data;
          $(window).trigger('videos-loaded');
         },
         error: function(errorThrown){
              console.log(errorThrown);
         }
    });

  },

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Document.ready()
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  docReady: function(){
    $(document).ready(function(){
      $('body').djax('.updatable', ['###','buy-album']);
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
      badracket.lazyLoadImgEl();

    });
  },

  djaxLoad: function(){

    // when djax element loads, remove loadin class & mimic doc ready stuff
    $(window).bind('djaxLoad', function(e, data) {
      badracket.lazyLoadImg();
      badracket.lazyLoadImgEl();

      br_fb.UI.bindUI.bindAll();

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


  lazyLoadImgEl: function(){
    $('.lazyload_img').each(function() {
     var lazy = $(this);
     var src = lazy.attr('data-src');
     $('<img>').attr('src', src).load(function(){
          lazy.attr('src', src);
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

var br_state = function() {

  var viewState = 'unknown';

  var domain = document.location.origin + document.location.pathname;

  var urls = {
    home : domain,
    albumDetail : 'album=',
    albumRollup : '?post_type=album',
    showDetail : 'show=',
    showRollup : '=show',
    photos : domain + '?page_id=336',
    videos : domain + '?page_id=160'
  };

  function viewSet( url ) {
    console.log('view set ran and url is ' + url);
    if ( typeof url === 'undefined' ) { url = window.location.toString(); }

    if ( badracket.stringContains( url, urls.albumDetail ) ) {
      viewState = 'album-detail';
      setupAlbumDetail();
    } else if ( badracket.stringContains( url, urls.albumRollup ) ) {
      viewState = 'album-rollup';
      setupAlbumPage();
    } else if ( url === urls.home ) {
      viewState = 'home';
      setupAlbumPage();
      setupVideosPage();
    } else if ( url === urls.videos ) {
      viewState = 'videos';
      setupVideosPage();
    } else if ( url === urls.photos ) {
      viewState = 'photos';
      setupPhotos();
    } else if ( badracket.stringContains( url, urls.showDetail ) ) {
      viewState = 'show-detail';
      setupShow();
    } else if ( badracket.stringContains( url, urls.showRollup ) ) {
      viewState = 'show-rollup';
      setupShowRoll();
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
      console.log(urls.photos);
    console.log('apply view state ran. State is ' + viewState);
    $('body').attr('data-view', viewState);
  }

  function setupAlbumPage(){
    if ( br_player.state.isPlaying ) {
        $('[data-album-title="'+ br_player.state.currAlbum.albumName +'"]').addClass('playing');
    }
  }

  function setupVideosPage(){

    console.log('setup videos page ran');

    if (typeof br_fb.BR.videos !== 'undefined') {
      if ( br_fb.BR.videos.length > 10 ) {
        br_fb.UI.render.videos();
      }
    } else {
      $(window).on('videos-loaded', function(){
        br_fb.UI.render.videos();
      });
    }
  }

  function setupAlbumDetail(){
    if ( br_player.state.isPlaying ) {
      if ( br_player.state.currAlbum.albumName === $('[data-album-title]').attr('data-album-title') ) {
        var trackNumber = br_player.state.currSong.trackNumber;
        $('[data-track-number="'+ trackNumber +'"]').addClass('song-playing');
      }
    }
  }

  function setupShowRoll(){

    function checkAttending(){

      $('.show-rsvp').each(function(){
        var eventID = $(this).data('fb-id');
        if ( br_fb.fetch.isAttending( eventID ) ) {
          br_fb.UI.render.rsvpButton(true, $(this) );
        }
      });

    }

    br_fb.user_do_or_wait( checkAttending );

  }

  function setupShow() {

    var eventID = $('.show-rsvp').data('fb-id');

      if ( br_player.state.isPlaying ) {
        if ( br_player.state.currAlbum.albumName === $('[data-album-title]').attr('data-album-title') ) {
          var trackNumber = br_player.state.currSong.trackNumber;
          $('[data-track-number="'+ trackNumber +'"]').addClass('song-playing');
        }
      }

    function checkAttending(){
      if ( br_fb.fetch.isAttending( eventID ) ) {
        br_fb.UI.render.rsvpButton(true);
      }
    }

    br_fb.user_do_or_wait( checkAttending );

    br_fb.page_do_or_wait( br_fb.UI.render.attending );
    br_fb.user_do_or_wait( br_fb.UI.render.usersAttending );


  }

  function setupPhotos() {
    console.log('setup pohtos ran');

    function blah() {
      $.when( br_fb.fetch.getBR_albums() ).then(function( r ){
        br_fb.fetch.popPhotos( r );
      });
    }

    if ( br_fb.BR.photos.length < 50 ) {
      console.log('waiting to run render photos');
      br_fb.fbEnsureInit( blah );
    } else {
      console.log('running render photos');
      br_fb.UI.render.renderPhotos();
    }

  }


  return {
    viewSet : viewSet,
    viewGet : viewGet
  };

}();




badracket.init();

