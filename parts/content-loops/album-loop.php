


<div ng-controller="AlbumCtrl">

<div ng-click="play(album)" ng-repeat="album in albums | filter:{kind:'album'}" class="grid album {{ album.isPlaying }}">
   <div class="album-cover playable">
     <div class="play"></div>
     <div class="pause"></div>
     <div class="album-cover-img lazyload fade ratio-1-1" data-src="{{album.coverUrl}}" alt="{{album.albumName + album.artist}}">
     </div>
   </div>
   <a class="link-to-album" href="<?php echo the_permalink(); ?>">
       <div class="album-meta">
         <span data-icon="s" class="speaker-indicator"></span>
         <div class="album-title">{{album.albumName}}</div>
         <div class="artist-name">{{album.artist}}</div>
       </div>
   </a>
 </div>





</div>
