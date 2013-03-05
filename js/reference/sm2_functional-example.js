var allsounds=[];
var loadingbars=document.getElementsByClassName('loaded');
var playingbars=document.getElementsByClassName('played');
var playbuttons=document.getElementsByClassName('playpause');
soundManager.setup({
    url: 'swf/',
    flashVersion: 9,
    preferFlash: true,
    useHighPerformance: true,
    //useFastPolling: true,
    html5PollingInterval: 50, 
    onready: loadthesound,
  });

function loadthesound() {
  var soundc = document.getElementsByClassName('playpause');
  for (var i=0; i<soundc.length; i+=1) {
      soundc[i].onclick = toggleplay;
      allsounds.push(
        soundManager.createSound({
          id: soundc[i].getAttribute('data-trackid'),
          usePeakData: true,
          useWaveformData: true,
          useEQData: true,
          ondataerror: function() {
          console.log("errorz");
          },
          whileloading: updateload,
          whileplaying: updateplay,
          onfinish: resetplayer,
          url: soundc[i].getAttribute('data-track'),
        })
      )
  }
}

function resetplayer() {
  playingbars[this.id[1]].style.width="0px";
  playbuttons[this.id[1]].style.backgroundImage="url('player/play.png')";
}

function toggleplay() {
  var currentsong = soundManager.getSoundById(this.getAttribute('data-trackid'));
  currentsong.setVolume(globalvolume);
  console.log(globalvolume);
  if (currentsong.playState) {
    if (currentsong.paused) {
      pauseallsongs();
      currentsong.togglePause();
      this.style.backgroundImage="url('player/pause.png')";
    }
    else {
      this.style.backgroundImage="url('player/play.png')";
      currentsong.togglePause();
    }
  }
  else {
    pauseallsongs();
    soundManager.play(this.getAttribute('data-trackid'));
    this.style.backgroundImage="url('player/pause.png')";
  }
}

function pauseallsongs() {
  soundManager.pauseAll();
  for (i in playbuttons) {
    console.log(playbuttons[i]);
    if (playbuttons[i].style) {
      playbuttons[i].style.backgroundImage="url('player/play.png')";
    }
  }
}

function updateload() {
  loadingbars[this.id[1]].style.width=(this.bytesLoaded/this.bytesTotal)*888+"px";
}

function updateplay() {
  if (this.readyState === 3) {
    playingbars[this.id[1]].style.width=(this.position/this.duration)*888+"px";
  }
  else {
    playingbars[this.id[1]].style.width=(this.position/this.durationEstimate)*888+"px";
  }
  if (this.volume !== globalvolume) {
    this.setVolume(globalvolume);
  }
}

//SEEK

var seekcover = document.getElementsByClassName('seekcover');
for (i in seekcover) {
  seekcover[i].onclick=seekinsong;
}

function seekinsong() {
  var assosound = soundManager.getSoundById('p'+this.id[1]);
  var e = window.event || e;
  var trueex = element_position(this);
  var seekpos = e.pageX - trueex.x;
  var seekperc = seekpos / 888;
  if (assosound.readyState === 0) {
    return;
  }
  else if (assosound.readyState === 3) {
    var seekto = assosound.duration * seekperc;
  }
  else {
    var seekto = assosound.durationEstimate * seekperc;
    if (seekto > assosound.duration) {
      seekto = assosound.duration;
      seekpos = (assosound.duration/assosound.durationEstimate)*888;
    }
    
  }
  assosound.setPosition(seekto);
  playingbars[this.id[1]].style.width=seekpos+"px";
}

//VOLUME

var speaker = document.getElementsByClassName('speaker');
var muted = document.getElementsByClassName('muted');
var unmuted = document.getElementsByClassName('unmuted');
var totvol = document.getElementsByClassName('volcov');
var volumeint, iscook, mousepx, mousepy;
var cookies
var globalvolume = 100;
console.log(document.cookie);
if (document.cookie) {
  var x = document.cookie.split(';');
  for (i in x) {
    var kkkey = x[i].split("=")[0];
    if (kkkey.replace(" ", "") === "volume") {
      globalvolume = x[i].split("=")[1];
    }
  }
}

for (i in totvol) {
  totvol[i].onmouseover=volumeexpand;
  totvol[i].onmouseout=volumeshrink;
  totvol[i].onclick=changevolume;
}

function volumeexpand() {
  var vol_num = this.id.charAt(1);
  var mutedb = document.getElementById('m'+vol_num);
  var unmutedb = document.getElementById('u'+vol_num);
  var speakb = document.getElementById('s'+vol_num);
  mutedb.style.width = '100px';
  mutedb.style.left = '750px';
  unmutedb.style.width = globalvolume+"px";
  unmutedb.style.left = '750px';
  speakb.style.left = "724px";
  speakb.style.opacity = "0.7";
  this.style.width = "139px";
  this.style.left = "724px";
}

function volumeshrink() {
  var vol_num = this.id.charAt(1);
  var mutedb = document.getElementById('m'+vol_num);
  var unmutedb = document.getElementById('u'+vol_num);
  var speakb = document.getElementById('s'+vol_num);
  mutedb.style.width = '0px';
  mutedb.style.left = '856px';
  unmutedb.style.width = '0px';
  unmutedb.style.left = '856px';
  speakb.style.left = "836px";
  speakb.style.opacity = "0.5";
  this.style.width = "22px";
  this.style.left = "836px";
  volnotchanging = 1;
}

function jjj(x) {
  console.log(x.id);
}

function changevolume(e) {
  var e = window.event || e;
  //var vol_num = this.id.charAt(1);
  var vol_num = this.id[1];
  var this_bar = document.getElementById('u'+vol_num);
  //var changevolume = event.pageX - this_bar.offsetLeft - 8;
  truex = element_position(this_bar);
  changevolume = e.pageX - truex.x;
  if (changevolume > 90) {
    changevolume = 100;
  }
  if (changevolume < 5) {
    changevolume = 0;
  }
  globalvolume = changevolume;
  document.cookie = "volume="+changevolume+";";
  unmuted[this.id[1]].style.width = changevolume + "px";
}

function getNumericStyleProperty(style, prop){
    return parseInt(style.getPropertyValue(prop),10) ;
}

function element_position(e) {
    var x = 0;
    var inner = true ;
    do {
        x += e.offsetLeft;
        var style = getComputedStyle(e,null) ;
        var borderLeft = getNumericStyleProperty(style,"border-left-width") ;
        x += borderLeft ;
        if (inner){
          var paddingLeft = getNumericStyleProperty(style,"padding-left") ;
          x += paddingLeft ;
        }
        inner = false ;
    } while (e = e.offsetParent);
    return {x: x};
}