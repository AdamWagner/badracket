<?php
/**
 * Template Name: Home
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>





<?php get_template_part('parts/shared/html-header'); ?>

<body data-state="default-state">
  <div data-src="http://badracket.com/wp-content/themes/badracketv4/images/bad-racket-bg-image2.jpg" class="bg lazyload fade-this"></div>

  <div class="badracket-window">

     <?php  get_template_part('parts/header-desktop');?>
     <?php  get_template_part('parts/header-mobile');?>


    <div  class="app-main page-width group ">

     <?php  get_template_part('parts/nav');?>

      <div id="home-main"class="main-content scrollable group updatable">
      <section class="red bottom1">


      <?php // ALBUMS ?>
       <div class="album-container bottom1">
         <div class="section-subtitle album-container-header group ">
           <div class="album-name pull-left padded-sides">Albums</div>
           <a href="<?php echo get_post_type_archive_link( 'album' ); ?>" class="see-albums pull-right padded-sides">See All ></a>
         </div>
         <div class="overflow-carousel">
           <div class="overflow-wrapper group p-5-9 s-3 m-5 b-5 h-7 single-row padded">
           <?php get_template_part('parts/content-loops/album-loop');?>
         </div>
       </div>

       </div> <?php // end albums ?> 

      <?php // VIDEOS ?>
        <div class="video-container group">
          <div class="section-subtitle video-container-header group">
            <div class="video-name pull-left padded-sides">Videos</div>
            <a href="" class="see-videos pull-right padded-sides">See All ></a>
          </div>
            <div id="video-container" class="s-1 m-3 b-3 h-4 single-row padded"> </div>
        </div>  <?php // end videos ?>

        </section>

        <section class="green bottom1" style="height:400px;">

           <div class="section-subtitle album-container-header group ">
             <div class="album-name pull-left padded-sides">Record</div>
             <a href="<?php echo get_post_type_archive_link( 'album' ); ?>" class="see-albums pull-right padded-sides">See All ></a>
           </div>



        </section>


        <section class="orange" style="height:400px;">

           <div class="section-subtitle album-container-header group ">
             <div class="album-name pull-left padded-sides">Team</div>
             <a href="<?php echo get_post_type_archive_link( 'album' ); ?>" class="see-albums pull-right padded-sides">See All ></a>
           </div>



        </section>

      </div> <?php // end home-main ?>
    </div> <?php // end app-main ?>
  </div> <?php //end badracket-window ?>


<!-- Modal -->
<div id="buy-album-form" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header group">
    <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> -->
    <img class="buy-album-cover" src="" alt="">
    <hgroup>
      <h3 id="buy-album-header"></h3>
      <h4 class="buy-artist-name"></h4>
      <div class="price"></div>
    </hgroup>
  </div>
  <div class="modal-body">
      <div class="loading-container">
        <span class="loading-spinner style-2"></span>
        <div class="loading-messages"></div>
      </div>

    <div class="payment-form">

      <form action="" method="POST" id="payment-form" novalidate autocomplete="on">
        <span class="payment-errors"></span>

        <table>
        <tr>
          <td class="label-container">Name</td>
          <td class="input-container"><input type="text" size="20" class="your-name w-100" placeholder="Your name" /></td>
          
        </tr>

        <tr>
          <td class="label-container">Email</td>
          <td class="input-container"><input type="text" size="20" class="your-email w-100" placeholder="Your email" /></td>
        </div>
          
        </tr>

        <tr>
          <td class="label-container">Card Number</td>
          <td class="input-container"><input type="text" size="20" data-stripe="number " class="cc-number w-100 " pattern="\d*" x-autocompletetype="cc-number" placeholder="Card number" required/></td>
        </div>
          
        </tr>

        <tr>
          <td class="label-container">CVC</td>
          <td class="input-container"><input type="text" size="4" data-stripe="cvc" class="cc-cvc" pattern="\d*" x-autocompletetype="cc-csc" placeholder="Security code" required  autocomplete="off"/></td>
        </div>
          
        </tr>

        <tr>
          <td class="label-container">Exp date</td>
          <td class="input-container"><input type="text" size="9" data-stripe="exp-date " class="cc-exp w-100 " pattern="\d*" x-autocompletetype="cc-exp" placeholder="MM / YY" required maxlength="9"/></td>
        </div>
          
        </tr>
      </table>


    </div>
  </div>
  <div class="modal-footer">
    <span  class="cancel-purchase" data-dismiss="modal" aria-hidden="true">close</span>
    <button class="submit-payment-button disabled" type="submit">Submit Payment</button>
      </form>
  </div>
</div>



<?php get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>

