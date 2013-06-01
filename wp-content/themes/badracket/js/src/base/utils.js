/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Utilities
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


badracket.utils = {
	px2em: function( elem ){
	  var W = window,
	      D = document;
	  if (!elem || elem.parentNode.tagName.toLowerCase() == 'body') {
	      return false;
	  }
	  else {
	      var parentFontSize = parseInt(W.getComputedStyle(elem.parentNode, null).fontSize, 10),
	          elemFontSize = parseInt(W.getComputedStyle(elem, null).fontSize, 10);

	      var pxInEms = Math.floor((elemFontSize / parentFontSize) * 100) / 100;
	      elem.style.fontSize = pxInEms + 'em';
	  }
	},

	stringContains : function(string, search) { 
		return string.indexOf(search) != -1; 
	},

	htmlDecode : function ( input ) {
	  var e = document.createElement('div');
	  e.innerHTML = input;
	  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	},

	hasTrailngSlash : function(url) {
	  return url.charAt(url.length - 1) === "/";
	},

	msToTime : function(s) {
	  var ms = s % 1000;
	  s = (s - ms) / 1000;
	  var secs = s % 60;
	  s = (s - secs) / 60;
	  var mins = s % 60;

	  if (secs < 10) {secs = "0"+secs;}
	  return mins + ':' + secs;
	},

	stringToTime : function(time) {
	    time = time.toString().split(/:/);
	    return time[0] * 60000 + time[1] * 1000;
	}
};


(function($) {

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

}(jQuery));