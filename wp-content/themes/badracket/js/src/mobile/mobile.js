
badracket.bindMobileUI = function(){
  $('.menu').on('tap',function(){
    badracket.updatePageState('nav-state');
  });

  $('nav[role="navigation"] a').on('tap',function(){
   s.body.attr('data-state', 'default-state');
  });

  $('.info').on('tap',function(){
    badracket.updatePageState('info-state');
  });

  s.doc.bind("pageinit", function(event) {
    $.event.special.swipe.verticalDistanceThreshold = 40;
    $.event.special.swipe.horizontalDistanceThreshold = 160;
    $.event.special.swipe.durationThreshold = 300;
    s.body.bind('swipeleft', function(){ badracket.updatePageState('info-state'); });
    s.body.bind('swiperight', function(){ badracket.updatePageState('nav-state'); });
  });
};

