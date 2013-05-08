(function( $ ){

  $.fn.facebookPhotoAlbum = function( options ) {  

    var settings = $.extend( {
      'facebookAlbumId' : '10150146071791729',
      'photoLimit'       : '10',
      'randomOrder'      : 'true'
    }, options);

    function GetRandomArray(start, end)
    {
      var i, arr = [];
      for (i = start; i <= end-1; i++) {
        arr[i] = i;
      }

      arr.sort(function () {
        return Math.random() - 0.5;
      });
      return arr;
    }

    return this.each(function() {
      var albumId = settings.facebookAlbumId;
      var photoLimit = settings.photoLimit;
      var randomOrder = settings.randomOrder;
      var url = "https://graph.facebook.com/"+albumId+"/photos";
      var target = $(this);

      target.html("Loading...");

      $.getJSON(url, function success(result) {
        target.html("");
        var limit = photoLimit;
        if(result.data.length<limit)
        {
          limit = result.data.length;
        }
        
        var randArr = GetRandomArray(0, limit);
        
        for(i=0;i<randArr.length;i++)
        {
          if(randomOrder === "true")
          {
            var image = result.data[randArr[i]];
          }
          else
          {
            var image = result.data[i];
          }

          var li = "<li data-thumb='"+image.source+"'><a href='"+image.link+"' ><img src='"+image.source+"' /></a></li>";
          target.append(li);
        }
        
      });

    });

  };
})( jQuery );