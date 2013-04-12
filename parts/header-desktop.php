<header class="desktop hidden-mobile">
  <div class="inner page-width">
    <div class="logo"><div class="logo-mark"></div></div>
    <div class="header-bar">

      <div ng-controller="AlbumCtrl" class="audio-player-wrapper ready">
        <div ng-repeat="album in albums | filter:{isPlaying:'playing'}" class="audio-player">
         <div class="player-metadata group">
           <div class="audio-player-title">
             <a href="" class="audio-title">
                <span class="song">{{album.albumName}}</span> - <span class="artist">{{album.artist}}</span>
             </a>
           </div>
           <a class="view-full-album dJAX_internal" > <span class="track-count hide-till-ready">track <span class="current-track">0</span> of <span class="total-tracks">{{album.tracks|length}}</span>  </span><span class="target"></span>  </a>
         </div>
         <div class="controls group">
          <span data-icon="h" class="previous"></span>
          <span  data-icon="m" class="play-pause"></span>
          <span data-icon="l" class="next"></span>
          <div class="statusbar">
            <div class="loading"></div>
            <div class="slider"></div>
            <div class="progress-bar" ></div>
          </div>
           <div class="timing">
            <div id="sm2_timing" class="timing-data">
             <span class="preview-song-indicator">preview</span>
             <span class="progress-time"></span>
            </div>
          </div>
      </div>
     </div>
    </div> <?php // end audio-player ?>

    <a href="#buy-album-form" data-toggle="modal" class="support-band">
      <div class="support-band-button button">Get album </div>
    </a>

    <div class="facebook">
      <div class="login">Login with Facebook</div>
      <div class="fb-user">
        <img class="fb-user-picture"/>
        <div class="fb-user-name"></div>
        <!-- <div class="logout">Logout</div> -->
      </div>
    </div>

  </div>
</header>