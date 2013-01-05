(function(){
var sm = soundManager;

sm.setup({
  url: 'http://badracket-website.s3.amazonaws.com/swf',
  flashVersion: 9,
  debugMode: false,
  defaultOptions : {
    // preferFlash: true,
    useHighPerformance: true,
    usePeakData: true,
    useEQData: true
  }
});


var allSongs = [],
    thisSong,
    id3s=[],
    soundCount = 0;


var metaWidth;
function updateArtist(artist, title){
  $('.current-artist').text(artist);
  $('.current-title').text(title);
  metaWidth = $('.metadata').width();
}

function getSoundByURL(soundURL) {
  var i;
  for (i=0; i<soundCount; i++) {
    if (allSongs[i].url == soundURL) {
      return allSongs[i];
    }
  }
}

function stopOtherPlayers(songID){
  var i;
  for (i=0; i<soundCount; i++) {
    if (allSongs[i].sID !== songID) {
      allSongs[i].pause();
    }
  }
}

function getGlobalPlayState(){
  var i;
  for (i=0; i<soundCount; i++) {
    if (allSongs[i].paused === false) {
      return true;
    }
  }
}


$('.sm-player li').on('click', function(e){
  e.preventDefault();
  var that = $(this);

  var soundURL = that.find('a').attr('href');
  var thisSong = getSoundByURL(soundURL);

  if (thisSong) {
    stopOtherPlayers(thisSong.id);
    thisSong.togglePause();
  } else {
    thisSong = sm.createSound({
      id:'brSound'+(soundCount++),
      url:soundURL,
      debugMode: false,
      onid3: function() {
        thisSong.artist = thisSong.id3.TPE1;
        thisSong.title = thisSong.id3.TIT2;
        updateArtist(thisSong.artist, thisSong.title);
      },
      onplay: function() {
        $('body').addClass('playing');
        that.addClass('playing-item');
        that.find('.play-pause[data-icon]').attr('data-icon','n');
      },
      onresume: function() {
        $('body').addClass('playing');
        that.addClass('playing-item');
        that.find('.play-pause[data-icon]').attr('data-icon','n');
      },
      onpause: function() {
        if (!getGlobalPlayState()) {
          $('body').removeClass('playing');
          // timeout required because whileplaying() calls simultaneously with onpause
          setTimeout(function() {drawSoundData(null,true);}, 100);
        }
        that.removeClass('playing-item').find('.play-pause[data-icon]').attr('data-icon','m');
      },
      whileplaying: function() {
        drawSoundData(thisSong.eqData,false);
        // playhead calculation is not responsive
        $('.playhead').css('width', ( (thisSong.position/(thisSong.durationEstimate))*100).toFixed(2) + '%');
        
      },
      onfinish: function(){
        $('body').removeClass('playing');
        // timeout required because whileplaying() calls simultaneously with onpause
        setTimeout(function() {drawSoundData(null,true);}, 100);
        that.removeClass('playing-item').find('.play-pause[data-icon]').attr('data-icon','m');
      }
    });

    thisSong.togglePause();
    allSongs.push(thisSong);
    stopOtherPlayers(thisSong.id);

  }

  updateArtist(thisSong.artist, thisSong.title);

});



var numBars = 8;
var gutter = 2;
var pageWidth = $('#peak').parent().width();
var width = Math.round(pageWidth/numBars - gutter);

function doneResizing() {
  var pageWidth = $('#peak').parent().width() + 5;
  var width = Math.round(pageWidth/numBars - gutter);
  var barArray = document.getElementById('peak').getElementsByTagName('div');
  buildBars(width);
  $('#peak').css('opacity','1');
}

var resizeTimeout;
$(window).resize(function(){
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(doneResizing, 500);
  $('#peak').css('opacity','0');
});



function buildBars(width) {
var eqBars = '';
  for (i=0;i<numBars;i++) {
      eqBars += '<div style=\"width:'+width+'px;left:'+Math.round(([i]*width + (gutter*[i])))  +'px;\"></div>';
      $('#peak').html(eqBars);
  }
}

buildBars(width);

var barArray = document.getElementById('peak').getElementsByTagName('div');


function drawSoundData(eq,reset) {
  var i;
  if (reset) {
    for (i=0; i < numBars; i++) {
      barArray[i].style.height = '0px';
    }
  } else {
    for (i=0; i < numBars; i++) {
      barArray[i].style.height = (10) + Math.floor((eq[i]*100)) + '%';
    }
  }
}

(function(){
  var albumWidth,
      albumWrapper = $('.albums'),
      albums = albumWrapper.find('li'),
      numAlbums = albums.length,
      visibleNum = 5;

  function setupAlbumSlider() {
     albumWidth = ($('.section-inner').width()+30)/visibleNum;
     albumWidthPerc = Math.round((100/numAlbums));
     var albumWrapperWidth = Math.round(numAlbums*albumWidth);
     albums.each(function(){
       $(this).css('width', albumWidthPerc + '%' );
     });
     albumWrapper.css('width', albumWrapperWidth + 'px');
  }

  // check to see this is actually called
  // if not... remove it
  function sizeIconFont(){
      var sizeMe = ($('.li-img').height() / 100) * 37; /* 90% of container */
      $('span[data-icon].play-pause').css('font-size', sizeMe);
  }

  function setVisible(begin,end) {
    var visible = albums.slice(begin,end);
    var invisible = albums.slice(end,numAlbums);
    var invisibleOut = albums.slice(0,begin-1);

    invisible.removeClass('visible').addClass('invisible');
    invisibleOut.removeClass('visible').addClass('invisible');

    visible.addClass('visible');
  }

  $(window).load(function(){

    // Once loaded, undo css that restricts UL height
    // this is for smooth page loading
    // relevant css at line 358 on .alubms, .videos
    $('.thumbnail').addClass('loaded');
    $('.thumbnail').css('height', 'auto');
    $('.thumbnail').css('overflow', 'visible');

    setupAlbumSlider();
    setVisible(0,visibleNum);

    // Size playhead
    

    // Download button on album cover
    $('.download').on('click', function(e){
        e.stopPropagation();
        e.preventDefault();
        var downloadLink = $(this).data('href');
        console.log(downloadLink);
        window.location.href = downloadLink;
    });

    // Carousel logic
    var y=0;
    $('.carousel').on('click',function(){
      var direction = $(this).data('direction');
      if (direction === 'next' && y < (numAlbums - visibleNum)) {
        y++;
        $('.albums').css('right', y*albumWidth + 'px');
        setVisible(y+1,y+visibleNum);
      } else if (direction === 'previous' && y > (0)){
        y--;
        $('.albums').css('right', y*albumWidth + 'px');
        setVisible(y,y+visibleNum);
      } else {
        return false;
      }

      if (y>0) {
        $('.carousel-previous').addClass('scrolled');
      } else {
        $('.carousel-previous').removeClass('scrolled');
      }

      if (y > (numAlbums - visibleNum - 1)) {
        $('.carousel-next').addClass('end');
      } else {
        $('.carousel-next').removeClass('end');
      }
    
    });

    $(window).resize(function(){
      // Update slider when window resized
      setupAlbumSlider();
      $('.albums').css('right', y*albumWidth + 'px');
      if ($(window).width() < 700) {
        // NOTE: still need to deal with slider moving from
        // normal functionality to mobile layout
        albumWrapper.css('width','100%');
        // albumWrapper.css('position','static'); // an attempt to reset slider at mobile
        albums.each(function(){
          $(this).css('width', 'inherit');
        });
      }
    });
    

  });
})();

})();
