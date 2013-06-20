  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Normalize album data
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

badracket.normalize = {


  count_tracks: function(obj) { // song object
    // Returns track count
    return _.countBy(_.keys(obj), function(key) {
      return _.str.include(key, 'songTitle');
    }).true;

  },

  createTrackHierarchy :function (obj, type) {
    var tracks = [];
    var trackCount = badracket.normalize.count_tracks(obj);

    for ( var i = 01; i <= trackCount; i++ ) {
      var enumerator = (i >= 10) ? i.toString() : '0' + i.toString();

      var trackItems = {
        songTitle: obj['_br_songTitle-' + enumerator][0],
        duration: obj['_br_duration-' + enumerator][0],
        trackNumber: i,
        songUrl: obj['_br_songUrl-' + enumerator][0],
      };

      if (type ==='album') {
        trackItems.isSampleTrack = obj['_br_isSampleTrack-' + enumerator][0];
      }

      if (type === 'compilation') {
        trackItems.artist = obj['_br_songArtist-' + enumerator][0]; 
      }

      if (type === 'show') { 
        trackItems.artist = obj['_br_artist-' + enumerator][0]; 
        trackItems.isSampleTrack =  1;
      }

      tracks.push(trackItems);

    }

    return tracks;
  },


  albumNormalization : function(rawData) {
    br_state.setupNav( { albums:rawData.length } );

    return _.map(rawData, function(value, key, list ) {

      var kind = parseInt(value._br_is_compilation, 10) ? 'compilation' : 'album';

      return {
        artist : value._br_artist[0],
        albumName : badracket.utils.htmlDecode(value.albumName),
        kind : kind,
        coverUrl : value._br_cover_url[0],
        price : value._br_price[0],
        zipFile : value._br_zip_file[0],
        tracks : badracket.normalize.createTrackHierarchy(value, kind),
        albumUrl : value.albumUrl
      };
    });
  },

  albumNormalizationShows : function(rawData) {

    br_state.setupNav( { shows:rawData.length } );
    var now = (new Date().getTime() / 1000).toFixed();

    var upcoming = _.filter( rawData, function( show ) {
      var then = (Date.parse(show['_br_show-date'][0]) / 1000).toFixed();
      return then > now;
    });

    var shows = _.map( upcoming, function( value, key, list ){
      var date = value['_br_show-date'][0];

      return {
        albumName : badracket.utils.htmlDecode(value.albumName),
        kind : 'show',
        date : date,
        albumUrl : value.albumUrl,
        tracks : badracket.normalize.createTrackHierarchy(value, 'show')
      };
    });

    function hasPlaylist(show){
      return show.tracks.length;
    }

    return _.filter(shows, hasPlaylist);

  }

};