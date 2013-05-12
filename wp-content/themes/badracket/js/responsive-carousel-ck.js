/*! Responsive Carousel - v0.1.0 - 2012-10-23
* https://github.com/filamentgroup/responsive-carousel
* Copyright (c) 2012 Filament Group, Inc.; Licensed MIT, GPL *//*
 * responsive-carousel
 * https://github.com/filamentgroup/responsive-carousel
 *
 * Copyright (c) 2012 Filament Group, Inc.
 * Licensed under the MIT, GPL licenses.
 */(function(e){var t="carousel",n="."+t,r="data-transition",i=t+"-transitioning",s=t+"-item",o=t+"-active",u=t+"-in",a=t+"-out",f=t+"-nav",l=function(){var e="webkit Moz O Ms".split(" "),t=!1,n;while(e.length){n=e.shift()+"Transition";if(n in document.documentElement.style!==undefined&&n in document.documentElement.style!=0){t=!0;break}}return t}(),c={_create:function(){e(this).trigger("beforecreate."+t)[t]("_init")[t]("_addNextPrev").trigger("create."+t)},_init:function(){var n=e(this).attr(r);n||(l=!1);return e(this).addClass(t+" "+(n?t+"-"+n:"")+" ").children().addClass(s).first().addClass(o)},next:function(){e(this)[t]("goTo","+1")},prev:function(){e(this)[t]("goTo","-1")},goTo:function(n){var i=e(this),f=i.attr(r),c=" "+t+"-"+f+"-reverse";e(this).find("."+s).removeClass([a,u,c].join(" "));var h=e(this).find("."+o),p=h.index(),d=(p<0?0:p)+1,v=typeof n=="number"?n:d+parseFloat(n),m=e(this).find(".carousel-item").eq(v-1),g=typeof n=="string"&&!parseFloat(n)||v>d?"":c;m.length||(m=e(this).find("."+s)[g.length?"last":"first"]());if(l)i[t]("_transitionStart",h,m,g);else{m.addClass(o);i[t]("_transitionEnd",h,m,g)}i.trigger("goto."+t,m)},update:function(){e(this).children().not("."+f).addClass(s);return e(this).trigger("update."+t)},_transitionStart:function(n,r,i){var s=e(this);r.one(navigator.userAgent.indexOf("AppleWebKit")>-1?"webkitTransitionEnd":"transitionend otransitionend",function(){s[t]("_transitionEnd",n,r,i)});e(this).addClass(i);n.addClass(a);r.addClass(u)},_transitionEnd:function(t,n,r){e(this).removeClass(r);t.removeClass(a+" "+o);n.removeClass(u).addClass(o)},_bindEventListeners:function(){var n=e(this).bind("click",function(r){var i=e(r.target).closest("a[href='#next'],a[href='#prev']");if(i.length){n[t](i.is("[href='#next']")?"next":"prev");r.preventDefault()}});return this},_addNextPrev:function(){return e(this).append("<nav class='"+f+"'><a href='#prev' class='prev' aria-hidden='true' title='Previous'>Prev</a><a href='#next' class='next' aria-hidden='true' title='Next'>Next</a></nav>")[t]("_bindEventListeners")},destroy:function(){}};e.fn[t]=function(n,r,i,s){return this.each(function(){if(n&&typeof n=="string")return e.fn[t].prototype[n].call(this,r,i,s);if(e(this).data(t+"data"))return e(this);e(this).data(t+"active",!0);e.fn[t].prototype._create.call(this)})};e.extend(e.fn[t].prototype,c);e(function(){e(n)[t]()})})(jQuery);(function(e){var t="carousel",n="."+t,r=t+"-no-transition",i=/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,s={_dragBehavior:function(){var t=e(this),s,o={},u,a,f=function(t){var r=t.touches||t.originalEvent.touches,i=e(t.target).closest(n);t.type==="touchstart"&&(s={x:r[0].pageX,y:r[0].pageY});if(r[0]&&r[0].pageX){o.touches=r;o.deltaX=r[0].pageX-s.x;o.deltaY=r[0].pageY-s.y;o.w=i.width();o.h=i.height();o.xPercent=o.deltaX/o.w;o.yPercent=o.deltaY/o.h;o.srcEvent=t}},l=function(t){f(t);e(t.target).closest(n).trigger("drag"+t.type.split("touch")[1],o)};e(this).bind("touchstart",function(t){e(this).addClass(r);l(t)}).bind("touchmove",function(e){f(e);l(e);if(!i){e.preventDefault();window.scrollBy(0,-o.deltaY)}}).bind("touchend",function(t){e(this).removeClass(r);l(t)})}};e.extend(e.fn[t].prototype,s);e(n).live("create."+t,function(){e(this)[t]("_dragBehavior")})})(jQuery);(function(e){var t="carousel",n="."+t,r=t+"-active",i=t+"-item",s=function(e){return Math.abs(e)>4},o=function(e,n){var r=e.find("."+t+"-active"),s=r.prevAll().length+1,o=n<0,u=s+(o?1:-1),a=e.find("."+i).eq(u-1);a.length||(a=e.find("."+i)[o?"first":"last"]());return[r,a]};e(n).live("dragmove",function(t,n){if(!s(n.deltaX))return;var r=o(e(this),n.deltaX);r[0].css("left",n.deltaX+"px");r[1].css("left",n.deltaX<0?n.w+n.deltaX+"px":-n.w+n.deltaX+"px")}).live("dragend",function(t,n){if(!s(n.deltaX))return;var i=o(e(this),n.deltaX),u=Math.abs(n.deltaX)>45;e(this).one(navigator.userAgent.indexOf("AppleWebKit")?"webkitTransitionEnd":"transitionEnd",function(){i[0].add(i[1]).css("left","")});if(u){i[0].removeClass(r).css("left",n.deltaX>0?n.w+"px":-n.w+"px");i[1].addClass(r).css("left",0)}else{i[0].css("left",0);i[1].css("left",n.deltaX>0?-n.w+"px":n.w+"px")}})})(jQuery);