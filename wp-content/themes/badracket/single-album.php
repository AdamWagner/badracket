<?php
/**
 * Template Name: Home
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>

<section class="red album-page-section">

  <?php
  while (have_posts()) : the_post();
    $custom_fields = get_post_custom();
    $songCount = 0;
    foreach ( $custom_fields as $field_key => $field_values ) {
      if (strpos($field_key,'songTitle') !== false) {
        $songCount++;
      }
    }

    $engineer = wp_get_post_terms($post->ID, 'engineer', array("fields" => "names"));
    $eng_name = $engineer[0];
    $eng_id = (get_page_by_title($eng_name, OBJECT, 'staff')->ID);
    $eng_link = get_permalink($eng_id);


    $albumName = ucwords(get_the_title());
    $artist = ucwords($custom_fields['_br_artist']['0']);
    $cover = $custom_fields['_br_cover_url']['0'];
    $releaseDate = $custom_fields['_br_release_date']['0'];
    $recordingStudio = $custom_fields['_br_recording_studio']['0'];
    $twitterHandle = $custom_fields['_br_artist_twitter']['0'];
    $price = $custom_fields['_br_price']['0'];
    $isCompilation = $custom_fields['_br_is_compilation']['0'];


    $totalmins;
    $totalsecs;
    for( $i=1; $i < $songCount + 1; $i++ ) {
      if ($i<10) {
        $duration = explode(':', get_post_meta($post->ID, '_br_duration-0'.$i.'', true));
      } else {
        $duration = explode(':', get_post_meta($post->ID, '_br_duration-'.$i.'', true));
      }
      $totalmins = $totalmins + intval($duration[0]);
      $totalsecs = $totalsecs + intval($duration[1]);
    }
    $total_msecs = intval(($totalsecs) + ($totalmins * 60));
  ?>

  <div class="album-page-wrapper">


    <div class="album-page-meta">

      <div class="album-page-cover">
        <img src="<?php echo $cover; ?>" alt="<?php echo $artist . ' - ' . $albumName; ?>">
        <div class="detail-buy-album-wrap">
        </div>
      </div>


      <div class="meta-text padded-mobile-1">
        <h1 class="album-page-title" data-album-title="<?php the_title();?>"><?php the_title(); ?></h1>
        <h2 class="album-page-artist"><?php echo $artist; ?></h2>
        <p class="release-date hidden-phone"><?php echo date("M j, Y",strtotime($releaseDate)); ?> | Recorded at <?php echo $recordingStudio ?> <?php if ($eng_name):?>  by <a class="engineer" href="<?php echo $eng_link; ?>"><?php echo $eng_name; ?> </a> <?php endif;?></p>
        <p class="total-duration hidden-phone"><?php echo $songCount; ?> songs (<?php echo secondsToWords($total_msecs); ?> )</p>
        <span class="buy-album-detail">
          <?php if($price > 0) {
            echo '$' . money_format('%i',$price) . ' - Buy this album';
          } else {
            echo 'Download for free';
          } ?>
          </span>
      </div>

    </div>


    <table class="track-list">
      <tbody>
        <?php
        for( $i=1; $i < $songCount + 1; $i++ ) {
          // set SongTitle
          if ($i<10) {
            $songTitle = ucSent(get_post_meta($post->ID, '_br_songTitle-0'.$i.'', true));
            $duration = get_post_meta($post->ID, '_br_duration-0'.$i.'', true);
            $isPreview = get_post_meta($post->ID, '_br_isSampleTrack-0'.$i.'', true);
            $songArtist = get_post_meta($post->ID, '_br_songArtist-0'.$i.'', true);
          } else {
            $songTitle = ucSent(get_post_meta($post->ID, '_br_songTitle-'.$i.'', true));
            $duration = get_post_meta($post->ID, '_br_duration-'.$i.'', true);
            $isPreview = get_post_meta($post->ID, '_br_isSampleTrack-'.$i.'', true);
            $songArtist = get_post_meta($post->ID, '_br_songArtist-'.$i.'', true);
          }
          echo '<tr class="song" data-track-number="'.$i.'">
                <td class="trackNumber">
                    <div class="speaker-icon" data-icon="s"></div>
                    <div class="play-icon" data-icon="m"></div>
                    <div class="the-track-number">'. $i . '</div>
                </td>
                <td>'. $songTitle . '</td>';
              if ($isCompilation) {
                echo '<td><em class="artist">' . $songArtist . '</em></td>';
              }
              if (!$isPreview) {
                echo  '<td class="preview">preview</td> <td class="unlocked"></td>';
              } else {
                echo '<td class="preview"></td> <td class="unlocked"></td>';
              }
              echo  '<td class="duration">'. $duration . '</td>';
              // echo  '<td><a href="#">Tweet</a></td>';
          echo '</tr>';
        }
      endwhile;
      ?>
      </tbody>
    </table>
  </div>
</section>

<section class="dark-red">
  <div class="album-container">
    <div class="section-subtitle album-container-header group ">
      <div class="album-name pull-left padded-sides">Up Next...</div>
      <a href="<?php echo get_post_type_archive_link( 'album' ); ?>" class="see-albums pull-right padded-sides">See All ></a>
    </div>
    <div class="overflow-carousel">
      <div class="overflow-wrapper group p-5-9 s-3 m-5 b-5 h-7 single-row padded">
      <?php get_template_part('parts/content-loops/album-loop-more');?>
      </div>
    </div>
  </div>
</section>

<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>