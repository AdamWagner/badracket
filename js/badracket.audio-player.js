/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   SM2 setup + management
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var br_sm2 = function(){

  var sm2_settings = {
    url: 'swf',
    flashVersion: 9,
    debugMode: false,
    flashPollingInterval: 125,
    html5PollingInterval: 125,
    useHighPerformance: true
  };

  function setupSM2(callback) {
    soundManager.setup( sm2_settings );
    soundManager.onready(function(){
      callback();
      // update a parent controller object property that soundmanager is ready
    });
  }


  function onPlayResume( sound ) {
    br_state.setPlayState(true);
  }

  function onStopPause( sound ) {
    br_state.setPlayState(false);
  }

  function whileLoading( sound ) {
    var loaded = sound.bytesLoaded,
        total = sound.bytesTotal,
        loadingWidth = ( (loaded / total) * 100 ).toFixed(2) + '%',
        currentSong = br_player.history.currentSong();

    if ( currentSong.sm2_object === sound ) {
      $('.loading').css('width', loadingWidth);
    }

  }

  function whilePlaying( sound ){
    badracket.whilePlayingCounter += 1;
    var currentSong = br_player.history.currentSong(),
        songDuration =  badracket.stringToTime(currentSong.duration),
        soundPosition = sound.position;
        isSliding = br_player.ui.state.isSliding;

    var playbarWidth = ( (soundPosition / songDuration) * 100 ).toFixed(2) + '%';

    if (isSliding !== true && badracket.whilePlayingCounter > 2 && currentSong.sm2_object === sound ) { // delays playbar redraw preventing flash
      $('.controls .position').css('width', playbarWidth);
      $('.sm2_position').text( badracket.msToTime(sm2_object.position) );
    }
  }

  function onFinish( sound ) {
   console.log('on finish ran');
   if (sound.sID) {                           // if it receives the sm2_object
     sound.setPosition(0);                    // rewind progress bar
   } else {                                        // else it recieves songObject
     console.log(sound);
     sound.sm2_object.setPosition(0);
   }
   badracket.handleNextClick('next');              // Advance play, depending on play mode 
  }

  var songCount = 0;
  function createSound( song ) {
    return soundManager.createSound({
      id:'brSound' + songCount++,
      url:song.songUrl,
      autoLoad: true,
      onplay: function() { onPlayResume(); },
      onresume: function() { onPlayResume(); },
      onpause: function() { onStopPause(); },
      onstop: function() { onStopPause(); },
      whileloading: function() { whileLoading(this); },
      whileplaying: function() { whilePlaying(this); },
      onfinish: function() { onFinish(this); }
      // onload: function(){ }
    });
  }

  function runFuncAllSongs( func ) {
    var albums = br_player.albums.get();
    for (var i = albums.length; i--; ) {
      var albumTracks = albums[i].tracks;
      for (var j = albumTracks.length; j--; ) {
          func(albumTracks[j]);
        }
      }
  }

  function stopOtherPlayers(sm2_id) {
    runFuncAllSongs(function(song){
      if (typeof song.sm2_object !== 'undefined' && song.sm2_object.sID !== sm2_id) {
        song.sm2_object.pause();
      }
    });
  }

  function playPause ( song ) {
    if (typeof song.sm2_object === 'undefined') {                   // if sm2_object doesn't exist
      song.sm2_object = createSound(song);                   // ... create sound
    }
    if ( br_state.isPlaying() && song !== br_player.history.song.current() ) {
      console.log('stop other players ran');
      stopOtherPlayers(song.sm2_object.sID);                // pause other sounds
    }
    // badracket.attach30SecondListener(song);                         // attach 30 second listener
    console.log(song.sm2_object);
    song.sm2_object.togglePause();                                  // play / pause sound
  }

  return {
    setup : setupSM2,
    createSound : createSound,
    playPause : playPause
  };

}();



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Page State
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


var br_state = function() {

  var isPlaying = false;


  var viewState = 'unknown';



// if ($('body').attr('data-view') === 'album') {
//   badracket.setupAlbumPage();
// }

  function viewGet() {
    return viewState;
  }

  function viewSet( url ) {
    console.log('view set ran and url is ' + url);
    if ( typeof url === 'undefined' ) { url = window.location.toString(); }

    if ( url.contains('album=') ) {
      viewState = 'album';
    } else if ( url === 'http://localhost:8888/sites/brv5/wp-br/' ) {
      viewState = 'home';
    } else {
      viewState = 'unknown';
    }

    return viewState;

  }

  function setPlayState(state) {
    console.log('set playstate to ' + state);
    isPlaying = state;
  }

  function getPlayState() {
    return isPlaying;
  }

  return {
    viewSet : viewSet,
    viewGet : viewGet,
    setPlayState : setPlayState,
    isPlaying : getPlayState
  };

}();





/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Player
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var br_player = function() {
  /* 
  * TOC:
  * Audio Player UI
  * Albums
  * History
  */

  /*- Audio Player -*/
  var playerUI = function(){

    var elements = {
      playerWrapper : $('.audio-player-wrapper'),
      player : $('.audio-player'),
      song : $('.audio-player .song'),
      artist : $('.audio-player .artist'),
      trackNum_albumLink : $('.audio-player .view-full-album'),
      progressBar : $('.audio-player .progress-bar'),
      progressTime : $('.audio-player .progress-time')
    };

    var interactive = {
      playButton : $('.play-pause'),
      prevButton : $('.previous'),
      slider : $('.slider')
    };

    var iconFont = {
      play : 'm',
      pause : 'n',
      speaker : 's'
    };

    var state = {
      isPreviewSong : false,
      isSliding : false
    };

    var handlers = {
      playClick : function() {
        badracket.playPause( br_player.history.currentSong );
        badracket.updateAudioDOM( br_player.history.album.current() , br_player.history.song.current() );
      },

      albumClick : function(e) {
        if ( br_state.viewGet() === 'album' ) { return false; }

        e.preventDefault();

        var albumName = $(e.target).closest('.album').attr('data-album-title'),
            album = br_player.albums.getAlbumByName( albumName ),
            currentAlbum = br_player.history.album.current(),
            song;

        if ( album === currentAlbum ) {
          song = br_player.history.song.current();
          br_sm2.playPause( song );
        } else {
          song = br_player.albums.sampleSong( album );
          br_sm2.playPause( song );
          br_player.history.update( album, song );
        }
        // badracket.updateAudioDOM( album, sampleTrack );

      },

      songClick : function(e) {
        var songDOM = $(e.target).closest('.song'),
            trackNumber = songDOM.find('.trackNumber').text(),
            albumName = $('[data-album-title]').attr('data-album-title'), // [X] TODO: don't search for album every song click
            album = br_player.albums.getAlbumByName( albumName ),
            song;

        if ( songDOM.hasClass('song-playing') ) {
          song = br_player.history.song.current();
        } else {
          song = album.tracks[ parseInt( trackNumber , 10 ) - 1 ];
        }
        br_sm2.playPause( song );
        // badracket.updateAudioDOM(album, song);
      }
    };

    var bindUI = {
      play : function() {
        s.bd.on({
          click : function(){ br_player.ui.handlers.playClick(); },
          tap : function(){ br_player.ui.handlers.playClick(); }
        }, '.play-pause' );
      },
      next : function() {
        s.bd.on({
          // click: function(){  br_player.ui.handlers.albumClick(); },
          // tap: function(){  br_player.ui.handlers.albumClick(); }
          }, '.next' );
      },
      previous : function() {
        s.bd.on({
          // click: function(){  br_player.ui.handlers.albumClick(); },
          // tap: function(){  br_player.ui.handlers.albumClick(); }
          }, '.previous' );
      },
      album : function() {
        s.bd.on({
          click : function(e){ br_player.ui.handlers.albumClick(e); },
          tap : function(e){ br_player.ui.handlers.albumClick(e); }
        }, '.album' );
      },
      song : function() {
        s.bd.on({
          click : function(e){ br_player.ui.handlers.songClick(e); }
        } , '.song' );
      }
    };

    return {
      elements : elements,
      state : state,
      handlers : handlers,
      bindUI : bindUI
    };

  }();




  /*- Albums -*/
  var musicData = function(){

    var albums, numAlbums;

    function receiveData(cleanJSON) {
      albums = cleanJSON;
      numAlbums = albums.length;
    }

    function getAlbumByName( albumName ) {
      for (var i = numAlbums; i--;) {
        if (albums[i].albumName === albumName) {
         return albums[i];
        }
      }
    }

    function findSampleSong ( album ) {
      var tracks = album.tracks;
      for (var i = tracks.length; i--;) {
        if (parseInt(tracks[i].isSampleTrack, 10) == 1) {
          return tracks[i]; // return the album track with .isSampleTrack set to 1
        }
      }
    }

    return {
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
      currentAlbumIndex = br_player.albums.get().indexOf( album );
      currentSongIndex = album.tracks.indexOf( track );
      historyIndexes.push( [ currentAlbumIndex, currentSongIndex ] );
      console.log(historyIndexes);
    }

    function historyLen(){
      return historyIndexes.length;
    }

    var album = function(){
      function current() {
        return br_player.albums.get()[ currentAlbumIndex ];
      }

      function next(){
        return br_player.albums.get()[ currentAlbumIndex + 1 ];
      }

      function previous(){
        return br_player.albums.get()[ currentAlbumIndex - 1 ];
      }

      function random() {
        var albums = br_player.albums.get();
        return albums[ Math.round( Math.random( 0, albums.length )) ];
      }

      return {
        current : current,
        next : next,
        previous : previous,
        random : random
      };

    }();

    var song = function() {
      function current() {
        return  br_player.albums.get()[currentAlbumIndex].tracks[currentSongIndex];
      }

      function next() {
        return br_player.albums.get()[currentAlbumIndex].tracks[currentSongIndex + 1];
      }

      function previous() {
        return br_player.albums.get()[currentAlbumIndex].tracks[currentSongIndex - 1];
      }

      return {
        current : current,
        next : next,
        previous : previous
      };

    }();


    return {
      update : updateHistory,
      length : historyLen,
      album : album,
      song : song
    };

  }();


  return {
    ui : playerUI,
    albums : musicData,
    history : history
  };

}();



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Subscribe
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

$.subscribe('/view/change', updateView('/view/change'));   // triggered by djaxLoad()

function updateView (name) {
  return function(_, url) {
    br_state.viewSet(url);
  };
}



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Do the stuff
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


// API Reference 
/*

br_sm2
  .setup( callback )
  .createSound( song )


br_player

  .albums
    .set( cleanJSON )
    .sampleSong( album )

  .history
    .update( album, track )
    .album
      .current()
      .next()
      .previous()
      .random()
    .song
      .current()
      .next()
      .previous()

  .ui
    .elements { ... }
    .state { ... }
    .handers
      .playClick()


*/


var init = function(){

  var ready = {
    sm : false,
    albumData : false
  };

  function loadSM() {
    if( typeof soundManager !== 'undefined' ) {
      br_sm2.setup( smReady );
    } else {
      setTimeout(function() { loadSM(); }, 125);
    }
  }

  function smReady() {
    console.log('Soundmanager ready');
    ready.sm = true;
    readyCallback();
  }

  function dataReady() {
    console.log('Album data ready');
    ready.albumData = true;
    readyCallback();
  }

  function readyCallback() {
    if (!ready.sm || !ready.albumData ) { return; }
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
  var song = br_player.albums.sampleSong(album);
  br_player.history.update(album, song);
  console.log(song);
  // song.play();
  br_player.ui.bindUI.album();
  br_player.ui.bindUI.song();
}










