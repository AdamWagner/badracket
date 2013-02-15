<?php include 'parts/html-header.php';?>






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

      <div id="home-main"class="main-content scrollable group updatable">
      <div class="loading-fade"> <?php include('parts/loading.php');?> </div>
        <?php include('parts/home/section-music.php');?>
      </div>
    </div> <?php // end app-main ?>
  </div> <?php //end badracket-window ?>




<?php include('parts/html-footer.php');?>


