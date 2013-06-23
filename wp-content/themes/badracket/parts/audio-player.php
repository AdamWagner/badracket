  <div class="audio-player-wrapper" ng-controller="AppCtrl">
    <div class="audio-player">
     <div class="player-metadata group">
       <div class="audio-player-title">
         <span class="audio-title">
            <span class="song">{{ model.message }}</span> <span class="hide-till-ready">-</span>
            <span class="artist"></span>
         </span>
       </div>
       <a class="view-full-album dJAX_internal" >
        <span class="track-count hide-till-ready">
          track
        <span class="current-track">0</span>
          of
        <span class="total-tracks"></span>
        </span>
        <span class="show"></span>
        <span class="target"></span>
      </a>
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
         <span class="preview-song-indicator">login for full song</span>
         <span class="progress-time"></span>
        </div>
      </div>
  </div>
 </div>
</div>