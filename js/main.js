/* @codekit-prepend "lib/angular.js" */
/* @codekit-prepend "lib/jquery.js" */
/* @codekit-prepend "lib/jquery.djax.js" */
/* @codekit-prepend "lib/enquire.js" */
/* @codekit-prepend "lib/underscore.js" */
/* @codekit-prepend "lib/format_date.js" */
/* @codekit-prepend "lib/bootstrap-modal.js" */
/* @codekit-prepend "lib/froogaloop.js" */
/* @codekit-prepend "data.js" */



var BR = angular.module('BR', []);

BR.factory('Albums', function(){
  return albums;
});

BR.filter('length', function(){
  return function(array) {
    return array.length;
  };
});

function AlbumCtrl( $scope, Albums ) {
  $scope.albums = Albums;

  $scope.play = function( album ) {
    _.each( $scope.albums, function( el ) { el.isPlaying = false; } );
    album.isPlaying = 'playing';
  };


}


function lazyload(){
    $('.lazyload').each(function() {
     var lazy = $(this);
     var src = lazy.attr('data-src');
     $('<img>').attr('src', src).load(function(){
          lazy.css('background-image', 'url("'+src+'")');
          if (lazy.hasClass('fade')) {
            lazy.parent().addClass('loaded');
          } else if (lazy.hasClass('fade-this')) {
            lazy.addClass('loaded');
          }
        });
    });
  }

$(window).load(function(){
  lazyload();
});