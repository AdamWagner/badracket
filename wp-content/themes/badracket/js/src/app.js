// Declare app level module which depends on filters, and services

var br = angular.module("br",[]);

br.config(function($routeProvider){
	console.log('hi from config');
	$routeProvider
		.when('/', { templateUrl:'wp-content/themes/badracket/templates/audio-player.html', controller:'PlayerCtrl' });
});


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Playlist
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

function Playlist(albums) {
	this.albums = this.makeAlbums(albums);
}


Playlist.prototype.shuffle = function(){
	this.albums = _.shuffle(this.albums);
	return this;
}


Playlist.prototype.findAlbum = function( query ){
	return _.find(this.albums, query);
}


Playlist.prototype.makeAlbums = function(albums) {
	var _albums = [];
	_.each(albums, function(album){
		_albums.push( new Album(album) );
	});
	return _albums;
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Album
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var Album = (function Album(album) {
    var allAlbums = [];
    var album = function(album) {
    		allAlbums.push(this);
	    	this.title = album.albumName;
	    	this.artist = album.artist;
	    	this.kind = album.kind;
	    	this.cover = album.coverUrl;
	    	this.tracks = this.makeTracks(album.tracks);
	    	this.selected = false;
    };

    album.each = function( fn ) {
        for ( var i = 0; i < allAlbums.length; i++ ) {
            fn.call(allAlbums[i]);
        }
    };

    return album;
}());


Album.prototype.makeTracks = function(songs) {
	var tracks = [];
	_.each(songs, function(song){
		tracks.push( new Song(song) );
	});
	return tracks;
}

Album.prototype.deSelect = function(){
	this.selected = false;
	return this;
}

Album.prototype.select = function(){
	Album.each(function(){ this.deSelect(); });
	this.selected = true;
	return this;
}

Album.prototype.findSong = function( query ){
	return _.find(this.tracks, query);
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Song
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var Song = (function song(song) {
    var allsongs = [];
    var song = function(song) {
    		allsongs.push(this);
	    	this.title = song.songTitle;
	    	this.duration = song.duration;
	    	this.trackNumber = song.trackNumber;
	    	this.playing = false;
	    	this.isSampleTrack = song.isSampleTrack;
	    	this.url = song.songUrl;
    };

    song.each = function( fn ) {
        for ( var i = 0; i < allsongs.length; i++ ) {
            fn.call(allsongs[i]);
        }
    };

    return song;
}());

Song.prototype.stop = function(){
	this.playing = false;
};

Song.prototype.play = function(){
	Song.each(function(){ this.stop(); })
	this.playing = true;
	angular.element('audio').attr({
	  'src': this.url,
	  'class' : 'hi-fucker'
	});
	return false;
};


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Controller
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


// read this:
// http://pivotallabs.com/ember-js-and-soundmanager2/

br.controller('PlayerCtrl', function( $scope ){

	playlist = new Playlist( albums );

	$scope.albums = playlist.albums; 

	playlist
		.findAlbum({ title: 'Latitudes + Longitudes' })
		.select()
		.findSong({ isSampleTrack: '1' })
		.play();


	$scope.clickSong = function(){
		this.song.play();
	}


	$scope.clickAlbum = function(){
		this.album
			.select()
			.findSong({ isSampleTrack : '1' })
			.play();
	}

});



