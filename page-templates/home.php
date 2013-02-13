<?php
/**
 * Template Name: Home
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/shared/html-header'); ?>

  

<?php  get_template_part('parts/shared/header'); ?>


<nav class="playbar dark group">
  <div class="playhead"></div>
  <div class="metadata">
    <span class="current-artist"></span>
    <span>-</span>
    <span class="current-title"></span>
  </div>
  <div class="album-links txtR">
    <a href="#">Download this track</a>
    <a href="#" class="button  ">Buy Album</a>
  </div>

</nav>

<?php
  $my_query = null;
  $my_query = new WP_Query(
    array(
    'post_type' => 'album',
    'orderby' => 'rand',
      )
    );
?>

<section role="main" class="red">
<div class="section-inner">
  <?php the_content(); ?>
  <hgroup>
    <h2>Discover Cleveland Music</h2>
    <p>Music Lovers: There’s something essential in four walls that makes music sound so good.</p>
  </hgroup>
  <div class="section-controls">
    <h5>Albums</h5>
    <p>Music from Cleveland's working musicians</p>
    <a href="#" class="button">View all music</a>
  </div>
  <div class="fade-red left"></div>
  <div id="pattern" class="pattern">
  <span data-icon="j" data-direction="previous" class="carousel carousel-previous"></span>


  <ul class="thumbnail responsive img-list quint albums sm-player">
  <?php while ( $my_query->have_posts() ) : $my_query->the_post(); ?>
    <li>  
      <a href="<?php echo get_post_meta($post->ID, '_br_audio_url', true); ?>" class="inner">
        <div class="li-img">
          <img src="<?php echo get_post_meta($post->ID, '_br_cover_url', true);?>" alt="Image Alt Text" />
          <div class="share">
            <span data-icon="H" class="heart"></span>
            <span data-href="<?php echo get_post_meta($post->ID, '_br_audio_url', true); ?>" data-icon="d" class="download"></span>
            <span data-icon="s" class="post-share"></span>
          </div>
        </div>
        <div class="li-text">
          <h4 class="li-head"><span data-icon="m" class="play-pause"></span> <?php the_title(); ?></h4>
        </div>
      </a>
    </li>
  <?php endwhile; ?>
  </ul>
  <span data-direction="next" data-icon="k" class="carousel carousel-next"></span>
  </div>
  <div class="fade-red right"></div>
</div>



<div class="cta section-inner small">
    <p>Subscribe to get notified of album releases, shows, and parties</p>
    <form action="">
        <input type="email" placeholder="Your Email">
        <input type="submit">
    </form>
</div>


<div class="section-inner">
<div class="section-controls">
  <h5>Videos</h5>
  <p>Live from Bad Racket is a monthly music video series</p>
  <a href="#" class="button">View all videos</a>
</div>


<!--Pattern HTML-->
<div id="pattern" class="pattern">
<ul class="thumbnail img-list triple videos">
        <li>
            <a href="#" class="inner">
                <div class="li-img">
                    <img src="<?php echo get_bloginfo('template_directory');?>/images/foo-rect.png" alt="Image Alt Text" />
                </div>
                <div class="li-text">
                    <h4 class="li-head">Title of Content</h4>
                </div>
            </a>
        </li>
        <li>
            <a href="#" class="inner">
                <div class="li-img">
                    <img src="<?php echo get_bloginfo('template_directory');?>/images/foo-rect.png" alt="Image Alt Text" />
                </div>
                <div class="li-text">
                    <h4 class="li-head">Title of Content</h4>
                </div>
            </a>
        </li>
        <li>
            <a href="#" class="inner">
                <div class="li-img">
                    <img src="<?php echo get_bloginfo('template_directory');?>/images/foo-rect.png" alt="Image Alt Text" />
                </div>
                <div class="li-text">
                    <h4 class="li-head">Title of Content</h4>
                </div>
            </a>
        </li>

    </ul>
</div>
<!--End Pattern HTML-->
</div> <!-- end inner -->
 </section> 

        <section class="green">
          <div class="section-inner">
            <hgroup>
                <h2>Make Music</h2>
                <p>“Bad Racket is the story I tell most when people ask me "What's special about Cleveland?" - Zach Bloom</p>
            </hgroup>
          </div>
        </section>
        <section class="cream">
          

        </section>
    </div> <!-- end page wrap -->



<script>

$(window).load(function(){


    setTimeout(function() {
        $('.play-pause').addClass('loaded');
    }, 500);

});
</script>

<?php get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>

  

