<nav  id="nav" role="navigation">
    <div class="main-nav-container">

    <ul class="nav-list reset-list">

      <li class="nav-level-1 active">
        <div class="nav-title">
          <div class="icon"></div>
          <div class="text">Music</div>
        </div>

        <ul class="reset-list">
          <li id="nav-albums">
            <a href="<?php echo get_post_type_archive_link( 'album' ); ?>">Albums</a>
            <span class="count"></span>
          </li>
          <li id="nav-videos">
            <a href="<?php echo get_page_link(160);?>">Videos</a>
            <span class="count"></span>

          </li>
          <li class="bottom1" id="nav-shows">
            <a href="<?php echo get_post_type_archive_link( 'show' ); ?>">Shows</a>
            <span class="count"></span>
          </li>
          <li class="hidden-mobile">
            <a href="<?php echo get_page_link(336);?>">Photos</a>
          </li>
          <li class="hidden-mobile">
            <a href="<?php echo get_post_type_archive_link( 'interview' ); ?>">Interviews</a>
          </li>
          <li class="hidden-mobile">
            <a href="<?php echo get_page_link(2479);?>">Articles</a>
          </li>
        </ul>

      </li>

      <li class="nav-level-1 active">
        <div class="nav-title">
          <div class="icon"></div>
          <div class="text">Record</div>
        </div>

        <ul class="reset-list">
          <li><a href="<?php echo get_page_link(9);?>">Process</a></li>
          <li><a href="<?php echo get_page_link(2476);?>">Gear</a></li>
          <li><a href="<?php echo get_page_link(1316);?>">Rates</a></li>
        </ul>

      </li>


      <li class="nav-level-1 active">
        <div class="nav-title">
          <div class="icon"></div>
          <div class="text">Team</div>
        </div>

        <ul class="reset-list">
          <li><a href="<?php echo get_post_type_archive_link( 'staff' ); ?>">Staff</a></li>
          <li><a href="<?php echo get_page_link(2696);?>">Join Team</a></li>
        </ul>

      </li>

    </ul>
<a class="pill-button top1 mr-0"href="<?php echo get_bloginfo('url'); ?>"><span>◀</span>&nbsp;Home</a>
  </div> <?php // end main nav container ?>

<a href="<?php echo get_bloginfo('url'); ?>">
  <div class="watermark-logo">
    <div class="mark"></div>
  </div>
</a>

</nav>


















