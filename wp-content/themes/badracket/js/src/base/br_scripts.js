br_scripts = function(){

	var wpPath = 'wp-content/themes/badracket';

	var gzip = (BR_ENV === 'local') ? '' : '.gzip';

	var cdn;
	if (BR_ENV === 'local') {
		cdn = '';
	} else if (BR_ENV === 'staging') {
		cdn = 'http://d1795rfny8s8fj.cloudfront.net/';
	} else {
		cdn = 'http://d245myou62vn42.cloudfront.net/"';
	}

	return {
		payments : cdn + wpPath + '/js/build/26854135.payments.min.js',
		player : cdn + wpPath + '/js/build/9f35432b.br_audio-player.min.js',
		facebook : cdn + wpPath + '/js/build/b506d51d.br_facebook.min.js',
		postLoad : cdn + wpPath + '/js/build/c54d4052.post-load.min.js'
	};
}();