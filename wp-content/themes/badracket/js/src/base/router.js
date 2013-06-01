/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Router
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */




var br_state = function() {

  var viewState = 'unknown';


  var rx = {
    home : s.domain() + '',
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