badracket.videos = function(){

	/*- Video Data -*/
	var data = function(){
		 
		function getVimeo() {
			var albumID = '1979291',
					 api_endpoint = 'http://vimeo.com/api/v2/album/',
					 path = '/videos.json?callback=?';

			jQuery.ajax({
				 url: api_endpoint + albumID + path,
				 dataType: 'JSON',
				 success:function(data){
					setVimeo(data);
          console.log(data);

          s.win.trigger('videos-loaded');

				 },
				 error: function(errorThrown){
					console.log(errorThrown);
				 }
				});
	  }

    function setVimeo( data ){
    	badracket.videos.data = data;
      br_state.setupNav( { videos:data.length } );
    }

    return {
   	  data : data,
      get : getVimeo,
      set : setVimeo
    };

  }();

	var render = function(){

		function videosRollup(){
			var videoContainer = $('#video-container'),
			  frag = [];

			_.each(badracket.videos.data, function( el ){
			 var thumbnail = el.thumbnail_large,
				  title = el.title.split(':')[0],
				  date = el.title.split('-')[1],
				  id = el.id;

			var vidEl = [
			'<div class="grid padded">',
			  '<div class="playable video" data-id="'+id+'">',
				 '<div class="play"></div> ',
				 '<div class="lazyload fade ratio-16-9" data-src="'+ thumbnail +'">',
				 '</div>',
			  '</div>',
			  '<div class="album-meta">',
				 '<div class="album-title">'+title+'</div>',
				 '<div class="artist-name">'+date+'</div>',
			  '</div>',
			'</div>'
			].join('');

			frag.push(vidEl);

			});

			videoContainer.html(frag);
			bindUI.videosRollup();
			badracket.lazyLoadImg('vimeo inject - all');
		}

		function videosHome(){
			var videoContainer = $('#video-container'),
			frag = [];
			for (var i = 0; i < 4; i++ ) {
			 var el = badracket.videos.data[i];
			 var thumbnail = el.thumbnail_large,
				  title = el.title.split(':')[0],
				  date = el.title.split('-')[1],
				  id = el.id;

			 var vidEl = [
			 '<div class="grid padded">',
			 '<a href="'+br_state.urls.videos+'" class="dJAX_internal">',
				'<div class="playable video" data-id="'+id+'">',
				  '<div class="play"></div> ',
				 '<div class="lazyload fade ratio-16-9" data-src="'+ thumbnail +'"></div>',
				'</div>',
				'<div class="album-meta">',
				  '<div class="album-title">'+title+'</div>',
				  '<div class="artist-name">'+date+'</div>',
				'</div>',
			 '</a>',
			 '</div>'
			 ].join('');

			 frag.push(vidEl);
			}

			videoContainer.html(frag);
			bindUI.videoHome();
			badracket.lazyLoadImg('vimeo inject - home');
		}

		return {
			videosRollup: videosRollup,
			videosHome : videosHome
		};

	}();

	var handlers = function(){
		function videoClick (){
		  s.win.off('sm2-play-event');
		  var that = $(this);
		  $("html, body").animate({ scrollTop: 0 }, "slow");

		  var id = that.data('id'),
		      vimeoContainer = $('.vimeo-container');

			$('.grid').removeClass('playing next');

			that
			  .closest('.grid')
			  .addClass('playing')
			  .next()
			  .addClass('next');

			var ratioHeight = $('.main-content').width() * 0.5;

			vimeoContainer
			 .addClass('loading')
			 .css('height', ratioHeight );

			vimeoContainer
        .find('.iframe-wrap')
        .html('<iframe style="visibility:hidden;" onload="this.style.visibility=\'visible\';" id="vimeo-player" src="http://player.vimeo.com/video/'+id+'?api=1&autoplay=true&player_id=vimeo-player"></iframe>');

			evnts.bind();
			vimeoContainer.fitVids();
			br_mixpanel.track('Click: video');
		}

		
		function videoHomeClick (){
		  var id = $(this).data('id');
		  console.log('vid home click ran biiiiiiiiiiiiiiiiiooooooooooooch');

		  s.win.on('djaxLoad', function(e, data) {
			 $('[data-id="'+id+'"]').click();
			 console.log($('[data-id="'+id+'"]'));
		  });

		  br_mixpanel.track('Click: video');
		}

		return {
			videoClick : videoClick,
			videoHomeClick : videoHomeClick
		};

	}();
	var bindUI = function(){

		function videosRollup (){
		  $('.video').on('click', handlers.videoClick );
		};

		function videoHome (){
		  $('[data-view="home"]').find('.video').on('click', handlers.videoHomeClick );
		};

    return {
      videosRollup : videosRollup,
      videoHome : videoHome
    };

	}();

  var evnts = function(){

    function bind (){
      var iframe = $('#vimeo-player')[0],
      player = $f(iframe);

      // When the player is ready, add listeners for pause, finish, and playProgress
      player.addEvent('ready', function() {
        player.addEvent('play', onPlay);
        player.addEvent('pause', onPause);
        player.addEvent('finish', onFinish);
      });

      s.win.on('sm2-play-event', function() { player.api('pause'); });

      function onPlay(id){
        var vimeoContainer = $('.vimeo-container');
        setTimeout(function() {
          vimeoContainer.removeClass('loading');
        }, 500);

        br_mixpanel.track('Video started');
        mixpanel.people.increment("Videos started", 1);
        s.win.trigger('vimeo-play-event');
      }

      function onPause(id) {
        s.win.trigger('vimeo-pause-event');
      }

      function onFinish(id) {
        mixpanel.people.increment("Videos finished", 1);
        br_mixpanel.track('Video ended');
        $('.next')
        .find('.video')
        .click();
      }
    }

    return {
      bind : bind
    };
  }();

	return {
		data: data,
		render: render,
	    bindUI : bindUI,
	    handlers : handlers,
	    evnts : evnts
	};
}();
