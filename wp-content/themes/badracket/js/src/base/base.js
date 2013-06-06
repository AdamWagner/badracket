/*
Consider using
https://github.com/jakiestfu/Snap.js
for nav menu exposure
*/


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
  BADRACKET APP
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

s = {
  win : $(window),
  doc : $(document),
  html : $('html'),
  body : $('body'),
  mainContent : $('.main-content'),
  video : $('.video'),
  domain : badracket.utils.envCheck('http://localhost:8888/brv5-prod/', 'http://badracket.staging.wpengine.com/', 'http://badracket.com/'),

};

var br = window.badracket || {};

badracket = $.extend(br, {

  init: function() {
    this.docReady();
    this.load();
    this.djaxLoad();
  },

  enquire: function(){
    enquire
      .register( 'screen and (max-width : 1024px)', badracket.setupMobile() )
      .listen();
  },

  setupMobile: function(){
    return {
      setup: function() {
        badracket.utils.loader.require(
          [ br_scripts.mobile ],
          function() { badracket.bindMobileUI(); } 
        );
      },
      deferSetup: true,
      match : function() {},
      unmatch : function() {}
    };
  },

  setup: function(){
    badracket.utils.loader.require(
      [
        br_scripts.postLoad,
        br_scripts.player,
        "//connect.facebook.net/en_US/all.js",
        br_scripts.facebook 
      ],
      function() {
          // Callback
          console.log('All Scripts Loaded');
          $.publish('/view/change', document.URL);
          s.video.fitVids();
          badracket.doAjaxRequest('album');
          badracket.doAjaxRequest('show');
          badracket.videos.data.get();
          badracket.affix();
          br_fb.init();
      });
  },

  affix: function(){

    var header = $('header.desktop');

    var offset = header.offset().top,
        fixed = false;

    s.win.bind('djaxLoad', function(e, data) {
      offset = header.offset().top;
    });

    s.win.resize(function(){
      if (!fixed) { offset = header.offset().top; }
    });

    s.doc.scroll(function() {
        if( !fixed  && $(this).scrollTop() >= offset && s.body.hasClass('home') ) {
          fixed = true;
          s.html.addClass('page-fixed');
        } else if ($(this).scrollTop() <= offset) {
          fixed = false;
          s.html.removeClass('page-fixed');
        }
    });

  },


  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Get album data via ajax
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  doAjaxRequest: function( type ){

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
                   br_player.albumData.set(cleanAlbums);
                   init.dataReady( type );
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
    s.doc.ready(function(){
      s.body.djax('.updatable', ['###','buy-album','carousel','post_photo']);
      badracket.enquire();
      console.log('document ready fires');
    });
  },

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
    Window.load()
  \* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  load: function(){
    s.win.load(function(){
      badracket.setup();
      badracket.lazyLoadImg('onload');
      badracket.lazyLoadImgEl('onload');

    });
  },

  djaxLoad: function(){

    var mainContent = $('.main-content');

    // when djax element loads, remove loadin class & mimic doc ready stuff
    s.win.bind('djaxLoad', function(e, data) {
      s.win.scrollTop(0);
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

      s.body.attr('class', bodyClass);

      $.publish('/view/change', badracket.utils.hasTrailngSlash(data.url) ? data.url : data.url + '/');

      mainContent.removeClass('loading');
    });

    // when djax link clicked, add loading class
    s.win.bind('djaxClick', function(e, data) {
      mainContent.addClass('loading');
      s.win.off('sm2-play-event'); // free up the event bound to zombie vimeo iframes
    });
  },

  lazyLoadImg: function(caller){ // CSS Background image
    $('.lazyload').each(function() {

      var lazy = $(this),
          src = lazy.attr('data-src'),
          isSet = lazy.css('background-image');

      if ( isSet === 'none' ) {                              //avoid double running on elements
        $('<img>').attr('src', src).load(function(){
            lazy.css('background-image', 'url("'+src+'")');
            if ( lazy.hasClass('fade') ) {
              lazy.parent().addClass('loaded');
            } else if ( lazy.hasClass('fade-this') ) {
              lazy.addClass('loaded');
            }
        });
      }
    });
  },


  lazyLoadImgEl: function(caller){
    $('.lazyload_img').each(function() {
     var lazy = $(this),
         src = lazy.attr('data-src');

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

  updatePageState: function( pageState ){
    if (s.body.attr('data-state') === 'default-state') {
      s.body.attr('data-state', pageState);
    } else {
      s.body.attr('data-state', 'default-state');
    }
  },

}); // end badracket {}


