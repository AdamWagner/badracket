  <?php wp_footer(); ?>
  <?php $local_path = get_template_directory_uri(); ?>
  
  <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
  <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/lib/jquery.djax.js"></script>

  <script type="text/javascript">
  var badracket_theme_path = '<?php echo get_template_directory_uri();?>';
    jQuery(document).ready(function($) {
        $('body').djax('.updatable', ['audio']);
    });
  </script>

  <script type="text/javascript" src="<?php echo $local_path ?>/js/prod/main.min.js"></script>


	</body>
</html>