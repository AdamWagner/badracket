  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Normalize album data
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

badracket.normalize = {

  count_tracks: function(obj) {
    var trackCount = 0;
    for (var prop in obj) {
      if ( badracket.utils.stringContains( prop.toString(), 'songTitle' ) ) {
        trackCount++;
      }
    }
    return trackCount;
  },

 createTrackHierarchy :function (obj, type) {
    var tracks = [];
    var trackCount = badracket.normalize.count_tracks(obj);
    for ( var i = 01; i <= trackCount; i++ ) {
      if (i >= 10) { enumerator = i.toString(); } else { enumerator = '0' + i.toString(); }
      if (type === 'album') {
        tracks.push({
          songTitle: obj['_br_songTitle-' + enumerator][0],
          duration: obj['_br_duration-' + enumerator][0],
          trackNumber: obj['_br_songTrackNumber-' + enumerator][0],
          songUrl: obj['_br_songUrl-' + enumerator][0],
          isSampleTrack: obj['_br_isSampleTrack-' + enumerator][0]
        });
      } else {
         tracks.push({
          songTitle: obj['_br_songTitle-' + enumerator][0],
          artist: obj['_br_artist-' + enumerator][0],
          duration: obj['_br_duration-' + enumerator][0],
          trackNumber: obj['_br_songTrackNumber-' + enumerator][0],
          songUrl: obj['_br_songUrl-' + enumerator][0],
          isSampleTrack: 1
        });
      }
    }
    return tracks;
  },

  albumNormalization : function(rawData) {
    br_state.setupNav( { albums:rawData.length } );
    return _.map(rawData, function(value, key, list ){
      return {
        artist : value._br_artist[0],
        albumName : badracket.utils.htmlDecode(value.albumName),
        kind : 'album',
        coverUrl : value._br_cover_url[0],
        price : value._br_price[0],
        zipFile : value._br_zip_file[0],
        tracks : badracket.normalize.createTrackHierarchy(value, 'album'),
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

    return _.map( upcoming, function( value, key, list ){
      var date = value['_br_show-date'][0];

      return {
        albumName : badracket.utils.htmlDecode(value.albumName),
        kind : 'show',
        date : date,
        albumUrl : value.albumUrl,
        tracks : badracket.normalize.createTrackHierarchy(value, 'show')
      };
    });
  },

};