<section class="green padded-section">
  <div class="album-container s-3 m-4 b-5 h-7 single-row padded">

    <div class="album-container-header group padded-bottom">

      <div class="album-name pull-left padded-sides">Albums</div>
      <a href="" class="see-albums pull-right padded-sides">See all</a>
    </div>

    
    <div class="grid ">
      <div class="img-container">
        <div class="lazyload  ratio-1-1" data-src="http://www.thewildhoneypie.com/wp-content/uploads/2011/12/adele-21-album-cover.jpg" alt=""></div>
      </div>
    </div>
    
    <div class="grid ">
      <div class="img-container">
        <div class="lazyload  ratio-1-1" data-src="http://www.thewildhoneypie.com/wp-content/uploads/2011/12/adele-21-album-cover.jpg" alt=""></div>
      </div>
    </div>
    
    <div class="grid ">
      <div class="img-container">
        <div class="lazyload  ratio-1-1" data-src="http://www.thewildhoneypie.com/wp-content/uploads/2011/12/adele-21-album-cover.jpg" alt=""></div>
      </div>
    </div>

    <div class="grid ">
      <div class="img-container">
        <div class="lazyload  ratio-1-1" data-src="http://www.thewildhoneypie.com/wp-content/uploads/2011/12/adele-21-album-cover.jpg" alt=""></div>
      </div>
    </div>

    <div class="grid ">
      <div class="img-container">
        <div class="lazyload  ratio-1-1" data-src="http://www.thewildhoneypie.com/wp-content/uploads/2011/12/adele-21-album-cover.jpg" alt=""></div>
      </div>
    </div>
    <div class="grid ">
      <div class="img-container">
        <div class="lazyload  ratio-1-1" data-src="http://www.thewildhoneypie.com/wp-content/uploads/2011/12/adele-21-album-cover.jpg" alt=""></div>
      </div>
    </div>
    <div class="grid ">
      <div class="img-container">
        <div class="lazyload  ratio-1-1" data-src="http://www.thewildhoneypie.com/wp-content/uploads/2011/12/adele-21-album-cover.jpg" alt=""></div>
      </div>
    </div>
  </div> <?php // end albums ?>

  <div class="video-container group s-1 m-2 b-3 h-4 single-row padded">

    <div class="video-container-header group padded-bottom">
      <div class="video-name pull-left padded-sides">Videos</div>
      <a href="" class="see-videos pull-right padded-sides">See all</a>
    </div>

      <?php 
      foreach($videos as $video) {
        $thumbnail = $video -> thumbnail_large;
        echo '<div class="grid"><a href="videos.php"><div class="img-container"><div class="lazyload ratio-16-9" data-src ="'.$thumbnail.'"/></div></a></div></div>';
      };
      ?>


  </div>  <?php // end videos ?>
  
</section>