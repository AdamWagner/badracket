<?php include 'parts/html-header.php';?>



<?php 
$album     = "1979291"; // LFBR album ID
$api_endpoint = "http://vimeo.com/api/v2/album";
$path         = "/%s/videos.json";

// Now let's build up the URL we're going to call to get the videos
$url          = $api_endpoint . sprintf($path, $album);

// Cool! file_get_contents works over HTTP too!
$json         = file_get_contents($url);
$videos       = json_decode($json);


?>


<body data-state="default-state">

  <div class="badracket-window">

    <?php include 'parts/desktop-header.php'; ?>

    <header class="mobile hidden-big">
      <div class="layout-one-third"> <div class="menu"></div> </div>
      <div class="layout-one-third"> <div class="logo"></div> </div>
      <div class="layout-one-third"> <div class="info"></div> </div>
    </header>

    <div  class="app-main page-width group ">

      <?php include 'parts/nav.php'; ?>

      <div id="video-main" class="main-content scrollable group updatable">
      <div class="loading-fade"> <?php include('parts/loading.php');?> </div>
        <section class="red padded-section">
          <div class="video-container group s-1 m-3 b-3 h-4 padded">

            <div class="section-subtitle video-container-header group padded-bottom">
              <div class="video-name pull-left padded-sides">Videos</div>
              <a href="" class="see-videos pull-right padded-sides">See all</a>
            </div>

              <?php foreach($videos as $video): ?>
                <div class="grid padded"><a href="videos.php">
                  <div class="img-container playable">
                    <div class="play"></div> 
                    <div class="lazyload fade" data-src="<?php echo $video -> thumbnail_large; ?>">
                      <img class="placeholder" src="images/ratio-16-9.gif" alt="">
                    </div>
                    </a>
                  </div>
                  <div class="album-meta">
                    <?php $video_title = explode(":", $video -> title); 
                    ?>
                    <div class="album-title"><?php echo $video_title[0]; ?></div>
                    <div class="artist-name"><?php echo date("M Y", strtotime($video -> upload_date)); ?></div>
                  </div>
                </div>
              <?php endforeach; ?>

          </div>  <?php // end videos ?>
          
        </section>
      </div>
    </div> <?php // end app-main ?>
  </div> <?php //end badracket-window ?>




<?php include('parts/html-footer.php');?>

