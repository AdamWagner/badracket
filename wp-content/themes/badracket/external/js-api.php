<?php 

/* ========================================================================================================================
Ajax Action hooks
======================================================================================================================== */

add_action('wp_ajax_nopriv_do_ajax', 'our_ajax_function');
add_action('wp_ajax_do_ajax', 'our_ajax_function');

function our_ajax_function(){

   // the first part is a SWTICHBOARD that fires specific functions
   // according to the value of Query Var 'fn'

     switch($_REQUEST['fn']){
          case 'get_latest_posts':
               $output = ajax_get_latest_posts($_REQUEST['count'], $_REQUEST['post_type'] );
          break;
          case 'send_mail':
               $output = send_mail($_REQUEST['subject'], $_REQUEST['message'], $_REQUEST['email'] );
          break;
          default:
              $output = 'No function specified, check your jQuery.ajax() call';
          break;

     }
     $output=json_encode($output);

     if(is_array($output)){
       print_r($output);
     } else {
       echo $output;
     } die;
}


function ajax_get_latest_posts($count, $post_type){
   query_posts(array('post_type' => $post_type, 'post_status'=>'publish', 'posts_per_page' => 99) );
   $albums = array();
   while (have_posts()) : the_post();
     $meta = get_post_custom(get_the_ID());
     $meta['albumName'] = get_the_title(get_the_ID());
     $meta['albumUrl'] = get_permalink(get_the_ID());
     array_push($albums, $meta);
   endwhile;
   return $albums;
}


function send_mail($subject, $message, $email){

   $headers[] = 'From: Bad Racket <team@badracket.com>';

   wp_mail( $email, $subject, $message, $headers);

   return;
}

?>