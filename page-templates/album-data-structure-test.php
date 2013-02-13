<?php
/**
 * Template Name: album-data-stucture-test
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/shared/html-header'); ?>

<?php  get_template_part('parts/shared/header'); ?>


<h1>Album data structure test</h1>

<?php 
    query_posts(array('post_type' => 'album' ) );
    $albums = array();

    while (have_posts()) : the_post();
    echo '<h1>'.the_title().'</h1>';
    $meta = get_post_custom($post_id);
    $meta['albumName'] = get_the_title($post_id);;
    array_push($albums, $meta);

    print_r($albums);

    endwhile;


    // read id3 tag of uploaded mp3
    // http://code.google.com/p/php-reader/wiki/ID3v2
    // http://www.codediesel.com/pear/reading-mp3-file-tags-in-php/
?>




<script>
var bar = <?php echo json_encode($albums[0]); ?>;

var cleanAlbums;

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

function count_tracks(obj, objName) {
    var trackCount=0;
    for (var prop in obj) {
      if (prop.toString().contains('songTitle')) {
        trackCount++;
      }
    }
    return trackCount;
}

var trackCount = count_tracks(bar, 'albums');

function createHierarchy(obj) {
    obj.tracks = [];
    for (var i=1; i <= trackCount; i++) {
      var trackTemp = {};
      for (var prop in obj) {
        if (prop.toString().contains(i.toString())) {
          trackTemp[prop] = obj[prop].toString();
          delete obj[prop];
        }
      }
      obj.tracks.push(trackTemp);
    }
}

function cleanPhpPropertyKeys(obj) {
  for (var prop in obj) {
    if (prop.toString().contains('edit')) {
      delete obj[prop];
    } else if (prop.toString() === '_br_artist') {
      obj['artist'] = obj[prop].toString();
      delete obj[prop];
    } else if (prop.toString() === '_br_zip_file') {
      obj['zipFile'] = obj[prop].toString();
      delete obj[prop];
    } else if (prop.toString() === '_br_cover_url') {
      obj['cover'] = obj[prop].toString();
      delete obj[prop];
    } else if (prop.toString() === '_br_release_date') {
      obj['releaseDate'] = obj[prop].toString();
      delete obj[prop];
    } else if (prop.toString() === '_br_buy_url') {
      obj['buyUrl'] = obj[prop].toString();
      delete obj[prop];
    } else if (prop.toString() === '_br_recording_studio') {
      obj['recordingStudio'] = obj[prop].toString();
      delete obj[prop];
    }
  }
}


function cleanPhpAlbumPropKeys(obj) {
  trackcount = obj.length;

  for (i=0; i<trackcount; i++) {
    for (var prop in obj[i]) {
      if (prop.contains('duration')) {
          obj[i]['duration'] = obj[i][prop];
          delete obj[i][prop];
      } else if (prop.contains('songTitle')) {
          obj[i]['songTitle'] = obj[i][prop];
          delete obj[i][prop];
      } else if (prop.contains('TrackNumber')) {
          obj[i]['trackNumber'] = obj[i][prop];
          delete obj[i][prop];
      } else if (prop.contains('songUrl')) {
          obj[i]['soundUrl'] = obj[i][prop];
          delete obj[i][prop];
      } else if (prop.contains('checkbox')) {
          obj[i]['isSampleTrack'] = obj[i][prop];
          delete obj[i][prop];
      }
    }
  }
}

createHierarchy(bar);
cleanPhpPropertyKeys(bar);
cleanPhpAlbumPropKeys(bar.tracks);

console.log(bar);




</script>

<?php get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>
