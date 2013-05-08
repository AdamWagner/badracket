soundManager.url = 'SoundManager2/swf/';
soundManager.flashVersion = 9;

var Application = (function() {
  var self = this;
  var playButton = document.getElementById('play');
  var jumpButton = document.getElementById('jump');
  var currentSong, timer;

  self.removeChildNodesFrom = function (element) {
    if (element.hasChildNodes()) {
      while (element.childNodes.length > 0) {
        element.removeChild(element.firstChild);
      }
    }
  }

  self.play = function () {
    if (soundManager.canPlayLink(this)) {
      soundManager.stopAll();
      soundManager.play(this.getAttribute('title'), this.getAttribute('href'));
      currentSong = this.getAttribute('title');
      playButton.setAttribute('value', 'Pause');
    }
    
    self.updateView();
    return false;
  }

  self.jump = function () {
    var timeline = document.getElementById('timeline');
    var time = timeline.value;
    var fragments = time.split(':');
    var minutes = parseInt(fragments[0]);
    var seconds = parseInt(fragments[1]);
    var ms = parseInt(fragments[2]);

    if (typeof currentSong != 'undefined' &&
        soundManager.getSoundById(currentSong)) {
      var song = soundManager.getSoundById(currentSong);
      var position = (minutes * 60 * 1000) + (seconds * 1000) + ms;
      song.setPosition(position)
    }
  }

  self.bindPlaylistLinks = function () {
    var playlist = document.getElementsByTagName('ul')[0];
    var songs = playlist.getElementsByTagName('a');

    for(i = 0; i < songs.length; i++) {
      songs[i].onclick = self.play
    }
  }

  self.bindButtons = function () {
    playButton.onclick = function () {
      if (typeof currentSong != 'undefined' &&
          soundManager.getSoundById(currentSong).paused) {
        soundManager.resume(currentSong);
        this.setAttribute('value', 'Pause');
      }
      else {
        soundManager.pause(currentSong);
        this.setAttribute('value', 'Play');
      }

      self.updateView();
      return false;
    }

    jumpButton.onclick = self.jump;
  }

  self.formatTime = function (ms) {
    var total_seconds = parseInt(ms / 1000);
    var minutes = parseInt(total_seconds / 60);
    var seconds = total_seconds % 60;

    if (seconds < 10) seconds = '0' + seconds;

    return minutes + ':' + seconds;
  }

  self.updateView = function () {
    clearTimeout(timer);

    var duration = document.getElementById('duration');
    var progress = document.getElementById('progress');
    var title = document.getElementById('title');

    if (typeof currentSong != 'undefined') {
      var song = soundManager.getSoundById(currentSong);
      var titleText = document.createTextNode(currentSong);
      var durationText = document.createTextNode(
        self.formatTime(song.position) +
        ' / ' +
        self.formatTime(song.duration) +
        (song.bytesLoaded < song.bytesTotal ? ' (loading)' : '')
      );
      var progressDots = '';

      for(i = 0; i < parseInt((song.duration - song.position) / 1000); i++) {
        progressDots = progressDots + '.';
      }

      var progressText = document.createTextNode(progressDots);

      self.removeChildNodesFrom(duration);
      self.removeChildNodesFrom(progress);
      self.removeChildNodesFrom(title);
      
      duration.appendChild(durationText);
      progress.appendChild(progressText);
      title.appendChild(titleText);

      if (song.playState === 0) {
        playButton.setAttribute('value', 'Play');
      }
    }

    timer = setTimeout(self.updateView, 1000);
  }

  return self;
}());

window.onload = function () {
  soundManager.onready(function () {
    Application.bindPlaylistLinks();
    Application.bindButtons();
    Application.updateView();
  });
}