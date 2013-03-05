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
      console.log('Soundmanager ready');
      callback();
      // update a parent controller object property that soundmanager is ready
    });
  }


  function onPlayResume( sound ) {
    br_state.setPlayState(true);
    console.log('its working');

  }

  function onStopPause( sound ) {

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


  function createSound( song ) {
    return soundManager.createSound({
      id:'brSound' + ( 'enumerator' ),
      url:song.songUrl,
      autoLoad: true,
      onplay: function() { br_state.setPlayState(true); },
      onresume: function() { br_state.setPlayState(true); },
      onpause: function() { br_state.setPlayState(false); },
      onstop: function() { br_state.setPlayState(false); },
      whileloading: function() { whileLoading(this); },
      whileplaying: function() { whilePlaying(this); },
      onfinish: function() { onFinish(this); }
      // onload: function(){ }
    });
  }

  return {
    setup : setupSM2,
    createSound : createSound
  };

}();



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Page State
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


var br_state = function() {

  var isPlaying = null;

  function viewSet( url ) {
    var viewState = 'unknown';
    if ( typeof url === 'undefined' ) { url = window.location.toString(); }

    if ( url.contains('album=') ) {
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
    view : viewSet,
    setPlayState : setPlayState,
    isPlaying : getPlayState,
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

    var handers = {
      playClick : function() {
        console.log(' - - - handle play click ran - - -');
        badracket.playPause( br_player.history.currentSong );
        badracket.updateAudioDOM( br_player.history.currentAlbum , br_player.history.currentSong );
      }
    };

    return {
      elements : elements,
      state : state,
      handlers : handlers
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
      var albumIndex = br_player.albums.get().indexOf( album );
      var songIndex = album.tracks.indexOf( track );
      historyIndexes.push( [ albumIndex, songIndex ] );

      currentAlbumIndex = albumIndex;
      currentSongIndex = songIndex;
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






function br_doTheStuff() {
  console.log('test window load stuff ran');
  br_sm2.setup( doMoreStuff );
}

function doMoreStuff() {
  console.log('do more stuff ran');
  var album = br_player.history.album.random();
  var song = br_sm2.createSound(br_player.albums.sampleSong(album));
  br_player.history.update(album, song);
  console.log(song);
  // song.play();
}








