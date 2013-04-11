/* @codekit-prepend "lib/angular.js" */
/* @codekit-prepend "lib/jquery.js" */
/* @codekit-prepend "lib/jquery.djax.js" */
/* @codekit-prepend "lib/enquire.js" */
/* @codekit-prepend "lib/underscore.js" */
/* @codekit-prepend "lib/format_date.js" */
/* @codekit-prepend "lib/bootstrap-modal.js" */
/* @codekit-prepend "lib/froogaloop.js" */
/* @codekit-prepend "data.js" */



function AlbumCtrl($scope) {
  $scope.albums = albums;

  $scope.play = function(album, $event) {
    // $scope.todos.push({text:$scope.todoText, done:false});
    // $scope.todoText = '';
    console.log(album);
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
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