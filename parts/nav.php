<nav  id="nav" role="navigation">
    <div class="main-nav-container">

    <ul class="nav-list reset-list">

      <li class="nav-level-1 active">
        <div class="nav-title">
          <div class="icon"></div>
          <div class="text">Music</div>
        </div>

        <ul class="reset-list">
          <li>
            <a href="<?php echo get_post_type_archive_link( 'album' ); ?>">Albums</a>
            <span class="count">12</span>
          </li>
          <li>
            <a href="<?php echo get_page_link(160);?>">Videos</a>
            <span class="count new">25</span>
          </li>
          <li>
            <a href="<?php echo get_post_type_archive_link( 'show' ); ?>">Shows</a>
            <span class="count">25</span>
          </li>
          <li class="small"> <a href="<?php echo get_page_link(336);?>">More</a> </li>
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
  </div> <?php // end main nav container ?>
</nav>