<?php 

$album     = "1979291"; // lfbr album id
$api_endpoint = "http://vimeo.com/api/v2/album";
$path         = "/%s/videos.json";

$url          = $api_endpoint . sprintf($path, $album);

$json         = file_get_contents($url);
$videos       = json_decode($json);

foreach($videos as $video): ?>

  <div class="grid padded"><a href="videos.php">
    <div class="playable">
      <div class="play"></div> 
      <div class="lazyload fade ratio-16-9" data-src="<?php echo $video -> thumbnail_large; ?>">
      </div>
      </a>
    </div>
    <div class="album-meta">
      <?php 
      // video title must be in format Band : Series Name
      $video_title = explode(":", $video -> title); 
      ?>
      <div class="album-title"><?php echo $video_title[0]; ?></div>
      <div class="artist-name"><?php echo date("M Y", strtotime($video -> upload_date)); ?></div>
    </div>
  </div>

<?php endforeach; ?>