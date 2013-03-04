/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
  badracket.soundmanger
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  badracket.soundmanager = {
    smSetup: function() {
      badracket.sm = soundManager;
      badracket.sm.setup({
        url: 'swf',
        flashVersion: 9,
        debugMode: false,
        flashPollingInterval: 125,
        html5PollingInterval: 125,
        defaultOptions : {
          useHighPerformance: true,
          usePeakData: false,
          useEQData: false
        }
      });
      console.log('- - - sm setup ran - - -');
      badracket.soundmanager.ready();
    },
    ready: function(){
      badracket.sm.onready(function(){
        console.log('Soundmanager ready');
        badracket.soundmanager.init();
      });
    },

    init: function() {
      badracket.initAudioPlayer();
      badracket.bindAudioUI();
      badracket.bindSliderUI(s.playBar);
      badracket.viewState.init();
    },

    // good example of paralell downloads
    // http://soundcloud-sm2.heroku.com/
    createSound: function(song){
      console.log('- - - createSound() ran - - -');
      if (song.isSampleTrack === '0') {
        song.duration = '0:30';
      }
      return badracket.sm.createSound({
        id:'brSound'+(badracket.getSm2_objectCount()),
        url:song.songUrl,
        debugMode: false,
        autoLoad: true,
        onplay: function() { badracket.onPlayResume(this); },
        onresume: function() { badracket.onPlayResume(this); },
        onpause: function() { badracket.onStopPause(this);  },
        onstop: function() { badracket.onStopPause(this);   },
        whileloading: function() { badracket.whileLoading(this); },
        whileplaying: function() { badracket.whilePlaying(this); },
        onfinish: function() { badracket.onFinish(this); },
        onload: function(){ }
      });
    }
 }, // end badracket.soundmanager

badracket.initAudioPlayer = function() {
  var albums      = badracket.albums,
      randomAlbum = albums[Math.round(Math.random(0, albums.length))],
      sampleTrack = badracket.findSampleSong(randomAlbum);

  badracket.updatePlayHistory(randomAlbum, sampleTrack);
  sampleTrack.sm2_object = badracket.soundmanager.createSound(sampleTrack);      // creates sound
  badracket.updateAudioPlayer(randomAlbum, sampleTrack);                         // (album, song)
  $('.audio-player').addClass('ready');
};

badracket.globalPlayState = false; //default


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Play state controllers
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


badracket.onPlayResume = function(sm2_object){
  console.log('onPlayResume() ran');
  badracket.whilePlayingCounter = 0;
};

badracket.onStopPause = function(sm2_object){
};

badracket.whileLoading = function(sm2_object) {
  var loadingWidth = ((sm2_object.bytesLoaded/(sm2_object.bytesTotal))*100).toFixed(2) + '%';
  var currentSong = badracket.playHistory.getCurrentSong();
  if (currentSong.sm2_object === sm2_object) {               // only update based on current song
    $('.loading').css('width', loadingWidth);
  }
};

badracket.whilePlaying = function(sm2_object){
  badracket.whilePlayingCounter += 1;
  var currentSong = badracket.playHistory.getCurrentSong(),
      songDuration =  badracket.min_secToMilliseconds(currentSong.duration);

  var playbarWidth = ((sm2_object.position/(songDuration))*100).toFixed(2) + '%';
  var sliding = badracket.sm.sliding;


  if (sliding !== true && badracket.whilePlayingCounter > 2 && currentSong.sm2_object === sm2_object ) { // delays playbar redraw preventing flash
    $('.controls .position').css('width', playbarWidth);
    $('.sm2_position').text( badracket.msToTime(sm2_object.position) );
  }
};

badracket.onFinish = function(sm2_object){
  console.log('on finish ran');
  if (sm2_object.sID) {                           // if it receives the sm2_object
    sm2_object.setPosition(0);                    // rewind progress bar
  } else {                                        // else it recieves songObject
    sm2_object.sm2_object.setPosition(0);
  }
  badracket.handleNextClick('next');              // Advance play, depending on play mode
};


/* Control 30 second samples  - - - - - - - - - - - - - - - */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

badracket.sampleSongTest = function(){
  var song = badracket.playHistory.getCurrentSong();
  if (song.isSampleTrack === '0') {
    return true;
  }
};

badracket.attach30SecondListener = function(song){
  var s = song.sm2_object;
  if (song.isSampleTrack === '0') {
    console.log('!!!!!!!!! - - - - 30 second listener attached for ' + song.songTitle);
    s.onPosition(28000, function(eventPosition) {                  // fire at 28 seconds
      badracket.fadeOutSound(song);
    });
     s.onPosition(30000, function(eventPosition) {                 // fire at 30 seconds
      badracket.onFinish(song);
    });
  }
};

badracket.fadeOutSound = function(song) {
  console.log('- - - fadeOutSound ran - - - ');
  var s = song.sm2_object;
  var vol = s.volume;
  if (vol === 0) {
    setTimeout(function() {
      s.setVolume(100);                                            // undo fadeout
    }, 500);
    return false;
  }
  s.setVolume(Math.min(100,vol-1));
  setTimeout(function(){
    badracket.fadeOutSound(song);
  } , 20);
};



/* Time utilities - - - - - - - - - - - - - - - - - - - - - */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
 badracket.msToTime = function(s) {
   var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;

    if (secs < 10) {secs = "0"+secs;}
    return mins + ':' + secs;
 };

 badracket.min_secToMilliseconds = function(time) {
     time = time.toString().split(/:/);
     return time[0] * 60000 + time[1] * 1000;
 };



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Page state logic
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

badracket.viewState = {

  view: $('body').attr('data-view'),

  init: function(){
    this.view = $('body').attr('data-view');
    if (this.view === 'album') {
      this.setupAlbumView();
    }
  },

  setupAlbumView: function(){
    console.log('setup album view ran');
    var albumTitle = $('[data-album-title]').attr('data-album-title');
    var album = badracket.getAlbumByName(albumTitle);
    $('a[data-album="'+albumTitle+'"]').hide();
    badracket.loadBandTweets();
  }
};




/* Song iterators - - - - - - - - - - - - - - - - - - - - - */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
badracket.runFuncAllSongs = function(func) {
  for (var i=0; i<badracket.albums.length; i++) {
    var albumTracks = badracket.albums[i].tracks;
    for (var j=0; j<albumTracks.length; j++) {
        func(albumTracks[j]);
      }
    }
};

// https://getsatisfaction.com/schillmania/topics/how_do_i_preload_a_song
badracket.loadSampleSongs = function() {
  badracket.runFuncAllSongs(function(song) {
    if (!song.sm2_object && song.isSampleTrack) {
      song.sm2_object = badracket.soundmanager.createSound(song);
      song.sm2_object.load();
    }
  });
};

badracket.loadNextSong = function(song){
  var nextSong = badracket.playHistory.getNextSong();
  if (!song.sm2_object && song.isSampleTrack) {
    nextSong.sm2_object = badracket.soundmanager.createSound(nextSong);
  }
    nextSong.sm2_object.load();
};

badracket.stopOtherPlayers = function(sm2_id) {
  badracket.runFuncAllSongs(function(song){
    if (song.sm2_object) {
      if (song.sm2_object.sID !== sm2_id) {
        song.sm2_object.pause();
      }
    }
  });
};

badracket.getSm2_objectCount = function() {
  var sm2_objectCount = 0;
  badracket.runFuncAllSongs(function(song){
    if (song.sm2_object) {
      sm2_objectCount+=1;
    }
  });
  return sm2_objectCount;
};

badracket.getSongByUrl = function(songUrl) {
  var targetSong;
  badracket.runFuncAllSongs(function(song){
    if (song.songUrl === songUrl) { targetSong = song; }
  });
  return targetSong;
};


badracket.playHistory = {
  history : [], // [ [albumIndex, songIndex], [..], [..] ]
  getCurrentHistory:function(){
    return this.history[this.history.length - 1];
  },
  getCurrentAlbum : function(){
    var currentAlbumIndex = this.getCurrentHistory()[0]; // get last item in playHistory
    return badracket.albums[currentAlbumIndex];
  },
   getNextAlbum : function(){
    var currentAlbumIndex = this.getCurrentHistory()[0]; // get last item in playHistory
    return badracket.albums[currentAlbumIndex + 1];
  },
  getPreviousAlbum : function(){
    var currentAlbumIndex = this.getCurrentHistory()[0]; // get last item in playHistory
    return badracket.albums[currentAlbumIndex - 1];
  },
  getCurrentSong : function(){
    var currentAlbumIndex = this.getCurrentHistory()[0];
    var currentSongIndex = this.getCurrentHistory()[1];
    return  badracket.albums[currentAlbumIndex].tracks[currentSongIndex];
  },
  getNextSong : function(){
    var currentAlbumIndex = this.getCurrentHistory()[0];
    var currentSongIndex = this.getCurrentHistory()[1];
    return badracket.albums[currentAlbumIndex].tracks[currentSongIndex+1];
  },
  getPreviousSong : function(){
    var currentAlbumIndex = this.getCurrentHistory()[0];
    var currentSongIndex = this.getCurrentHistory()[1];
    return badracket.albums[currentAlbumIndex].tracks[currentSongIndex-1];
  },
  getCurrentAlbumSong : function(){
    var currentAlbumIndex = this.getCurrentHistory()[0];
    var currentSongIndex = this.getCurrentHistory()[1];
    return  [badracket.albums[currentAlbumIndex], badracket.albums[currentAlbumIndex].tracks[currentSongIndex]];
  }
};

badracket.updatePlayHistory = function(album, track) {
  var albumIndex = badracket.albums.indexOf(album);
  var songIndex = album.tracks.indexOf(track);
  badracket.playHistory.history.push([albumIndex, songIndex]);
};


/* Album iterators - - - - - - - - - - - - - - - - - - - - - */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

badracket.runFuncAllAlbums = function(func) {
  for (var i=0; i<badracket.albums.length; i++) {
      func(badracket.albums[i]);
    }
};

badracket.getAlbumByName = function(albumName) {
  var albums = badracket.albums, len = albums.length;
  for (var i=len; i--;) {
    if (albums[i].albumName === albumName) {
     return albums[i];
    }
  }
};

badracket.findSampleSong = function(album) {
  var tracks = album.tracks;
  for (var i=0; i<tracks.length; i++) {
    if (parseInt(tracks[i].isSampleTrack, 10) == 1) {
      return tracks[i]; // return the album track with .isSampleTrack set to 1
    }
  }
};


/* - - End Album iterators - - */


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Event Handlers
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

badracket.handlePlayClick = function() {
 console.log(' - - - handle play click ran - - -');
  var albumSong = badracket.playHistory.getCurrentAlbumSong();

  badracket.playPause(albumSong[1]);
  badracket.updateAudioDOM(albumSong[0],albumSong[1]);
};

badracket.handleAlbumClick = function(e) {
  console.log('- - - handle album click ran - - -');
  e.preventDefault();
  var view = $('body').attr('data-view');
  var albumName = $(e.target).closest('.album').find('.album-title').text();
  console.log(albumName);

  var album = badracket.getAlbumByName(albumName);
  var currentAlbum = badracket.playHistory.getCurrentAlbum(),
      currentSong = badracket.playHistory.getCurrentSong();

  if (album === currentAlbum) {
    if (view !== 'album') {
      badracket.playPause(currentSong);
      badracket.updateAudioDOM(currentAlbum, currentSong);
    }
  } else {
    var sampleTrack = badracket.findSampleSong(album);
    if (view !== 'album') {
      badracket.playPause(sampleTrack);
      badracket.updateAudioDOM(album, sampleTrack);
    }
  }
};

badracket.handleSongClick = function(e) {
  var songDOM = $(e.target).closest('.song');
  var trackNumber = songDOM.find('.trackNumber').text();

  var albumName = $('[data-album-title]').attr('data-album-title');
  var album = badracket.getAlbumByName(albumName);
  var song;

  if ( songDOM.hasClass('song-playing') ) {
    song = badracket.playHistory.getCurrentSong();
    console.log('clicking current row');
  } else {
    song = album.tracks[parseInt(trackNumber,10)-1];
  }
  badracket.playPause(song);
  badracket.updateAudioDOM(album, song);
};

badracket.handleNextClick = function(direction){

  console.log('- - - handle next click ran - - -');
  console.log('direction is ' + direction);
  var currentHistory = badracket.playHistory.getCurrentHistory();
  var album = badracket.playHistory.getCurrentAlbum();
  var song;

  var currentSong =  badracket.playHistory.getCurrentSong();      // get current song

  var id = currentSong.sm2_object.sID;
  badracket.sm.unload(id);                                        // unload current song to avoid request buildup
  console.log(currentSong.songTitle + ' unloaded');
  currentSong.sm2_object.setPosition(0);                          // rewind song position [X] legacy, can be removed

  if (direction === 'next') {                                     // direction is 'next'
    if ( (currentHistory[1]+1) >= album.tracks.length) {          // if on last song...
      if (currentHistory[0]+1 >= badracket.albums.length) {       // and if on last album...
        album = badracket.albums[0];                              // then rewind to first album
        song = album.tracks[0];                                   // and play first song
      } else {
        album = badracket.playHistory.getNextAlbum();             // else go to next album
        song = album.tracks[0];                                   // ... and play first song
      }
    } else {
      song = badracket.playHistory.getNextSong();                 // else, play next song in album
    }
  } else {                                                        // direction is 'previous'
    if ( (currentHistory[1] - 1 ) === -1 ) {                      // if on first song...
      if (currentHistory[0] === 0 ) {                             // and if on first album...
        album = badracket.albums[badracket.albums.length - 1 ];   // ... then go to last album
        song = album.tracks[album.tracks.length - 1];             // ... and play the last song
      } else {
        album = badracket.playHistory.getPreviousAlbum();         // else, go to previous album
        song = album.tracks[album.tracks.length - 1];             // and play the last song
      }
    } else {
      song = badracket.playHistory.getPreviousSong();             // else, play prev song in album 
    }
  }

  if (badracket.globalPlayState === true) {
    badracket.playPause(song);
  } else {
    song.sm2_object = badracket.soundmanager.createSound(song);
    badracket.attach30SecondListener(song);                     // attach 30 second listener
    song.sm2_object.setVolume(100);                             // [X] TODO: Cleanup the duplication between this and playPause();
  }
  badracket.updateAudioDOM(album, song);
};


badracket.updateAudioDOM = function(album, song) {
  badracket.updatePlayHistory(album, song);
  badracket.updateGlobalPlayState();            // must be called after playHistory is updated
  if ($('body').attr('data-view') !== 'album') {
    badracket.updateAlbumCover(album);
  }
  badracket.updateAudioPlayer(album, song);
  if ($('body').attr('data-view') === 'album') {
    badracket.updateSongRow(song);
  }
};



badracket.playPause = function(song) {
  if (song.sm2_object) {                                        // if sm2_object already exists
    badracket.stopOtherPlayers(song.sm2_object.sID);            // pause other sounds
    badracket.attach30SecondListener(song);                     // attach 30 second listener
    song.sm2_object.togglePause();                              // play / pause sound
  } else {
    song.sm2_object = badracket.soundmanager.createSound(song); // creates sound
    badracket.stopOtherPlayers(song.sm2_object.sID);            // pauses other sounds
    badracket.attach30SecondListener(song);                     // attach 30 second listener
    song.sm2_object.togglePause();                              // play / pause sound
  }
};


badracket.updateGlobalPlayState = function() {
  currentSong = badracket.playHistory.getCurrentSong().sm2_object;
  if (currentSong) {
    if (currentSong.playState && !currentSong.paused) {
      badracket.globalPlayState = true;
      console.log(currentSong.playState);
      console.log(currentSong.paused);
      console.log('sound playing');
    } else {
      console.log(currentSong.playState);
      console.log(currentSong.paused);
      badracket.globalPlayState = false;
      console.log('no sound');
    }
  }
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Update DOM
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

badracket.updateAudioPlayer = function(album, track) {
 console.log(' - - - update audio player ran - - -');
 var playState;
 if (badracket.globalPlayState === true) {
  playState = 'n';
 } else {
  playState = 'm';
 }

 var sample = badracket.sampleSongTest(track), sampleClass;
 var viewAlbum;

 if ( badracket.viewState.view === 'album' && $('[data-album-title]').attr('data-album-title') === album.albumName) {
  viewAlbum = '';
 } else {
  viewAlbum = '<span class="target">View album</span>';
 }

 if (sample) {
  sampleClass = 'preview-song';
 } else {
  sampleClass = '';
 }

 var positionHTML;
 if (track.sm2_object) {
  var position = track.sm2_object.position;
  songDuration =  badracket.min_secToMilliseconds(track.duration);

  positionHTML = ((position/(songDuration))*100).toFixed(2) + '%';
 } else {
  positionHTML = '0%';
 }

  var audioPlayer = [
     '<div class="audio-player ready '+ sampleClass +'" data-songUrl="'+ track.songUrl +'">',
       '<div class="player-metadata group">',
         '<div class="audio-player-title">',
           '<a href="" class="audio-title">',
              '<span class="song">'+ track.songTitle +'</span> - ',
              '<span class="artist">'+ album.artist +'</span>',
           '</a>',
         '</div>',
         '<a class="view-full-album dJAX_internal" href="'+ album.albumUrl +'">track ' + parseInt(track.trackNumber,10) +' of '+ album.tracks.length +'</span> ' + viewAlbum + '</a>',
       '</div>',
       '<div class="controls group">',
        '<span data-icon="h" class="previous"></span>',
        '<span data-icon="'+playState+'" class="play-pause"></span>',
        '<span data-icon="l" class="next"></span>',
        '<div class="statusbar">',
          '<div class="loading"></div>',
          '<div class="slider"></div>',
          '<div class="position" style="width:'+ positionHTML +'"></div>',
        '</div>',
         '<div class="timing">',
          '<div id="sm2_timing" class="timing-data">',
           '<span class="preview-song-indicator">preview</span>',
           '<span class="sm2_position">0:00</span>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');

  $('.audio-player-wrapper').html(audioPlayer);      // plop in updated player
  s.Playbar = $('.controls .position');              // update playbar element
  badracket.bindSliderUI(s.Playbar);                 // re-bind slider
};

badracket.updateAlbumCover = function(album) {
  $('.album').removeClass('playing');
  var cover = album.cover;
  var albumDom = $('[data-src="'+cover+'"]'); // find album DOM with data-src matching passed-in album.cover
  if (badracket.globalPlayState === true) {
    albumDom.parent().parent().addClass('playing');
  }
};

badracket.updateSongRow = function(song){
  $('.song').removeClass('song-playing');
  var trackNumber = song.trackNumber;
  var currentRow = $('[data-track-number='+trackNumber+']');
  var albumTitle = $('[data-album-title]').attr('data-album-title');
  console.log(albumTitle);
  if (badracket.globalPlayState === true && albumTitle == badracket.playHistory.getCurrentAlbum().albumName) {
    currentRow.addClass('song-playing');
  }
};



// [X] TODO: simplify similar sliding functions below with whilePlaying() on line 84
badracket.whileSliding = function(event, ui, playbar) {
  var position = ui.value;
  playbar.css('width', position + '%');
  var currentSong = badracket.playHistory.getCurrentSong();
  var smPosition = (position/100) * badracket.min_secToMilliseconds(currentSong.duration);
  $('.sm2_position').text(badracket.msToTime(smPosition));
};

badracket.slideStop = function ( event, ui, playbar) {
  badracket.sm.sliding = false;
  var position = ui.value;
  playbar.css('width', position + '%');
  var currentSong = badracket.playHistory.getCurrentSong();
  var smPosition = (position/100) * badracket.min_secToMilliseconds(currentSong.duration);
  currentSong.sm2_object.setPosition(smPosition);
  $('.sm2_position').text(badracket.msToTime(smPosition));
};


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Bind UI
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */



badracket.bindSliderUI = function(playbar) {
  console.log('- - - Bind slider UI ran - - -');
  // Activate slider
  $( ".slider" ).slider({
    step: 0.01,
    slide: function( event, ui ) { badracket.whileSliding( event, ui, playbar ); },
    start: function() { badracket.sm.sliding = true; },
    stop: function(event, ui) { badracket.slideStop( event, ui, playbar ); }
  });

};


// [X] TODO: replace .live with new .on format

badracket.bindAudioUI = function(){

  /* Audio Player - Bind Play / Pause button click -  - - - - */
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  $('.play-pause').live('tap, click', function(){
    console.log('play-pause click');
    badracket.handlePlayClick();
  });

  $('.next').live('tap, click', function(){
    badracket.handleNextClick('next');
  });

  $('.previous').live('tap, click', function(){
    badracket.handleNextClick('previous');
  });

  /* Bind album click - - - - - - - - - - -  - - - - - - - - */
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  $('.album').live('tap, click',function(e){ // live is important to work with djax
    badracket.handleAlbumClick(e);
  });

  /* Bind song click - - - - - - - - - - -  - - - - - - - - */
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  $('.song').live('tap, click',function(e){ // live is important to work with djax
    badracket.handleSongClick(e);
  });

}; // end badracket.bindAudioUI()



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    dJax init stuff
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

badracket.soundmanager.djaxInit  = function(){
  console.log('soundmanager djax init ran');
  var album = badracket.playHistory.getCurrentAlbum();
  var song = badracket.playHistory.getCurrentSong();
  if(album) {
    badracket.updateAlbumCover(album);
    badracket.updateAudioPlayer(album,song);
    badracket.updateSongRow(song);
  }
  badracket.viewState.init();
};




















