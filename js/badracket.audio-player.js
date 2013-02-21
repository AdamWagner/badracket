
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
  SOUNDMANAGER
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
          useEQData: false,
        }
      });
      
      console.log('sm setup ran');
      badracket.soundmanager.ready();
    },
    ready: function(){
      badracket.sm.onready(function(){
        console.log('Soundmanager ready');
        badracket.soundmanager.init();
        badracket.bindAudioUI();
      });
    },
    init: function() {
      var album = $('.album-container .album').eq(0);
      console.log(album);

      // MUST HAVE CONCEPT OF PLAYLIST OUT SIDE OF DOM, IDIOT!

      var songTitle = album.attr('data-sample-title'),
          artistName = album.find('.artist-name').text(),
          albumName = album.find('album-title').text(),
          soundURL = album.attr('data-soundurl'),
          albumURL = album.attr('data-album-url');

      badracket.updateAudioPlayer(songTitle, artistName, albumURL, soundURL);

      $('.audio-player').addClass('ready');

    },
    allSongs: [],
    thisSong: null,
    getSoundByURL: function(soundURL) {
      var i;
      if (badracket.soundmanager.allSongs.length > 0) {
        for (i=0; i < badracket.soundmanager.allSongs.length; i++) {

          if (badracket.soundmanager.allSongs[i].url == soundURL) {
            return badracket.soundmanager.allSongs[i];
          }
        }
      }
    },
    getCurrentSong: function() {
      Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };
      var i, timestamps = [], allSongs = badracket.soundmanager.allSongs;
      if (allSongs.length > 0) {
        for (i=0; i < allSongs.length; i++) {
          timestamps.push(allSongs[i].timestamp);
        }
        newestTimestamp = timestamps.max();
       for (i=0; i < allSongs.length; i++) {
          if (allSongs[i].timestamp === newestTimestamp) {
            return allSongs[i];
          }
        }
 
      }
    },
    stopOtherPlayers: function(songID){
      var i;
      for (i=0; i < this.allSongs.length; i++) {
        if (this.allSongs[i].sID !== songID) {
          this.allSongs[i].pause();
        }
      }
    },
    createSound: function(soundURL, lastPosition){
      thisSong = badracket.sm.createSound({
        id:'brSound'+(this.allSongs.length),
        url:soundURL,
        debugMode: false,
        onplay: function() { badracket.onPlayResume(this); },
        onresume: function() { badracket.onPlayResume(this); },
        onpause: function() { badracket.onStopPause(this); },
        onstop: function() { badracket.onStopPause(this); },
        whileloading: function() { badracket.whileLoading(this); },
        whileplaying: function() { badracket.whilePlaying(this); }
      });

      badracket.soundmanager.smLoad(thisSong, lastPosition);

      thisSong.timestamp = Date.now();
      this.allSongs.push(thisSong);
      this.stopOtherPlayers(thisSong.id);

      console.log('createSound() ran');
      return thisSong;

    },
    // Called by resumePlayback() > createSound() - waits for song to load, then plays from last position
    smLoad: function(thisSong, lastPosition) {
      badracket.sm.load(thisSong.id, {
          onload: function() {
         }
      });
    }
 },


  badracket.onPlayResume = function(thisSong){
    thisSong.timestamp = Date.now();
    $('.play-pause').attr('data-icon','n');
  };
  badracket.onStopPause = function(thisSong){
    $('.play-pause').attr('data-icon','m');
  };
  badracket.whileLoading = function(thisSong) {
    var loadingWidth = ((thisSong.bytesLoaded/(thisSong.bytesTotal))*100).toFixed(2) + '%';
    $('.loading').css('width', loadingWidth);
  };
  badracket.whilePlaying = function(thisSong){
    var playbarWidth = ((thisSong.position/(thisSong.durationEstimate))*100).toFixed(2) + '%';
    var sliding = badracket.sm.sliding;
    if (sliding !== true) {
      s.playBar.css('width', playbarWidth);
      $('.sm2_position').text( badracket.msToTime(thisSong.position) );
    }
  };

  badracket.resumePlayback = function(){
    var smURL = this.getCookie('sm_currentURL');
    var songTitle = this.getCookie('songTitle');
    var albumArtist = this.getCookie('artistName');
    var playState = this.getCookie('sm_paused');
    var stopped = this.getCookie('sm_stopped');
    var lastPosition = this.getCookie('sm_lastPosition');
    var duration = this.getCookie('sm_duration');
    var playbarWidth = (lastPosition/duration*100).toFixed(2) + '%';

    badracket.updateAlbumCover(smURL);

    if (smURL) {
      soundManager.onready(function() {
        badracket.soundmanager.createSound(smURL, lastPosition);
       });
      badracket.updateAudioPlayer(songTitle, albumArtist, smURL);
    if (lastPosition) { // sets the playbar position faster than running whilePlaying()
       s.playBar.css('width', playbarWidth);
       $('.sm2_position').text(badracket.msToTime(lastPosition));
    }
     }
  };

  badracket.msToTime = function(s) {
    var ms = s % 1000;
     s = (s - ms) / 1000;
     var secs = s % 60;
     s = (s - secs) / 60;
     var mins = s % 60;

     if (secs < 10) {secs = "0"+secs;}
     return mins + ':' + secs;
  };



  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
      UI
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
 
  badracket.handlePlayClick = function(e) {
    console.log('handle play click ran');
    e.preventDefault();
    var that = $(e.target);

    // this is FRAGILE! and CRITICAL!
    var soundURL = that.closest('a').attr('href');

    badracket.playPause(soundURL);
    badracket.updateAudioPlayer(songTitle, albumArtist, albumUrl, soundURL);
    badracket.updateAlbumCover(soundURL);
};

  badracket.handleAlbumClick = function(e) {
    console.log('handle album click ran');
    e.preventDefault();

    var album = $(e.target).closest('.album'),
        songTitle = album.attr('data-sample-title'),
        albumArtist = album.find('.artist-name').text(),
        soundURL = album.attr('data-soundURL'),
        albumUrl = album.attr('data-album-url');

    badracket.playPause(soundURL);
    badracket.updateAudioPlayer(songTitle, albumArtist, albumUrl, soundURL);
    badracket.updateAlbumCover(soundURL);
  };

  badracket.playPause = function(soundURL) {
    // set if song with this URL exists already
    var thisSong = badracket.soundmanager.getSoundByURL(soundURL);
    if (thisSong) {
      badracket.soundmanager.stopOtherPlayers(thisSong.id);
      thisSong.togglePause();
    } else {
      // creates sound
      thisSong = badracket.soundmanager.createSound(soundURL);
      // plays sound
      thisSong.togglePause();
    }
  };

  badracket.updateAudioPlayer = function(songTitle, albumArtist, albumUrl, soundURL) {
    var thisSong = badracket.soundmanager.getSoundByURL(soundURL);
    console.log(songTitle);
    $('.song').html(songTitle);
    $('.artist').html(albumArtist);
    $('.sm2_link').attr('href',soundURL);
    $('.view-full-album').attr('href',albumUrl);

    if (thisSong) {
      $('.sm2_position').text(badracket.msToTime(thisSong.position));
    }
  };

  badracket.updateAlbumCover = function(soundURL) {
    $('[data-soundurl]').removeClass('playing');
    $('[data-soundurl="'+soundURL+'"]').addClass('playing');
  };

  badracket.onPlayheadSlideStop = function(e){
    var thisSong = badracket.soundmanager.getCurrentSong();
    var position = $('#slider').slider('value');
    var smPosition = (position/100) * thisSong.durationEstimate;
    thisSong.setPosition(smPosition);
    $('.sm2_position').text(badracket.msToTime(smPosition));
  };


  badracket.bindAudioUI = function(){

    $('#slider').on('slidestop', function(e){
      badracket.onPlayheadSlideStop(e);
    });
    $( "#slider" ).slider({step: 0.01});

    $( "#slider" ).on( "slide", function( event, ui ) {
      s.playBar.css('width', ui.value + '%');
      // this is very expensive. Definitely fix this to not search for current song hundred times a second.
      var thisSong = badracket.soundmanager.getCurrentSong();
      $('.sm2_position').text(badracket.msToTime((ui.value / 100) *  thisSong.durationEstimate ));
    });
    $('#slider').on('slidestart', function(event,ui){
      badracket.sm.sliding = true;
    });
    $('#slider').on('slidestop', function(event,ui){
      badracket.sm.sliding = false;
    });

    $('.sm2_link').on('tap, click', function(e){
      badracket.handlePlayClick(e);
    });

    $('.play-pause').on('tap, click', function(){
      console.log('play-pause click');
      badracket.soundmanager.getCurrentSong().togglePause();
    });

    $('.album').on('tap, click',function(e){ // live is important to work with djax
      badracket.handleAlbumClick(e);
    });

  };

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    dJax init stuff
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

badracket.soundmanager.djaxInit  = function(){
  var thisSong = badracket.soundmanager.getCurrentSong();

  if(thisSong) {
    badracket.updateAlbumCover(thisSong.url);
  }
};




















