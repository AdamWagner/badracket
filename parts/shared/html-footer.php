  <?php wp_footer(); ?>
  <?php $local_path = get_template_directory_uri(); ?>

  <script type="text/javascript" src="<?php echo $local_path ?>/js/lib/jquery.js"></script>
  <script type="text/javascript" src="<?php echo $local_path ?>/js/lib/underscore.js"></script>
  <script type="text/javascript" src="<?php echo $local_path ?>/js/lib/backbone.js"></script>
  <script type="text/javascript" src="<?php echo $local_path ?>/js/prod/main.min.js"></script>
  <script type="text/javascript">
  var badracket_theme_path = '<?php echo get_template_directory_uri();?>';
  </script>



  </body>
</html>