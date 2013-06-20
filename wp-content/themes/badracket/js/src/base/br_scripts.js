br_scripts = function(){

	var wpPath = badracket.utils.envCheck('/brv5-prod/wp-content/themes/badracket','/wp-content/themes/badracket','/wp-content/themes/badracket') ;

	var gzip = (BR_ENV === 'local') ? '' : '.gzip';

	var cdn = badracket.utils.envCheck('', 'http://d1795rfny8s8fj.cloudfront.net', 'http://d245myou62vn42.cloudfront.net');

	return {
		payments : cdn + wpPath + '/js/build/26854135.payments.min.js',
		player : cdn + wpPath + '/js/build/0788b6c8.br_audio-player.min.js',
		facebook : cdn + wpPath + '/js/build/c712af6c.br_facebook.min.js',
		postLoad : cdn + wpPath + '/js/build/739a1058.post-load.min.js',
		mobile : cdn + wpPath + '/js/build/714aca84.mobile.min.js'
	};
}();