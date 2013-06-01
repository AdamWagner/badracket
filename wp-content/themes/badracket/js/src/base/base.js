
/*
Consider using
https://github.com/jakiestfu/Snap.js
for nav menu exposure
*/


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
  BADRACKET APP
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

s = {
  bd : $('body'),
  mainContent : $('.main-content'),
  video : $('.video'),
  domain : badracket.utils.envCheck('http://localhost:8888/brv5-prod/', 'http://badracket.staging.wpengine.com/', 'http://badracket.com/'),

};



var br = window.badracket || {};

badracket = _.extend(br, {

  init: function() {
    this.docReady();
    this.load();
    this.djaxLoad();
    this.bindUI();
  },

  enquire: function(){
    enquire
      .register("screen and (max-width : 1024px)", badracket.setupMobile())
      .listen();
  },

  setupMobile: function(){
    return {
      setup: function() {
        badracket.loader.require([
          badracket_theme_path + "/js/lib/jquery.tap.js"],
            function() {
                // Callback
                badracket.bindMobileUI();
            });
      },
      deferSetup: true,
      match : function() {},
      unmatch : function() {}
    };
  },

  setup: function(){
    badracket.loader.require([
      br_scripts.postLoad,
      br_scripts.player,
      "//connect.facebook.net/en_US/all.js",
      br_scripts.facebook ],
        function() {
            // Callback
            console.log('All Scripts Loaded');
            badracket.postSetupTasks();
            s.video.fitVids();
            badracket.doAjaxRequest('album');
            badracket.doAjaxRequest('show');
            badracket.getVimeo();
            badracket.affix();
            br_fb.init();
        });
  },

  affix: function(){
    var offset = $('header.desktop').offset().top,
        force = $('html').hasClass('force-fixed'),
        fixed = false;

    $(window).bind('djaxLoad', function(e, data) {
      force = $('html').hasClass('force-fixed');
      offset = $('header.desktop').offset().top;
    });

    $(window).resize(function(){
      if (!fixed) { offset = $('header.desktop').offset().top; }
    });

    $(document).scroll(function() {
        if( !fixed && !force && $(this).scrollTop() >= offset ) {
          fixed = true;
          $('html').addClass('page-fixed');
        } else if ($(this).scrollTop() <= offset) {
          fixed = false;
          $('html').removeClass('page-fixed');
        }
    });

  },


   loader: {
      require: function (scripts, callback) {
          this.loadCount      = 0;
          this.totalRequired  = scripts.length;
          this.callback       = callback;

          for (var i = 0; i < scripts.length; i++) {
              this.writeScript(scripts[i]);
          }
      },
      loaded: function (evt) {
          this.loadCount++;
          if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
      },
      writeScript: function (src) {
          var self = this;
          var s = document.createElement('script');
          s.type = "text/javascript";
          s.async = true;
          s.src = src;
          s.addEventListener('load', function (e) { self.loaded(e); }, false);
          var head = document.getElementsByTagName('head')[0];
          head.appendChild(s);
        }
      },




  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Get album data via ajax
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  doAjaxRequest: function( type ){
       // here is where the request will happen

       console.log(s.domain + 'wp-admin/admin-ajax.php');

       jQuery.ajax({
            url: s.domain + 'wp-admin/admin-ajax.php',
            data:{
                 'action':'do_ajax',
                 'fn':'get_latest_posts',
                 'post_type': type,
                 'count':99
                 },
            dataType: 'JSON',
            success:function(data){
                   var cleanAlbums;
                   if (type == 'show') {
                    cleanAlbums = badracket.normalize.albumNormalizationShows(data);
                   } else {
                    cleanAlbums = badracket.normalize.albumNormalization(data);
                   }

                   (function setData(){
                   if ( typeof br_player !== 'undefined' ) {
                    br_player.albumData.set(cleanAlbums);
                   } else {
                    setTimeout(function() {
                      setData();
                    }, 250);
                   }
                   })();

                   init.dataReady( type );
                 },
            error: function(errorThrown){
              console.log('did not get the stuff');
                 console.log(errorThrown);
            }
       });

  },

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
     Get Vimeo
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  getVimeo : function() {

    var albumID = '1979291',
        api_endpoint = 'http://vimeo.com/api/v2/album/',
        path = '/videos.json?callback=?';

    var url = api_endpoint + albumID + path;

    jQuery.ajax({
         url: url,
         dataType: 'JSON',
         success:function(data){
          br_fb.BR.videos = data;
          $(window).trigger('videos-loaded');
          br_state.setupNav({videos:data.length});
         },
         error: function(errorThrown){
              console.log(errorThrown);
         }
    });

  },

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Document.ready()
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  docReady: function(){
    $(document).ready(function(){
      $('body').djax('.updatable', ['###','buy-album','carousel','post_photo']);
      badracket.enquire();
      console.log('document ready fires');
    });
  },

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Window.load()
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  load: function(){
    $(window).load(function(){
      badracket.setup();
      badracket.lazyLoadImg('onload');
      badracket.lazyLoadImgEl('onload');

    });
  },



  djaxLoad: function(){

    // when djax element loads, remove loadin class & mimic doc ready stuff
    $(window).bind('djaxLoad', function(e, data) {
      $(window).scrollTop(0);
      badracket.lazyLoadImg('djaxload');
      badracket.lazyLoadImgEl('djaxload');
      $('.video').fitVids(); // important to re-get DOM elements. s.video only has old ones

      br_fb.UI.bindUI.unBindAll();
      br_fb.UI.bindUI.bindAll();

      _gaq.push(["_trackPageview"]); 

      var html = data.response,
          search = '<body class="',
          start = html.indexOf(search) + search.length,
          end = html.indexOf('"', start),
          bodyClass = html.slice( start, end );

      $('body').attr('class', bodyClass);


      $.publish('/view/change', badracket.utils.hasTrailngSlash(data.url) ? data.url : data.url + '/');

      $('.main-content').removeClass('loading');
    });

    // when djax link clicked, add loading class
    $(window).bind('djaxClick', function(e, data) {
      $('.main-content').addClass('loading');
      $(window).off('sm2-play-event'); // free up the event bound to zombie vimeo iframes
    });
  },

  lazyLoadImg: function(caller){ // CSS Background image
    console.log('lazyloadIMG ran from ' + caller);
    $('.lazyload').each(function() {
     var lazy = $(this);
     var src = lazy.attr('data-src'),
         isSet = lazy.css('background-image');

     if ( isSet === 'none' ) {                                //avoid double running on elements
       $('<img>').attr('src', src).load(function(){
            lazy.css('background-image', 'url("'+src+'")');
            if (lazy.hasClass('fade')) {
              lazy.parent().addClass('loaded');
            } else if (lazy.hasClass('fade-this')) {
              lazy.addClass('loaded');
            }
          });
      }
    });
  },


  lazyLoadImgEl: function(caller){
    console.log('lazyloadImgEl ran from ' + caller);
    $('.lazyload_img').each(function() {
     var lazy = $(this);
     var src = lazy.attr('data-src');
     $('<img>').attr('src', src).load(function(){
          lazy.attr('src', src);
          if (lazy.hasClass('fade')) {
            lazy.parent().addClass('loaded');
          } else if (lazy.hasClass('fade-this')) {
            lazy.addClass('loaded');
          }
        });
    });
  },

  postSetupTasks: function() {
    $.publish('/view/change', document.URL);
  },


  bindMobileUI: function(){
    $('.menu').on('tap',function(){
      badracket.updatePageState('nav-state');
    });

    $('nav[role="navigation"] a').on('tap',function(){
     s.bd.attr('data-state', 'default-state');
    });

    $('.info').on('tap',function(){
      badracket.updatePageState('info-state');
    });

    $(document).bind("pageinit", function(event) {
      $.event.special.swipe.verticalDistanceThreshold = 40;
      $.event.special.swipe.horizontalDistanceThreshold = 160;
      $.event.special.swipe.durationThreshold = 300;
      $('body').bind('swipeleft', function(){ badracket.updatePageState('info-state'); });
      $('body').bind('swiperight', function(){ badracket.updatePageState('nav-state'); });
    });
  },

  updatePageState: function(pageState){
    if (s.bd.attr('data-state') === 'default-state') {
      s.bd.attr('data-state', pageState);
    } else {
      s.bd.attr('data-state', 'default-state');
    }
  },


  bindUI: function(){
    $('.welcome-button').on('click',function(){
      $('.badracket-window').removeClass('welcome-state');
    });
  },

}); // end badracket {}



var gf_placeholder = function() {

  $('.gform_wrapper .gplaceholder')
    .find('input, textarea').filter(function(i){
      var $field = $(this);

      if (this.nodeName == 'INPUT') {
        var type = this.type;
        return !(type == 'hidden' || type == 'file' || type == 'radio' || type == 'checkbox');
      }

      return true;
    })
    .each(function(){
      var $field = $(this);

      var id = this.id;
      var $labels = $('label[for=' + id + ']').remove();
      var label = $labels.last().text();

      if ( label === 'State / Province / Region') { label = 'State'; }

      if (label.length > 0 && label[ label.length-1 ] == '*') {
        label = label.substring(0, label.length-1) + ' *';
      }

      $field[0].setAttribute('placeholder', label);
    });

  var support = (!('placeholder' in document.createElement('input'))); // borrowed from Modernizr.com

  if ( support ) {
    $('input[placeholder], textarea[placeholder]').placeholder({
      blankSubmit: true
    });
  }

};











