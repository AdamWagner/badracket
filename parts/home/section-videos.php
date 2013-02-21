<?php 
$album     = "1979291"; // lfbr album id
$api_endpoint = "http://vimeo.com/api/v2/album";
$path         = "/%s/videos.json";

$url          = $api_endpoint . sprintf($path, $album);

$json         = file_get_contents($url);
$videos       = json_decode($json);

?>
<div class="video-container group">

  <div class="section-subtitle video-container-header group">
    <div class="video-name pull-left padded-sides">Videos</div>
    <a href="" class="see-videos pull-right padded-sides">See All ></a>
  </div>

    <div class="s-1 m-3 b-3 h-4 single-row padded">
      <?php foreach($videos as $video): ?>
        <div class="grid padded"><a href="videos.php">
          <div class="img-container playable">
            <div class="play"></div> 
            <div class="lazyload fade" data-src="<?php echo $video -> thumbnail_large; ?>">
              <img class="placeholder" src="<?php echo get_template_directory_uri();?>/images/ratio-16-9.gif" alt="">
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
    </div>

</div>  <?php // end videos ?>