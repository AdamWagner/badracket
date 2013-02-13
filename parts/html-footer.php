<!-- <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script> -->

<script type="text/javascript" src="js/prod/main.min.js"></script>

<script>
function getShit(){
  console.log('albums:');
  var adam = <?php echo json_encode($albums); ?>;
  console.log(adam);
  console.log('vids:');
  var vids = <?php echo json_encode($videos); ?>;
  console.log(vids);
}
</script>


</body>
</html>