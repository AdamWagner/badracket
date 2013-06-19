jQuery(document).ready(function($){
	$('[id*=songArtist]').parent().parent().hide();

	if ($('#_br_is_compilation').attr('checked')) {
		$('[id*=songArtist]').parent().parent().show();	
	}

	$('#_br_is_compilation').change(function(){
		$('[id*=songArtist]').parent().parent().toggle();
	});


    function emptyTest(value, key) {
        return value.length ? true : false; 
    }

    function clearInvalid(){
		$('[class*=wrapper]').removeClass('invalid');
    }
    
	function validateAlbum(){
		clearInvalid();

		var form = $('#album-details');

		var albumDetails = {
			'#_br_artist' : emptyTest(form.find('#_br_artist').val()),
			'#_br_cover_url' : emptyTest(form.find('#_br_cover_url').val()),
			'#_br_zip_file' : emptyTest(form.find('#_br_zip_file').val()),
			'[name=_br_release_date]' : emptyTest(form.find('[name=_br_release_date]').val()),
			'#_br_price' : emptyTest(form.find('#_br_price').val())
		};

		var invalid = [];
		for (prop in albumDetails) {
			if (albumDetails[prop] === false ) {
				invalid.push(prop);
			}
		}

		_.each(invalid, function(el){
			$(el).closest('[class*=wrapper]').addClass('invalid');
		});

		return !invalid.length;

	}

	function stringContains(string, search) { 
		return string.indexOf(search) != -1; 
	}

	function validateSongs(){
		var songs = $('[id*=tracks].postbox');
		var songList = [];

		_.each(songs, function(el){
			songList.push({ 
				selector : $(el).attr('id'),
				track : $(el).find('.hndle span').text(),
				songTitle : $(el).find('[id*=songTitle]').val(),
				songArtist : $(el).find('[id*=songArtist]').val(),
				duration : $(el).find('[id*=duration]').val(),
				songUrl : $(el).find('[id*=Url]').val()
			});
		});

		
		var songList = _.filter(songList, function(song){ return song.songTitle !== ''});

		_.each(songList, function(song){
			var compilation = $('#_br_is_compilation').prop('checked');
			for ( prop in song ) {
				if ( song[prop] === '' ) {
					if (compilation && stringContains(prop, 'Artist')) {
						song.invalid = true;
					} else if (!compilation && !stringContains(prop, 'Artist')) {
						song.invalid = true;
					}
				}
			}
		});

		var invalid = _.filter(songList, function(song){ return song.invalid; });

		_.each(invalid, function(el){
			$('#' + el.selector).addClass('invalid');
		});

		return !invalid.length;
	}


	validateSongs();

    $('#publish').click(function(e){
    	var form = $("form[name='post']");

        var albumValidation = validateAlbum();
        var songValidation = validateSongs();

       	if (!albumValidation || !songValidation) {
        	e.preventDefault();
        	setTimeout(function() {
	            $('#publishing-action').find('.spinner').hide();
	            $('#publish').removeClass('button-primary-disabled');
	            $('h2').after('<div class="invalid">Fill in the red fields below to publish or update, dufus! Numbnuts! Just kiddin, I luv ya.</div>');
        	}, 250);
       	} else {
            $(form).submit();
       	}
    });
});