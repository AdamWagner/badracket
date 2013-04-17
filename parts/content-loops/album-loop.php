



<div class="grid album">
   <div class="album-cover playable">
     <div class="play"></div>
     <div class="pause"></div>
</div>
   <a class="link-to-album" href="<?php echo the_permalink(); ?>">
       <div class="album-meta">
         <script id="album" type="template">
            <div> <%= album.albumName %> </div>
         </script>
       </div>
   </a>
</div>
