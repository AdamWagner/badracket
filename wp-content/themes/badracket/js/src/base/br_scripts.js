br_scripts = function(){
	var gzip = (BR_ENV === 'local') ? '' : '.gzip';

	return {
		payments : '/js/build/ccfd8b32.payments.min.js',
		player : '/js/build/b271ac2b.br_audio-player.min' + gzip + '.js',
		facebook : '/js/build/8e8ca8e8.br_facebook.min' + gzip + '.js',
		postLoad : '/js/build/c54d4052.post-load.min' + gzip + '.js'
	};
}();