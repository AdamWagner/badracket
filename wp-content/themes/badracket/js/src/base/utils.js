/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  *\
   Utilities
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var badracket = window.badracket || {};

badracket.utils = {

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
	       if (this.loadCount == this.totalRequired && typeof this.callback == 'function') { this.callback.call(); } 
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

	envCheck : function(local, staging, production){
	  var result;
	  if (BR_ENV === 'local') {
	    result = local;
	  } else if (BR_ENV === 'staging') {
	    result = staging;
	  } else {
	    result = production;
	  }
	  return result;
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