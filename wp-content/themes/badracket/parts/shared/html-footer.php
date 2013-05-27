  <?php $local_path = get_template_directory_uri(); ?>
 
  <script type="text/javascript">
  var badracket_theme_path = '<?php echo get_template_directory_uri();?>';
  </script>



  <script>
  var domain = window.location.hostname, BR_ENV;
  function stringContains(string, search) { return string.indexOf(search) != -1; };

  if ( stringContains( domain, 'localhost') ) {
  	BR_ENV = 'local';
  } else {
  	BR_ENV = 'prod';
  }
  </script>

  <script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-17047375-1']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

  </script>

  <?php wp_footer(); ?>

  </body>
</html>