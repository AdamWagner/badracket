/* Minimum settings */
// Always do settings before DOM is ready!
$.playable('soundmanager/swf/');
$(function(){
  // Simple usage for mp3 links
  $('a[href$=.mp3]').playable();
});
/* Options settings */
// Again, do settings before DOM is ready!
$.playable('soundmanager/swf/', { // You can set all SM2 default options & properties, plus the followings:
  autoStart : false, // Start playing the first item
  playNext : false, // Play next item when previous ends
  loopNext : false, // Play first item when no more next item
  pauseOnly : false, // Just pause previous on skip
  playAlone : false, // Force stop/pause previous on skip
  doUnload : false // Unload sound on stop/finish
});
/* You also can pass just one object containing the swf URL, for convinience:
$.playable({
  url: 'soundmanager/swf/',
  autoStart : false,
  ...
});
*/
$(function(){
  //You can also overwrite default options for each DOM selection
  $('ul.playlist').playable({autoStart: true, playNext: true, playAlone: true, pauseOnly: false, doUnload: false});
  $('div.sampler').playable({autoStart: false, playNext: false, playAlone: false, pauseOnly: false, doUnload: false});
  $('a.listen').playable({autoStart: false, playNext: false, playAlone: true, pauseOnly: true, doUnload: true});

// TO Modify Sound Objects (you can use all SMSound methods)
  $('.playlist').playable('setVolume', 50); // reduce sound to 50% for the whole playlist
  $('.sampler .playable:eq(1)').playable('pause'); // pause the second playable item of the sampler
  $('.listen .playable:last').playable('play'); // play the last playable item of the '.listen' list
  ...

// TO Play next song in current playlist
  $.playable.next(); // plays next song with the same selector as the current song playing
  $.playable.next(2); // plays the one after the next song with the same selector as the current song playing
  $.playable.next(-1); // plays previous song with the same selector as the current song playing
  ...
});