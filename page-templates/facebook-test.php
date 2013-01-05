<?php
/**
 * Template Name: Facebook-test
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/shared/html-header'); ?>

  

<?php  get_template_part('parts/shared/header'); ?>

<h1>js-sdk</h1>


<ul>
  <li></li>
</ul>


<script type="text/javascript">

var listen,album,artist,title,listenCount;

var titleList = [];
var albumList = [];
var artistList = [];

var allDone = false;

function get_music_listens() {
  FB.api('/me/music.listens', function(response) {
    listen = response.data;
    listenCount = listen.length;
    console.log(listen);
    for (var i=0; i<listenCount; i++) {
      ripMusicData(listen[i].data)
    }
  });
}

function ripMusicData(listen) {
  // console.log('called ' + listen.song.title);
  if (listen.album) {
    albumList.push(listen.album.title);
  }
  get_artist_name(listen);
  titleList.push(listen.song.title);
}

function get_artist_name(listen){
  console.log(listen);
  var albumID = listen.song.id;
  FB.api(albumID, function(response){
    artistList.push(response.data.musician[0].name);
    if (artistList.length === listenCount) { allDone = true; }
  });
}  


(function doneTest() {
  console.log('test ran');
  setTimeout(function() {
    if (allDone === true) {
      render();
    } else {
      doneTest();
    }
  }, 100);
})();


function render(){
  console.log('render ran');
  $.each(titleList, function(index, value){
    $('ul').append(
        $(document.createElement('li')).text('You listened to ' + titleList[index] + ' by ' + artistList[index])
    );
  });
}
  


</script>


<?php get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>
