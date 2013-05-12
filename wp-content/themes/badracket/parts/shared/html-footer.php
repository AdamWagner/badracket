  <?php $local_path = get_template_directory_uri(); ?>
 
  <script type="text/javascript">
  var badracket_theme_path = '<?php echo get_template_directory_uri();?>';
  </script>



  <script>
  var domain = window.location.hostname;

  if ( badracket.stringContains( domain, 'localhost') ) {
  	BR_ENV = 'local';
  } else {
  	BR_ENV = 'prod';
  }
  </script>

  <?php wp_footer(); ?>
  </body>
</html>