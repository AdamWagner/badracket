<?php
/**
 * Template Name: Home
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>


<?php get_template_part('parts/shared/html-header'); ?>

<body data-state="default-state" >
  <div data-src="http://badracket.com/wp-content/themes/badracketv4/images/bad-racket-bg-image2.jpg" class="bg lazyload fade-this"></div>

  <div class="badracket-window">

     <?php  get_template_part('parts/header-desktop');?>
     <?php  get_template_part('parts/header-mobile');?>

    <div  class="app-main page-width group ">

     <?php  get_template_part('parts/nav');?>

      <div id="home-main"class="main-content scrollable group updatable">
      <div class="loading-fade"> <?php get_template_part('parts/loading');?> </div>

      <section class="pink-cream show-main-section layout-main" data-album-title="<?php echo the_title();?>">
        <?php
         while (have_posts()) : the_post();
         $supporting_bands = get_post_meta($post->ID, '_br_supporting-band-names', true);
         $cover_photo = get_post_meta($post->ID, '_br_plupload', true);

        ?>


            <div class="show-bg-image">
              <img class="show-cover-photo"src="<?php echo wp_get_attachment_url($cover_photo);  ?>" alt="<?php echo the_title(); ?> at <?php ?>">
            </div>

              <div class="show-heading padded-mobile-1">
                <h1 class="show-headliner"><?php the_title(); ?></h1>
                <h2 class="show-supporting-bands">with <?php 

                foreach ( $supporting_bands as $band ) {
                  if ($band === end($supporting_bands)){
                    echo $band;
                  } else {
                    echo $band . ' / ';
                  }
                }
                ?> 
              </h2>
              </div>

            <div class="show-description padded-mobile-1">
              <?php the_content();?>
            </div>

            <div class="section-divider"><div>Playlist</div></div>

            <div class="playlist">
              <table class="track-list">
                <tbody>
                  <?php
                  $custom_fields = get_post_custom();
                  $songCount = 0;
                  foreach ( $custom_fields as $field_key => $field_values ) {
                    if (strpos($field_key,'songTitle') !== false) {
                      $songCount++;
                    }
                  }
                  for( $i=1; $i < $songCount + 1; $i++ ) {
                    // set SongTitle
                    if ($i<10) {
                      $songTitle = ucSent(get_post_meta($post->ID, '_br_songTitle-0'.$i.'', true));
                      $songArtist = ucSent(get_post_meta($post->ID, '_br_artist-0'.$i.'', true));
                      $duration = get_post_meta($post->ID, '_br_duration-0'.$i.'', true); 
                      $songTrackNumber = get_post_meta($post->ID, '_br_songTrackNumber-0'.$i.'', true); 
                      $isPreview = get_post_meta($post->ID, '_br_isSampleTrack-0'.$i.'', true); 
                    } else {
                      $songTitle = ucSent(get_post_meta($post->ID, '_br_songTitle-'.$i.'', true));
                      $songArtist = ucSent(get_post_meta($post->ID, '_br_artist-'.$i.'', true));
                      $duration = get_post_meta($post->ID, '_br_duration-'.$i.'', true); 
                      $songTrackNumber = get_post_meta($post->ID, '_br_songTrackNumber-'.$i.'', true); 
                    }
                    echo '<tr class="song" data-track-number="'.$songTrackNumber.'">';
                        echo  '<td class="trackNumber">
                              <div class="speaker-icon" data-icon="s"></div>
                              <div class="play-icon" data-icon="m"></div>
                              <div class="the-track-number">'. intval($songTrackNumber) . '</div>
                              </td>';
                        echo  '<td>'. $songTitle . '<span class="song-artist">&nbsp; - &nbsp; ' . $songArtist .'</span></td>';
                        echo  '<td class="duration">'. $duration . '</td>';
                        // echo  '<td><a href="#">Tweet</a></td>';
                    echo '</tr>';
                  }
                ?>
                </tbody>
              </table>
            </div>

      </section>

      <section class="red show-sidebar layout-sidebar padded-mobile-1">
        <?php
         // Show date and venue section
         $show_date = get_post_meta($post->ID, '_br_show-date', true);
         $show_human_date = date("l F jS",strtotime($show_date));
         $show_human_time = date("g:i a",strtotime($show_date));

         $show_venue = get_post_meta($post->ID, '_br_show-venue', true);
         $show_venue_address_street = get_post_meta($post->ID, '_br_show-venue-address-street', true);
         $show_venue_address_city = get_post_meta($post->ID, '_br_show-venue-address-city', true);
         $show_venue_address_state = get_post_meta($post->ID, '_br_show-venue-address-state', true);
         $show_venue_address_zip = get_post_meta($post->ID, '_br_show-venue-address-zip', true);

         $show_headliner_band_name = get_the_title();
         $google_map_url = 'http://maps.google.com/?q=' . $show_venue_address_street . ', ' . $show_venue_address_city . ', ' . $show_venue_address_state;
         $gcal_link = 'http://www.google.com/calendar/event?ctext=+'. $show_headliner_band_name .' at '. $show_venue .' '. $show_human_date . ' ' . $show_human_time . '+&action=TEMPLATE&pprop=HowCreated%3AQUICKADD';

         // RSVP + ticketing
         $advance_ticket_price = get_post_meta($post->ID, '_br_advance-ticket-price', true);
         $door_ticket_price = get_post_meta($post->ID, '_br_door-ticket-price', true);
        ?>

        <div class="show-date top1">
          <div class="date-text"><?php echo  $show_human_date . ' ' . $show_human_time; ?> </div>
          <a href="<?php echo $gcal_link; ?>">add to calendar</a>
        </div>

        <div class="show-venue top1">
          <div class="venue-name"><?php echo $show_venue; ?></div>
          <div class="venue-address">
            <div class="street"><?php echo $show_venue_address_street; ?></div>
            <div class="city"><?php echo $show_venue_address_city; ?> <?php echo $show_venue_address_state; ?> <?php echo $show_venue_address_zip; ?> </div>
          </div>


          <a href="<?php echo $google_map_url; ?>">map</a>
        </div>

        <div class="button-group top2">

          <a data-fb-id="486535661414081" href="###" class="show-rsvp">RSVP with Facebook</a>

          <a href="#" class="show-buy-tickets top1">Get $<?php echo $advance_ticket_price; ?> advance tickets</a>
          <div class="price-note txtC top05">tickets will be $<?php echo $door_ticket_price; ?> at door</div>

        </div>
        
      </section>
      <?php endwhile; ?>


      </div>
    </div> <?php // end app-main ?>
  </div> <?php //end badracket-window ?>


<?php get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>
