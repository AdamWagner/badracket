/* @codekit-prepend "lib/jquery.js" */
/* @codekit-prepend "lib/jquery.djax.js" */
/* @codekit-prepend "lib/enquire.js" */
/* @codekit-prepend "lib/underscore.js" */
/* @codekit-prepend "lib/format_date.js" */
/* @codekit-prepend "lib/bootstrap-modal.js" */
/* @codekit-prepend "lib/bootstrap-carousel.js" */
/* @codekit-prepend "lib/froogaloop.js" */


/*
Consider using
https://github.com/jakiestfu/Snap.js
for nav menu exposure
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

s = {
  bd : $('body'),
  mainContent : $('.main-content'),
  video : $('.video'),
  domain : (BR_ENV === 'prod') ? 'http://badracket.wpengine.com/' : 'http://localhost:8888/brv5-prod/'
};

badracket = {



  init: function() {
    this.docReady();
    this.load();
    this.djaxLoad();
    this.bindUI();
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
    badracket_theme_path + "/js/prod/badracket.audio-player-min.js",
    badracket_theme_path + "/js/lib/jquery.fitvids.js",
    badracket_theme_path + "/js/lib/mixpanel-lib.js",
    badracket_theme_path + "/js/prod/mixpanel-min.js",
    "//connect.facebook.net/en_US/all.js",
    badracket_theme_path + "/js/prod/br_facebook-min.js"],
        function() {
            // Callback
            console.log('All Scripts Loaded');
            badracket.postSetupTasks();
            s.video.fitVids();
            badracket.doAjaxRequest('album');
            badracket.doAjaxRequest('show');
            badracket.getVimeo();
            badracket.affix();
            br_fb.init();
        });
  },

  affix: function(){
    var offset = $('header.desktop').offset().top,
        force = $('html').hasClass('force-fixed'),
        fixed = false;

    $(window).bind('djaxLoad', function(e, data) {
      force = $('html').hasClass('force-fixed');
      offset = $('header.desktop').offset().top;
    });

    $(window).resize(function(){
      if (!fixed) { offset = $('header.desktop').offset().top; }
    });

    $(document).scroll(function() {
        if( !fixed && !force && $(this).scrollTop() >= offset ) {
          fixed = true;
          $('html').addClass('page-fixed');
        } else if ($(this).scrollTop() <= offset) {
          fixed = false;
          $('html').removeClass('page-fixed');
        }
    });

  },

  px2em: function( elem ){
    var W = window,
        D = document;
    if (!elem || elem.parentNode.tagName.toLowerCase() == 'body') {
        return false;
    }
    else {
        var parentFontSize = parseInt(W.getComputedStyle(elem.parentNode, null).fontSize, 10),
            elemFontSize = parseInt(W.getComputedStyle(elem, null).fontSize, 10);

        var pxInEms = Math.floor((elemFontSize / parentFontSize) * 100) / 100;
        elem.style.fontSize = pxInEms + 'em';
    }
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

  htmlDecode : function ( input ) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  },

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
    br_state.setupNav( { albums:rawData.length } );
    return _.map(rawData, function(value, key, list ){
      return {
        artist : value._br_artist[0],
        albumName : badracket.htmlDecode(value.albumName),
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

    br_state.setupNav( { shows:rawData.length } );
    var now = (new Date().getTime() / 1000).toFixed();

    var upcoming = _.filter( rawData, function( show ) {
      var then = (Date.parse(show['_br_show-date'][0]) / 1000).toFixed();
        return then > now;
    });

    return _.map( upcoming, function( value, key, list ){
      var date = value['_br_show-date'][0];

      return {
        albumName : badracket.htmlDecode(value.albumName),
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

       console.log(s.domain + 'wp-admin/admin-ajax.php');

       jQuery.ajax({
            url: s.domain + 'wp-admin/admin-ajax.php',
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
              console.log('did not get the stuff');
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
          br_state.setupNav({videos:data.length});
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
      $('body').djax('.updatable', ['###','buy-album','carousel','post_photo']);
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
      badracket.lazyLoadImg('onload');
      badracket.lazyLoadImgEl('onload');

    });
  },

  hasTrailngSlash : function(url) {
    return url.charAt(url.length - 1) === "/";
  },

  djaxLoad: function(){

    // when djax element loads, remove loadin class & mimic doc ready stuff
    $(window).bind('djaxLoad', function(e, data) {
      $(window).scrollTop(0);
      badracket.lazyLoadImg('djaxload');
      badracket.lazyLoadImgEl('djaxload');
      $('.video').fitVids(); // important to re-get DOM elements. s.video only has old ones

      br_fb.UI.bindUI.unBindAll();
      br_fb.UI.bindUI.bindAll();

      var html = data.response,
          search = '<body class="',
          start = html.indexOf(search) + search.length,
          end = html.indexOf('"', start),
          bodyClass = html.slice( start, end );

      $('body').attr('class', bodyClass);


      $.publish('/view/change', badracket.hasTrailngSlash(data.url) ? data.url : data.url + '/');

      $('.main-content').removeClass('loading');
    });

    // when djax link clicked, add loading class
    $(window).bind('djaxClick', function(e, data) {
      $('.main-content').addClass('loading');
      $(window).off('sm2-play-event'); // free up the event bound to zombie vimeo iframes
    });
  },

  lazyLoadImg: function(caller){ // CSS Background image
    console.log('lazyloadIMG ran from ' + caller);
    $('.lazyload').each(function() {
     var lazy = $(this);
     var src = lazy.attr('data-src'),
         isSet = lazy.css('background-image');

     if ( isSet === 'none' ) {                                //avoid double running on elements
       $('<img>').attr('src', src).load(function(){
            lazy.css('background-image', 'url("'+src+'")');
            if (lazy.hasClass('fade')) {
              lazy.parent().addClass('loaded');
            } else if (lazy.hasClass('fade-this')) {
              lazy.addClass('loaded');
            }
          });
      }
    });
  },


  lazyLoadImgEl: function(caller){
    console.log('lazyloadImgEl ran from ' + caller);
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


  bindUI: function(){
    $('.welcome-button').on('click',function(){
      $('.badracket-window').removeClass('welcome-state');
    });
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


  var rx = {
    home : s.domain + '',
    albumDetail : 'album/[a-zA-Z0-9-]*/$',
    albumRollup : '/album/$',
    showDetail : 'show/[a-zA-Z0-9-]*/$',
    showRollup : '/show/$',
    photos : '/photos/',
    videos : '/videos/',
    submitMusic: '/submit-music/'
  };


   function urlMatcher(rx, url) {
      return new RegExp(rx).test(url);
  }


  function viewSet( url ) {
    console.log('view set ran and url is ' + url);
    if ( typeof url === 'undefined' ) { url = window.location.toString(); }

    if ( urlMatcher( rx.albumDetail, url ) ) {
      viewState = 'album-detail';
      setupAlbumDetail();
      forceFixed();
    } else if ( urlMatcher( rx.albumRollup, url ) ) {
      viewState = 'album-rollup';
      setupAlbumPage();
      forceFixed();
    } else if ( (BR_ENV==='prod' && rx.home===url ) || (BR_ENV==='local' && rx.home === url ) ) {
      viewState = 'home';
      setupHome();
      setupAlbumPage();
    } else if ( urlMatcher( rx.videos, url ) ) {
      viewState = 'videos';
      setupVideosPage();
      forceFixed();
    } else if ( urlMatcher( rx.photos, url ) ) {
      viewState = 'photos';
      setupPhotos();
      forceFixed();
    } else if ( urlMatcher( rx.showDetail, url ) ) {
      viewState = 'show-detail';
      setupShow();
      forceFixed();
    } else if ( urlMatcher( rx.showRollup, url ) ) {
      viewState = 'show-rollup';
      setupShowRoll();
      forceFixed();
    } else if ( urlMatcher( rx.submitMusic, url ) ) {
      viewState = 'submit-music';
      gf_placeholder();
      forceFixed();     
    } else {
      viewState = 'unknown';
      forceFixed();
    }

    applyViewState(viewState);

    return viewState;

  }

  function viewGet() {
    return viewState;
  }

  function applyViewState(viewState) {
    console.log('apply view state ran. State is ' + viewState);
    $('body').attr('data-view', viewState);
  }

  function forceFixed(){
    $('html').addClass('force-fixed').removeClass('page-fixed');
  }

  function setupAlbumPage(){
    if ( br_player.state.isPlaying ) {
        $('[data-album-title="'+ br_player.state.currAlbum.albumName +'"]').addClass('playing');
    }
  }


  function setupHome(){
  $('html').removeClass('force-fixed');
   if (typeof br_fb.BR.videos !== 'undefined') {
     if ( br_fb.BR.videos.length > 10 ) {
       br_fb.UI.render.videosHome();
     }
   } else {
     $(window).on('videos-loaded', function(){
       br_fb.UI.render.videosHome();
     });
   }
  }


  var countObj = {};
  function setupNav( count ) {
    countObj = _.extend(countObj, count);

    if ( _.keys(countObj).length === 3 ) {
      var a = $('#nav-albums'),
          v = $('#nav-videos'),
          s = $('#nav-shows');

      a.find('.count').html( countObj.albums ).addClass('loaded');
      v.find('.count').html( countObj.videos ).addClass('loaded');
      s.find('.count').html( countObj.shows ).addClass('loaded');
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
        console.log('is indeed attending');
        br_fb.UI.render.rsvpButton(true, $('.show-rsvp'));
      }
    }

    br_fb.user_do_or_wait( checkAttending );

    br_fb.page_do_or_wait( br_fb.UI.render.attending );
    br_fb.user_do_or_wait( br_fb.UI.render.usersAttending );


  }


  function prefetchPhotos(){
    if ( br_fb.BR.photos.length < 50 ) {
      console.log('prefetch photos ran');
       $.when( br_fb.fetch.getBR_albums() ).then(function( r ){
         br_fb.fetch.popPhotos( r );
       });
    }
  }

  function setupPhotos() {
    console.log('setup pohtos ran');

    function blah() {
      $.when( br_fb.fetch.getBR_albums() ).then(function( r ){
        br_fb.fetch.popPhotos( r );
        br_fb.UI.render.renderPhotos();
      });
    }

    if ( br_fb.BR.photos.length < 50 ) {
      console.log('waiting to run render photos');
      br_fb.fbEnsureInit( blah );
    } else {
      console.log('running render photos');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! didnt need to reget photos');
      br_fb.UI.render.renderPhotos();
    }

  }


  return {
    viewSet : viewSet,
    viewGet : viewGet,
    urls : rx,
    setupNav : setupNav
  };

}();


















var gf_placeholder = function() {

  $('.gform_wrapper .gplaceholder')
    .find('input, textarea').filter(function(i){
      var $field = $(this);

      if (this.nodeName == 'INPUT') {
        var type = this.type;
        return !(type == 'hidden' || type == 'file' || type == 'radio' || type == 'checkbox');
      }

      return true;
    })
    .each(function(){
      var $field = $(this);

      var id = this.id;
      var $labels = $('label[for=' + id + ']').remove();
      var label = $labels.last().text();

      if ( label === 'State / Province / Region') { label = 'State'; }

      if (label.length > 0 && label[ label.length-1 ] == '*') {
        label = label.substring(0, label.length-1) + ' *';
      }

      $field[0].setAttribute('placeholder', label);
    });

  var support = (!('placeholder' in document.createElement('input'))); // borrowed from Modernizr.com

  if ( support ) {
    $('input[placeholder], textarea[placeholder]').placeholder({
      blankSubmit: true
    });
  }

};









badracket.init();

