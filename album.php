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
  <div data-src="http://badracket.com/wp-content/themes/badracketv4/images/bad-racket-bg-image2.jpg" class="bg lazyload fade-this"></div>

  <div class="badracket-window">

    <?php include 'parts/desktop-header.php'; ?>

    <header class="mobile hidden-big">
      <div class="layout-one-third"> <div class="menu"></div> </div>
      <div class="layout-one-third"> <div class="logo"></div> </div>
      <div class="layout-one-third"> <div class="info"></div> </div>
    </header>

    <div  class="app-main page-width group ">

      <?php include 'parts/nav.php'; ?>

      <div id="album-page"class="main-content scrollable group updatable">
      <div class="loading-fade"> <?php include('parts/loading.php');?> </div>
        <?php include('parts/home/section-music.php');?>
      </div>
    </div> <?php // end app-main ?>
  </div> <?php //end badracket-window ?>

<?php include('parts/html-footer.php');?>
