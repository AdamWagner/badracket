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

<?php 
  // get_template_part('external/brv5_facebook'); 
  // include (TEMPLATEPATH . '/external/brv5_facebook.php');
?>

<h1>js-sdk</h1>

<ul></ul>

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
  var albumID = listen.song.id;
  FB.api(albumID, function(response){
    artistList.push(response.data.musician[0].name);
    if (artistList.length === listenCount) { render(); }
  });
}  

function get_friends() {
   FB.api('/me/friends', function(response) {
    console.log(response);
    friends_likes(response);
  });
}

function friends_likes(friends) {
  for (i=0; i<friends.data.length; i++) {
    var id = friends.data[i].id;
    name = friends.data[i].name;
    (function(){
      var j = name;
      FB.api(id + '/likes', function(response) {
        var len = response.data.length;
        console.log('***' + j + '***');
        for (i=0; i<len; i++) {
          if (response.data[i].category === "Musician/band") {
            console.log(response.data[i].name);
          }
        }
      });
    })();
  }
}

function render(){
  $.each(titleList, function(index, value){
    $('ul').append(
        $(document.createElement('li')).text('You listened to ' + titleList[index] + ' by ' + artistList[index])
    );
  });
}
  


</script>


<?php get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>
