<?php
/**
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>

      <section class="red show-rollup-section group p0" data-album-title="<?php echo the_title();?>">
      <h1 class="padded-sides">Upcoming Shows</h1>

      <?php
       while (have_posts()) : the_post();
       $supporting_band_count = count(get_post_meta($post->ID, '_br_supporting-band-names', true));
       $cover_photo = wp_get_attachment_url(get_post_meta($post->ID, '_br_plupload', true));

       if ( $supporting_band_count < 2 ) {
         $more_text = 'more band';
       } else {
         $more_text = 'more bands';
       }

       // Show date and venue section
       $show_date = get_post_meta($post->ID, '_br_show-date', true);
       $show_human_date = date("F jS",strtotime($show_date));
       $show_venue = get_post_meta($post->ID, '_br_show-venue', true);
       $show_human_time = date("g:i a",strtotime($show_date));
       $show_headliner_band_name = get_the_title();

       // RSVP + ticketing
       $fb_event_id = get_post_meta($post->ID, '_br_facebook-event-url', true);
       $advance_ticket_price = get_post_meta($post->ID, '_br_advance-ticket-price', true);
       $door_ticket_price = get_post_meta($post->ID, '_br_door-ticket-price', true);
       $ticket_url = get_post_meta($post->ID, '_br_ticket-url', true);

       $now =  new DateTime('NOW');
       $date_split = split(" ", $show_date);
       $show_date_php = new DateTime($date_split["0"]);
       $then = $show_date_php->getTimestamp();
       $now_now = $now->getTimestamp();
      ?>

      <?php if( $then > $now_now ): ?>

      <a href="<?php echo the_permalink();?>">
        <div class="show-card group padded-section" data-timestamp="<?php echo $then; ?>">
          <div class="layout-main">
             <div class="grid-20 group cover-photo-container hidden-mobile">
                 <div class="lazyload cover-photo" data-src="<?php echo $cover_photo;?>"></div>
             </div>
             <div class="pull-left padded-mobile-1 grid-80">
                 <h2 class="show-headliner"><?php the_title(); echo ' <span class="other-bands">and ' . $supporting_band_count . ' ' . $more_text . ' </span>' ?></h2>
                 <div class="show-details"><?php echo $show_venue; ?>, <?php echo $show_human_date;?> </div>
                 <span class="start-playlist album hidden-phone"  data-album-title="<?php echo the_title(); ?>"><span data-icon="m"></span>Start show playlist</span>
                 <div class="show-description top1 hidden-phone"> <?php my_excerpt(55);?> </div>
             </div>
         </div>
       </a>

        <div class="layout-sidebar">
          <div class="show-rollup-sidebar padded-mobile-1">
            <div class="button-group top1">
              <span data-fb-id="<?php echo $fb_event_id; ?>"  class="show-rsvp not-attending"><span data-icon="c" class="icon-checkmark"></span><span class="text">RSVP</span></span>
              <?php if ($advance_ticket_price === '0'): ?>
              <a href="<?php echo $ticket_url; ?>" class="show-buy-tickets top1">Get free tickets</a>
              <div class="sub-button-details">
                <div class="txtC top05">Show at <?php echo $show_human_time; ?></div>
              </div>
              <?php else: ?>
                <a href="<?php echo $ticket_url; ?>" class="show-buy-tickets top1">Get tickets</a>
                <div class="sub-button-details">
                  <div class="txtC top1">Tickets <?php echo '$' . $advance_ticket_price; ?> advance</div>
                  <div class="txtC top05">Show at <?php echo $show_human_time; ?></div>
                </div>
              <?php endif;?>
            </div>
          </div>

        </div>

      </div>
      <?php  endif; ?>
      <?php endwhile; ?>
    </section>

    <section class="red show-rollup-section group p0 past-shows hidden-phone">
      <h2 class="padded-sides top1">Past Shows</h2>

      <div class="group padded-sides" data-timestamp="<?php echo $then; ?>">
      <table>
        <tbody>

        <?php
         while (have_posts()) : the_post();
         $supporting_band_count = count(get_post_meta($post->ID, '_br_supporting-band-names', true));
         if ( $supporting_band_count < 2 ) {
           $more_text = 'more band';
         } else {
           $more_text = 'more bands';
         }
         // Show date and venue section
         $show_date = get_post_meta($post->ID, '_br_show-date', true);
         $show_human_date = date("F jS",strtotime($show_date));
         $show_venue = get_post_meta($post->ID, '_br_show-venue', true);
         $show_human_time = date("g:i a",strtotime($show_date));
         $show_headliner_band_name = get_the_title();

         $now =  new DateTime('NOW');
         $date_split = split(" ", $show_date);
         $show_date_php = new DateTime($date_split["0"]);
         $then = $show_date_php->getTimestamp();
         $now_now = $now->getTimestamp();
        ?>

        <?php  if( $then < $now_now ): ?>
          <tr>
            <td class="past-show-title"><?php the_title(); echo ' <span class="other-bands">and ' . $supporting_band_count . ' ' . $more_text . ' </span>' ?></td>
            <td class="past-show-date"><?php echo $show_venue; ?>, <?php echo $show_human_date;?></td>
          </tr>
        <?php  endif; ?>
      <?php endwhile; ?>

         </tbody>
      </table>
    </div>
    </section>


 <?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>