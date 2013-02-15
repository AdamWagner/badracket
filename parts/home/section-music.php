<section class="red bottom1">
  <div class="album-container ">
    <?php 
    $album     = "1979291"; // lfbr album id
    $api_endpoint = "http://vimeo.com/api/v2/album";
    $path         = "/%s/videos.json";

    $url          = $api_endpoint . sprintf($path, $album);

    $json         = file_get_contents($url);
    $videos       = json_decode($json);


    ?>


    <div class="section-subtitle album-container-header group ">
      <div class="album-name pull-left padded-sides">Albums</div>
      <a href="" class="see-albums pull-right padded-sides">See All ></a>
    </div>

       <?php 
          // ALBUM
            //  artist
            //  albumName
            //  releaseDate
            //  recordingStudio
            //  albumUrl
            //  album duration
            //  buy url
            // TRACKS
              // * Defined by CMS *
                //  songTitle
                //  songNumber
                //  songDuration
                //  soundUrl
                //  sampleTrack [true/false]
              // * Dynamic *
                //  timestamp of last play
                //  sm2_object > populated on createSound()

         $img_path = 'images/';

         $albums = array(
            0 => array(
              artist => 'Signals Midwest',
              albumName => 'Latitudes and Longitudes',
              cover => $img_path.'album-art-signals.jpg',
              releaseDate => 'June 2011',
              recordingStudio => 'June 2011',
              albumUrl => 'album.php',
              buyURL => 'buy-album.php',
              tracks => array(
                0 => array (
                  songTitle => 'Limnology',
                  songURL => 'http://badracket-website.s3.amazonaws.com/signals-limnology.mp3',
                  songTrackNumber => '12',
                  duration => '2:51',
                  sampleTrack => true,
                  ),
                1 => array (
                  songTitle => 'Limnology',
                  songURL => 'http://badracket-website.s3.amazonaws.com/signals-limnology.mp3',
                  songTrackNumber => '12',
                  duration => '2:51',
                  sampleTrack => false,
                  ),
                2 => array (
                  songTitle => 'Limnology',
                  songURL => 'http://badracket-website.s3.amazonaws.com/signals-limnology.mp3',
                  songTrackNumber => '12',
                  duration => '2:51',
                  sampleTrack => false,
                  ),
                3 => array (
                  songTitle => 'Limnology',
                  songURL => 'http://badracket-website.s3.amazonaws.com/signals-limnology.mp3',
                  songTrackNumber => '12',
                  duration => '2:51',
                  sampleTrack => false,
                  ),
                4 => array (
                  songTitle => 'Limnology',
                  songURL => 'http://badracket-website.s3.amazonaws.com/signals-limnology.mp3',
                  songTrackNumber => '12',
                  duration => '2:51',
                  sampleTrack => false,
                  ),
              )
            ),
            1 => array(
              artist => 'Black Taxi',
              album => 'NYC and Brooklyn',
              title => 'Friends',
              cover => $img_path.'black-taxi2.png',
              sample_url => 'http://badracket-website.s3.amazonaws.com/black-taxi-master.mp3',
              track_number => '12',
              album_url => 'album.php',
              buy_url => 'buy-album.php'
            ),
            2 => array(
              artist => 'The Lighthouse and the Whaler',
              album => 'New Adventure',
              title => 'Pioneers',
              cover => $img_path.'latw.jpg',
              sample_url => 'http://badracket-website.s3.amazonaws.com/latw-pioneers.mp3',
              track_number => '12',
              album_url => 'album.php',
              buy_url => 'buy-album.php'
            ),
            3 => array(
              artist => 'Lost Jon and the Ghosts',
              album => 'Songs from the summer, part one',
              title => 'The Question',
              cover => $img_path.'lostjon.jpg',
              sample_url => 'http://badracket-website.s3.amazonaws.com/lost_jon-the_question.mp3',
              track_number => '12',
              album_url => 'album.php',
              buy_url => 'buy-album.php'
            ),
            4 => array(
              artist => 'Two Hand Fools',
              album => 'Tried and true',
              title => 'House Parts',
              cover => $img_path.'album-art-thf.jpg',
              sample_url => 'http://badracket-website.s3.amazonaws.com/thf-hot_tongues.mp3',
              track_number => '12',
              album_url => 'album.php',
              buy_url => 'buy-album.php'
            ),
            5 => array(
              artist => 'HUNGR',
              album => 'HUNGR Volume: 1',
              title => 'You\'re one',
              cover => $img_path.'hungr-cover.jpg',
              sample_url => 'audio/lost_jon-the_question.mp3',
              track_number => '12',
              album_url => 'album.php',
              buy_url => 'buy-album.php'
            ),
            6 => array(
              artist => 'HUNGR',
              album => 'HUNGR Volume: 1',
              title => 'You\'re one',
              cover => $img_path.'latw.jpg',
              sample_url => 'audio/lost_jon-the_question.mp3',
              track_number => '12',
              album_url => 'album.php',
              buy_url => 'buy-album.php'
            ),
          );
         ?>
         
         <div class="overflow-carousel">
           <div class="overflow-wrapper group p-5-9 s-3 m-5 b-5 h-7 single-row padded">
         <?php
         foreach ($albums as $album): ?> 
            <div class="grid album" data-album-url="<?php echo $album['album_url'] ?>" data-soundurl="<?php echo $album['sample_url'];?>" data-sample-title=<?php echo $album['title'];?>>
               <div class="album-cover img-container playable"> 
                 <div class="play"></div> 
                 <div class="album-cover-img lazyload fade" data-src="<?php echo $album['cover'];?>" alt="">
                    <img class="placeholder" src="images/ratio-1-1.gif" alt="">
                 </div> 
               </div> 
               <div class="album-meta">
                 <div class="album-title"><?php echo $album['album']; ?></div>
                 <div class="artist-name"><?php echo $album['artist']; ?></div>
               </div>
             </div>
         <?php endforeach; ?>
           </div>
         </div>

    </div> <?php // end albums ?>

  <div class="video-container group">

    <div class="section-subtitle video-container-header group">
      <div class="video-name pull-left padded-sides">Videos</div>
      <a href="" class="see-videos pull-right padded-sides">See All ></a>
    </div>

      <div class="s-1 m-3 b-3 h-4 single-row padded">
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
              <?php 
              // video title must be in format Band : Series Name
              $video_title = explode(":", $video -> title); 
              ?>
              <div class="album-title"><?php echo $video_title[0]; ?></div>
              <div class="artist-name"><?php echo date("M Y", strtotime($video -> upload_date)); ?></div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>

  </div>  <?php // end videos ?>

</section>