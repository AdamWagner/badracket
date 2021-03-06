/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   SM2
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var br_sm2 = function(){

  var sm2_settings = {
    url: badracket.utils.envCheck('/brv5-prod/swf', '/swf', '/swf'),
    flashVersion: 9,
    debugMode: false,
    flashPollingInterval: 125,
    html5PollingInterval: 125,
    useHighPerformance: true
  };

  function setupSM2( onSMReady) {
    console.log('setting up sm2 ********');
    soundManager.setup( sm2_settings );
    soundManager.onready(function(){
      onSMReady();
    });
  }


  function whilePlaying( sound ){
    var duration     = (sound.sampleTrack ) ? badracket.utils.stringToTime('0:30') : badracket.utils.stringToTime( br_player.state.currSong.duration ),
        position     = sound.position,
        isSliding    = br_player.state.isSliding;
        playbarWidth = ( (position / duration) * 100 ).toFixed(2) + '%';

    if (!isSliding && br_player.state.currSong.sm2_obj === sound ) {      // if not sliding and recieving current song
      br_player.ui.el.progressBar.css('width', playbarWidth);             // update progress bar ...
      br_player.ui.el.progressTime.text( badracket.utils.msToTime(position) );  // ... and time progress
    }
  }

  function onFinish( sound ) {
    console.log('on finish ran');
    sound.setPosition( 0 );                     // rewind song
    br_player.ui.handlers.nextPrev( 'next' );   // go to next song
    br_mixpanel.track('Song Ended', { songUrl : sound.url, duration : badracket.utils.msToTime(sound.duration) });
    mixpanel.people.increment("Songs finished", 1);
  }

  var songCount = 0;
  function createSound( song, isInline ) {

    console.log('create sound ran');

    mixpanel.people.increment("Songs started", 1);
    br_mixpanel.track('Song started');

    if ( isInline ) {
       return soundManager.createSound({
        id:'brSound' + songCount++,
        url:song.songUrl,
        autoLoad: true
      });
    }

    return soundManager.createSound({
      id:'brSound' + songCount++,
      url:song.songUrl,
      autoLoad: true,
      onplay: function() { br_player.state.isPlaying = true; s.win.trigger('sm2-play-event'); },
      onresume: function() { br_player.state.isPlaying = true; s.win.trigger('sm2-play-event');  },
      onpause: function() { br_player.state.isPlaying = false; },
      onstop: function() { br_player.state.isPlaying = false; },
      whileplaying: function() { whilePlaying( this ); },
      onfinish: function() { onFinish( this ); }
    });
  }


  function previousLoadCheck(){
    var lastPlayed = br_player.history.song.lastPlayed();

    if ( typeof lastPlayed !== 'undefined' && ('sm2_obj' in lastPlayed) ) {
      if ( lastPlayed.sm2_obj.loaded === false ) {
        lastPlayed.sm2_obj.unload();  // if previous song not loaded, stop loading to avoid buildup
      }
    }
  }

  function playPause ( song, isPause, isInline ) {

    console.log('play-pause ran');

    previousLoadCheck();

     if ( !('sm2_obj' in song) ) {                                // if sm2_object doesn't exist
       song.sm2_obj = createSound( song, isInline );              // ... create sound
     }

     if ( song.isSampleTrack === '0' && !$('html').hasClass('fb-logged-in') ) {
      br_player.logic.attach30SecondListener( song );              // attach 30 second listener
      song.sm2_obj.sampleTrack = true;
     } else {
      song.sm2_obj.sampleTrack = false;
      br_player.logic.remove30SecondListener( song );              // attach 30 second listener
     }

     br_player.ui.render.sampleState( song );

    if ( isPause ) {
      song.sm2_obj.pause(); // seems to work fine, not rewinding
    } else {
      song.sm2_obj.togglePause();                                  // play / pause sound
    }

  }

  return {
    setup : setupSM2,
    createSound : createSound,
    playPause : playPause,
    onFinish : onFinish
  };

}();

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Inline Player
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var br_inline_player = function(){

  var allSongs = [];

  function songAlreadyExists ( songURL ) {
    var exists;
    _.each( allSongs, function( song ) {
        if ( song.songUrl === songURL ) {
          exists = song;
        }
    });
    return exists;
  }

  var bindUI = {
    playClick: function(){
      console.log('inline-play-click-bound');
        s.body.on({
          click : function(e){ handlers.playClick(e); }
        }, '.inline-play-pause' );
      }
    };

  var handlers = {
    playClick: function(e){
      var el = $(e.target).closest('.inline-player'),
          songURL = el.data('song-url'),
          exists = songAlreadyExists( songURL ),
          button = el.find('.inline-play-pause');

      s.win.trigger('vimeo-play-event', songURL);

      if ( exists ) {
        exists.sm2_obj.togglePause();
        var icn2 = exists.sm2_obj.paused ? 'm' : 'n';
        button.attr('data-icon', icn2);
      } else {
        var song = {songUrl : songURL };
        allSongs.push(song);
        br_sm2.playPause( song, false, true); // song, isPause, isInline
        button.attr('data-icon', 'n');
        s.win.on('sm2-play-event vimeo-play-event', function( _ , songURL){
          if ( songURL === song.songUrl ) { return false; }
          song.sm2_obj.pause();
          button.attr('data-icon', 'm');
        });
      }
    }
  };

  return {
    bindUI : bindUI
  };
}();

br_inline_player.bindUI.playClick();


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Player
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var br_player = function() {
  /*

  TOC:
    * state
    * ui
    * logic
    * albumData
    * history
  */

  var state = {
    isPreviewSong : false,
    isSliding : false,
    isPlaying : false,
    currSong : null,
    currAlbum : null
  };

  var ui = function() {

    var el = {
      playerWrapper : $('.audio-player-wrapper'),
      player : $('.audio-player'),
      song : $('.audio-player .song'),
      artist : $('.audio-player .artist'),
      albumLink : $('.audio-player .view-full-album'),
      progressBar : $('.audio-player .progress-bar'),
      progressTime : $('.audio-player .progress-time'),
      currentTrack : $('.audio-player .current-track'),
      totalTracks : $('.audio-player .total-tracks'),
      slider : $('.slider'),
      playButton : $('.play-pause'),
      prevButton : $('.previous'),
      nextButton : $('.next'),
      ctaWrap : $('.support-band'),
      ctaButton : $('.support-band-button')
    };

    var iconFont = {
      play : 'm',
      pause : 'n',
      speaker : 's'
    };

    var render = {

      init : function( album , song ) {
        el.player.addClass('ready');
        if ( album.kind === 'show' ) {
          el.artist.html( song.artist );
          var actualDate = new Date(album.date.split(' ')[0]);
          var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()+1); // create new increased date
          var humanDate = date("M j", newDate ); //if not split, bug in safari and FF

          el.albumLink.find('.show').text('Playing ' + humanDate + ': ').show();
          el.albumLink.find('.target').text('view show');
          el.albumLink.find('.track-count').hide();
          el.ctaWrap.attr('data-toggle', 'none');
          el.ctaWrap.attr('href', album.albumUrl);
          el.ctaButton.text('Get Tickets');
          el.ctaButton.removeClass('get-album');
        } else if ( album.kind == 'compilation' ) {

          el.artist.html( song.artist );
        } else {
          if ( song.isSampleTrack != 1 && !$('html').hasClass('fb-logged-in')) {
            el.player.addClass('preview-song');
          } else {
            el.player.removeClass('preview-song');
          }
          el.albumLink.find('.show').hide();
          el.artist.html( album.artist );
          el.albumLink.find('.track-count').show();
          el.albumLink.find('.target').text('View album');
          el.ctaWrap.attr('data-toggle', 'modal');
          el.ctaWrap.attr('href', '#buy-album-form');
          el.ctaButton.text('Get Album');
          el.ctaButton.addClass('get-album');
        }

        el.song.html( song.songTitle );
        el.progressBar.css('width','0%');
        el.progressTime.html( song.duration );
        el.albumLink.attr( 'href', album.albumUrl );
        el.currentTrack.html( parseInt(song.trackNumber , 10) );
        el.totalTracks.html( album.tracks.length );
      },

      playState : function() {
        var icn = state.isPlaying ? iconFont.pause : iconFont.play;
        el.playButton.attr('data-icon', icn);
      },

      sampleState : function( song ){
        if ( song.isSampleTrack != 1 && !$('html').hasClass('fb-logged-in')) {
          el.player.addClass('preview-song');
        } else {
          el.player.removeClass('preview-song');
        }
      },

      updateTime : function ( time ) {
        el.progressTime.html( time );
      }
    };

    var handlers = {

      playClick : function() {
        br_player.logic.targetSong( state.currAlbum, state.currSong );
        render.playState();
        br_mixpanel.track('Click: Play / Pause');
      },

      albumClick : function( e ) {
        var target = $(e.target);
        if ( br_state.viewGet() === 'album-detail' || target.closest('a').hasClass('link-to-album') ) {
          return false; // disable handler on album-detail page
        }
        e.preventDefault();
        e.stopPropagation();

        var albumName     = target.closest('.album').attr('data-album-title'),
            targetAlbum   = albumData.getAlbumByName( albumName ),
            targetSong    = albumData.sampleSong( targetAlbum );

        logic.targetSong( targetAlbum, targetSong);
        br_mixpanel.track('Click: Album', { albumTitle : albumName });
      },

      songClick : function( e ) {
        var albumName     = $('[data-album-title]').attr('data-album-title'),
            targetAlbum   = albumData.getAlbumByName( albumName ),
            songIndex     = parseInt( $(e.target).closest('.song').attr('data-track-number') , 10 ) - 1,
            targetSong    = targetAlbum.tracks[songIndex];

        logic.targetSong( targetAlbum, targetSong );
        br_mixpanel.track('Click: Song', { songTitle : targetSong.songTitle });
      },

      nextPrev : function( direction ) {
        var nextAlbumSong, prevAlbumSong;
          if ( direction === 'next' ) {
            nextAlbumSong = history.song.next();  // [ album, song ]
            logic.targetSong( nextAlbumSong[0], nextAlbumSong[1] );
          } else {
            previousAlbumSong = history.song.previous();  // [ album, song ]
            logic.targetSong( previousAlbumSong[0], previousAlbumSong[1] );
          }
          br_mixpanel.track('Click: Next / Previous');
      },

      buyAlbum : function(e){
        e.preventDefault();
        var album = br_player.state.currAlbum,
            title = album.albumName,
            file = album.zipFile,
            price = '$' + album.price + '.00',
            priceCents = album.price * 100,
            artist = album.artist,
            cover = album.coverUrl;

        if ( parseInt(album.price, 10) === 0 ) {
          badracket.setupDownloadForm(cover, title, artist, price, file);
        } else {
          badracket.setupPayForm(cover, title, artist, price, file);
        }
        br_mixpanel.track('Click: Buy Album');
      },

      buyAlbumHover : function(){
          badracket.utils.loader.require( [ br_scripts.payments ], paymentsLoaded() );
          function paymentsLoaded(){
            console.log('yep');
             s.body.off('hover' , '.support-band-button' );
          }
      },

      buyAlbumDetail : function(e){
        e.preventDefault();
        var albumTitle = $('[data-album-title]').attr('data-album-title'),
            album = br_player.albumData.getAlbumByName(albumTitle),
            title = album.albumName,
            file = album.zipFile,
            price = '$' + album.price + '.00',
            priceCents = album.price * 100,
            artist = album.artist,
            cover = album.coverUrl;

        console.log(album);

        if ( parseInt(album.price, 10) === 0 ) {
          badracket.setupDownloadForm(cover, title, artist, price, file);
        } else {
          badracket.setupPayForm(cover, title, artist, price, file);
        }
        br_mixpanel.track('Click: Buy Album');
      },

      whileSliding : function( event, ui, playbar ) {
        el.progressBar.css( 'width', ui.value + '%' );
      },

      slideStart : function() {
        state.isSliding = true;
        br_mixpanel.track('Drag: Progress bar');
      },

      slideStop : function( event, ui) {
        state.isSliding = false;
        var smPosition;
        if ( br_player.state.currSong.isSampleTrack === '0' && !$('html').hasClass('fb-logged-in')) {
          smPosition = ( ui.value / 100 ) * 30000;
        } else {
          smPosition = ( ui.value / 100 ) * badracket.utils.stringToTime( state.currSong.duration );
        }
        state.currSong.sm2_obj.setPosition( smPosition );
      },

      rewind : function() {
        s = br_player.history.song.current();
        if ( s.sm2_obj ) {
          s.sm2_obj.setPosition(0);
        }
      }
    };

    var bindui = {
      play : function() {
        s.body.on({
          click : function(){ handlers.playClick(); }
        }, '.play-pause' );
      },
      next : function() {
        s.body.on({
          click: function(){  handlers.nextPrev('next'); }
          }, '.audio-player .next' );
      },
      previous : function() {
        s.body.on({
          click: function(){  handlers.nextPrev('prev'); }
          }, '.previous' );
      },
      album : function() {
        s.body.on({
          click : function(e){ handlers.albumClick(e); }
        }, '.album' );
      },
      song : function() {
        s.body.on({
          click : function(e){ handlers.songClick(e); }
        } , '.song' );
      },
      buyAlbum : function() {
         s.body.on({
          click : function(e){ handlers.buyAlbum(e); }
        } , '.get-album' );
      },
      buyAlbumDetail : function() {
         s.body.on({
          click : function(e){ handlers.buyAlbumDetail(e); }
        } , '.buy-album-detail' );
      },
      buyAlbumHover : function() {
       s.body.on({
          hover : function(e){ handlers.buyAlbumHover(e); }
        } , '.support-band-button, .buy-album-detail' );
      },
      slider : function() {
        el.slider.slider({
          step: 0.01,
          slide: function( event, ui ) { handlers.whileSliding( event, ui ); },
          start: function() { handlers.slideStart(); },
          stop: function(event, ui) { handlers.slideStop( event, ui ); }
        });
      }
    };

    return { // ui {}
      el : el,
      handlers : handlers,
      bindui : bindui,
      render : render
    };

  }();


  var logic = function(){

    function activeStyle( targetAlbum, targetSong, mode ) { // modes are toggle, clear
      var songDOM = $('.song[data-track-number="'+ targetSong.trackNumber +'"]'),
          albumDOM =  $('.album[data-album-title="'+ targetAlbum.albumName +'"]'),
          currentView = br_state.viewGet();
          console.log(currentView);

      if ( currentView === 'album-detail' || currentView === 'show-detail' ) {
        if ( $('[data-album-title]').attr('data-album-title') === targetAlbum.albumName ) {
          if ( mode === 'toggle') {
            songDOM.toggleClass('song-playing');
          } else {
            songDOM.removeClass('song-playing');
          }
        }
      } else {
        if ( mode === 'toggle' ) {
          albumDOM.toggleClass('playing');
        } else {
          albumDOM.removeClass('playing');
        }
      }
    }

    function targetSongLogic( targetAlbum, targetSong, isPause ) {
      if ( targetSong.songTitle !== state.currSong.songTitle ) {

        if ( typeof state.currSong.sm2_obj !== 'undefined') {
          state.currSong.sm2_obj.setPosition(0);
        }

        ui.render.init( targetAlbum, targetSong );
        activeStyle( state.currAlbum, state.currSong, 'clear' );
        if ( state.isPlaying ) { state.currSong.sm2_obj.stop(); }
        history.update( targetAlbum, targetSong );
      }

      activeStyle( targetAlbum, targetSong, 'toggle' );
      br_sm2.playPause( targetSong , isPause );
      ui.render.playState();
    }

    function attach30SecondListener ( song ) {
      var s = song.sm2_obj;
       s.onPosition(26000, function(eventPosition) {                 // fire at 30 seconds
        fadeOutSound( s );
      });
       s.onPosition(30000, function() {
        br_sm2.onFinish( song.sm2_obj );
      });
    }

    function remove30SecondListener ( song ) {
      var s = song.sm2_obj;
      s.clearOnPosition(26000);
      s.clearOnPosition(30000);
    }

    function fadeOutSound ( s ) {
      var vol = s.volume;
      if (vol === 0) {
        setTimeout(function() { s.setVolume(100); }, 1000); // undo fadeout after 1sec
        return false;                                       // stop recursion
      }
      s.setVolume( Math.min(100 , vol - 1) );
      setTimeout(function(){ fadeOutSound(s); } , 40);
    }

    return { // logic {}
      targetSong : targetSongLogic,
      attach30SecondListener : attach30SecondListener,
      remove30SecondListener : remove30SecondListener
    };

  }();

  /*- AlbumData -*/
  var albumData = function(){

    var albums = [], numAlbums;

    function receiveData( cleanJSON ) {
      albums = albums.concat(cleanJSON);
      numAlbums = albums.length;
    }

    console.log('set data method ready');

    function getAlbumByName( albumName ) {
      return _.find(albums, { 'albumName' : albumName });
    }

    function findSampleSong ( album ) {
      var tracks = album.tracks;
      for (var i = 0; i < tracks.length; i++) {
        if (parseInt(tracks[i].isSampleTrack, 10) == 1) {
          return tracks[i];
        }
      }
    }

    return { // albumData {}
      getAlbumByName : getAlbumByName,
      sampleSong : findSampleSong,
      set : receiveData,
      get : function() { return albums; }
    };

  }();

  /*- History -*/
  var history = function(){

    var historyIndexes = [],
        currentAlbumIndex,
        currentSongIndex;

    function updateHistory( album, track ) {
      currentAlbumIndex = albumData.get().indexOf( album );
      currentSongIndex = album.tracks.indexOf( track );
      historyIndexes.push( [ currentAlbumIndex, currentSongIndex ] );
      updateState( album, track );
      console.log('updatehistory ran');
    }

    function get() {
      return historyIndexes;
    }

    function updateState( album, track ) {
      console.log(state);
      state.currAlbum = album;
      state.currSong = track;
    }

    function historyLen(){
      return historyIndexes.length;
    }

    var album = function(){

      function current() {
        return albumData.get()[ currentAlbumIndex ];
      }

      function next(){
        return albumData.get()[ currentAlbumIndex + 1 ];
      }

      function previous(){
        return albumData.get()[ currentAlbumIndex - 1 ];
      }

      function random() {
        var albums = br_player.albumData.get();
        return albums[ Math.round( Math.random( 0, albums.length )) ];
      }

      return { // album {}
        current : current,
        next : next,
        previous : previous,
        random : random
      };

    }();

    var song = function() {

      function current() {
        return  albumData.get()[currentAlbumIndex].tracks[currentSongIndex];
      }

      var albums, numAlbums, albumTrackLen, nextAlbum, previousAlbum;

      function populateScope() {
        albums        = albumData.get();
        numAlbums     = albums.length;
        albumTrackLen = state.currAlbum.tracks.length;
        nextAlbum     = history.album.next();
        previousAlbum = history.album.previous();
      }

      function next() {
        populateScope();
        var nextIndex = currentSongIndex + 1;

        if ( nextIndex >= albumTrackLen ) {
          if ( currentAlbumIndex >= numAlbums - 1 ) {
            var firstAlbum = albums[0],
                firstAlbumSong = firstAlbum.tracks[0];
            return [ firstAlbum, firstAlbumSong ];
          } else {
            var firstSong = nextAlbum.tracks[0];
            return [ nextAlbum, firstSong ];
          }
        } else {
          nextSong = state.currAlbum.tracks[nextIndex];
          return [ state.currAlbum, nextSong ];
        }
      }

      function previous() {
        populateScope();
        var previousIndex = currentSongIndex - 1;

        if ( previousIndex < 0 ) {
          if ( currentAlbumIndex <= 0 ) {
            var lastAlbum = albums[numAlbums - 1],
                lastAlbumSong = lastAlbum.tracks[lastAlbum.tracks.length - 1];
            return [ lastAlbum, lastAlbumSong ];
          } else {
            var lastSong = previousAlbum.tracks[previousAlbum.tracks.length - 1];
            return [ previousAlbum, lastSong ];
          }
        } else {
          previousSong = state.currAlbum.tracks[previousIndex];
          return [ state.currAlbum, previousSong ];
        }
      }

      function lastPlayed() {
        var previousHistory = historyIndexes[ historyIndexes.length - 2 ],
            previousAlbumIndex,
            previousSongIndex;

        if ( typeof previousHistory !== 'undefined' ) {
            previousAlbumIndex = previousHistory[0],
            previousSongIndex = previousHistory[1];
            return albumData.get()[previousAlbumIndex].tracks[previousSongIndex];
        }
      }

      return { // song {}
        current : current,
        next : next,
        previous : previous,
        lastPlayed : lastPlayed
      };

    }();

    return { // history {}
      get : get,
      update : updateHistory,
      length : historyLen,
      album : album,
      song : song
    };

  }();

  return { // player {}
    state : state,
    ui : ui,
    logic : logic,
    albumData : albumData,
    history : history
  };

}();



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Subscribe
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

$.subscribe('/view/change', updateView('/view/change'));   // triggered by djaxLoad() + load()

function updateView (name) {
  return function(_, url) {
    br_state.viewSet(url);
  };
}



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Do the stuff
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */



var init = function(){

  var ready = {
    sm : false,
    album: false,
    show: false
  };

  function loadSM() {
    console.log('trying to load sm');
    if( typeof soundManager !== 'undefined' ) {
      br_sm2.setup( smReady );
    } else {
      setTimeout(function() { loadSM(); }, 125);
    }
  }

  function smReady() {
    console.log('Soundmanager ready');
    ready.sm = true;
    s.win.on('vimeo-play-event', function(){
      var a = br_player.state.currAlbum;
      var s = br_player.state.currSong;
      br_player.logic.targetSong(a,s,true);
    });
    readyCallback();
  }

  function dataReady(type) {
    console.log('Album data ready');
    ready[type] = true;
    readyCallback();
  }

  function readyCallback() {
    if (!ready.sm || !ready.album || !ready.show ) { return; }
    console.log('everything is loaded');
    doMoreStuff();
  }

  return {
    loadSM : loadSM,
    dataReady : dataReady,
    readyState : ready,
    init : init

  };

}();


init.loadSM();

function doMoreStuff() {
  console.log('do more stuff ran');
  var album = br_player.history.album.random();
  var song = br_player.albumData.sampleSong(album);
  br_player.history.update(album, song);
  br_player.ui.render.init(album, song);
  br_player.ui.bindui.album();
  br_player.ui.bindui.song();
  br_player.ui.bindui.slider();
  br_player.ui.bindui.play();
  br_player.ui.bindui.next();
  br_player.ui.bindui.buyAlbum();
  br_player.ui.bindui.buyAlbumDetail();
  br_player.ui.bindui.buyAlbumHover();
  br_player.ui.bindui.previous();
}









