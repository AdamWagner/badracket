var br_fb=function(){function i(t){if(!window.FB||!e.accessToken&&!e.appAccess){console.log("ensure init still running");e.loginCounter++;e.loginCounter<50&&setTimeout(function(){i(t)},150)}else t&&t()}function o(e){br_fb.user.events!==null?e():$(window).on("fb-user-data-load",function(){e()})}function u(e){br_fb.BR.events.length>0?e():$(window).on("fb-page-data-load",function(){e()})}function a(t){var n=new $.Deferred,r=function(){if(e.connectStatus==="connected"){FB.api(t,function(e){n.resolve(e)});console.log("call fb called with this path "+t)}else{t=t+"&access_token="+escape(e.appAccess);console.log("call fb called with this path "+t);FB.api(t,function(e){console.log(e);n.resolve(e)})}};i(r);return n.promise()}function f(){FB.getLoginStatus(function(e){p.globalSetup(e)})}function l(e){FB.login(function(t){f(t);e&&e()},{scope:r.join(",")})}function c(){FB.logout(function(e){})}function v(){FB.init({appId:e.appId,channelUrl:"//WWW.BADRACKET.COM/channel.html",status:!0,cookie:!0,xfbml:!0});f()}var e={appId:BR_ENV==="prod"?"182655285084916":"500547106661064",secret:BR_ENV==="prod"?"d6a8a494139d8f0a4ebc981bdb5751a3":"fde7ca80b4bc1e1d912984266f67e36f",accessToken:null,appAccess:null,connectStatus:null,loginCounter:0},t={userID:null,username:null,first_name:null,last_name:null,email:null,gender:null,likes:null,events:null,likesBR:null,location:null,picture:null},n={pageName:null,link:null,likeCount:null,events:[],photos:[]},r=["email","user_activities","friends_activities","user_likes","friends_likes","friends_location","rsvp_event","user_events"],h=function(){function r(){var e=["likes","email","gender","first_name","last_name","username","picture","bio","location","friends"];return a("me?fields="+e.join(","))}function i(){return a("me/events?limit=99999&type=attending&since=0")}function s(e){function n(e){var n=!1;_.each(t.events,function(t){if(t.id==e){console.log("is already going");n=!0}});return n}t.username=e.username||"not given";t.userID=e.id||"not given";t.first_name=e.first_name||"not given";t.last_name=e.last_name||"not given";t.email=e.email||"not given";t.events===null?t.events=e.events||[]:t.events.push();t.gender=e.gender||"not given";t.picture=e.picture.data.url;typeof e.likes!="undefined"&&(t.likes=e.likes.data);typeof e.location!="undefined"&&(t.likes=e.location.name);typeof e.picture!="undefined"&&(t.likes=e.picture.data.url);typeof e.friends!="undefined"&&(t.likes=e.friends.data);typeof e.likes!="undefined"&&o(t.likes)}function o(e){t.likesBR=!1;_.each(e,function(e){if(e.name===n.pageName||"Bad Racket Recording Studio")t.likesBR=!0})}function u(e){if(!t.events)return!1;for(var n=t.events.length;n--;)if(t.events[n].id==e)return!0}function f(e){for(var t=n.events.length;t--;)if(n.events[t].id==e)return n.events[t]}function l(){var e=["name","likes","events.fields(attending.fields(picture,name))","hours","location","phone","link"];return a("/badracket?fields="+e.join(","))}function c(e){n.pageName=e.name;n.likeCount=e.likes;n.location=e.location;n.phone=e.phone;n.link=e.link;n.hours=e.hours;n.events=e.events.data}function h(){return a("/badracket/albums?fields=id&limit=9999")}function p(e){n.albums=e.data;d(n.albums)}function d(t){window.dfds=[];_.each(t,function(t){var r=new $.Deferred,i=br_fb.config.connectStatus!=="connected"?"/photos?fields=images,likes&limit=9999&access_token="+escape(e.appAccess):"/photos?fields=images,likes&limit=9999";FB.api(t.id+i,function(e){_.each(e.data,function(e){var t=e.images[4].source,r=e.images[0].source,i=e.likes?e.likes.data.length:0;n.photos.push({large:r,medium:t,likes:i})});r.resolve()});window.dfds.push(r.promise())})}return{isFan:o,isAttending:u,getUser:r,getUserEvents:i,popUser:s,getBR:l,getBR_albums:h,getPhotoURLS:d,popBR:c,popPhotos:p,getEventByID:f}}(),p=function(){function n(n){console.log("response object is ........");console.log(n);var i=n.status;$.when(h.getBR()).then(function(e){h.popBR(e);$(window).trigger("fb-page-data-load")});if(i==="connected"){var s=n.authResponse.accessToken;e.accessToken=s;e.connectStatus="connected";d.render.authStatus(!0);$.when(h.getUser(),h.getUserEvents()).done(function(e,n){e.events=n.data;h.popUser(e);$(window).trigger("fb-user-data-load");d.render.user();d.render.userPicture();br_mixpanel.setPeople(t);if(br_player.state.isPlaying){br_player.ui.handlers.playClick();br_player.ui.handlers.playClick()}})}else if(i==="not_authorized"){d.render.authStatus(!1);e.connectStatus=i;r()}else{d.render.authStatus(!1);e.connectStatus=i;r()}}function r(){console.log("https://graph.facebook.com/oauth/access_token?client_id="+e.appId+"&redirect_uri=http://localhost:8888/sites/brv5/wp-br/&client_secret="+e.secret+"&grant_type=client_credentials");$.ajax({url:"https://graph.facebook.com/oauth/access_token?client_id="+e.appId+"&redirect_uri=http://localhost:8888/sites/brv5/wp-br/&client_secret="+e.secret+"&grant_type=client_credentials",success:function(t){e.appAccess=t.split("=")[1]}});d.render.authStatus(!1);e.connectStatus="not_logged_to_fb"}return{globalSetup:n}}(),d=function(){var r={authStatus:function(e){var t=$("html");if(e){t.addClass("fb-logged-in");t.removeClass("fb-logged-out")}else{t.addClass("fb-logged-out");t.removeClass("fb-logged-in")}$(".header-buttons").addClass("loaded")},user:function(){console.log("render login ran");$(".fb-user-name").text(t.first_name)},userPicture:function(){$(".fb-user-picture").attr("src",t.picture)},rsvpButton:function(e,t){var n=t.closest(".show-rsvp"),r=((new Date).getTime()/1e3).toFixed(),i=t.closest(".padded-mobile-1").find(".show-rsvp").attr("data-fb-id");console.log("now: "+r);console.log("then: "+i);var s="";i>r?s="You're going!":s="You went!";if(e&&e!=="error"){n.removeClass("not-attending").addClass("rsvp-attending").find(".text").text(s);$(".show-rsvp").off("click",o.rsvp)}else e=="error"&&n.removeClass("not-attending").find(".text").text("Oops! Something went wrong. You might be a Bad Racket admin and can't RSVP")},attending:function(e){var t=$(".show-rsvp").attr("data-fb-id"),n=h.getEventByID(t),r=[];if(n===null){console.log("fuck ");return!1}var i=n.attending.data,s=function(){var e=0;_.each(i,function(t){e<6&&r.push(t.name);e++});return e}(),o=i.length-r.length,u=o>0?' and </span> <span class="not-xparent">'+o+" others </span>":"";$(".show-sidebar .attendees .text").html('<span class="not-xparent">'+r.join(", ")+u+" are going.");var a=[];_.each(i,function(e){var t=e.picture.data.url;a.push('<img class="grid" src="'+t+'"/>')});$(".show-sidebar .attendees .facepile").html(a.join(""))},usersAttending:function(){function u(e,t){for(var n=0;n<t.length;n++)if(t[n]===e)return!0}console.log("users attending raaaaaaaaaaaannnnnnnn");var e=$(".show-rsvp").data("fb-id"),n=h.getEventByID(e);if(typeof n=="undefined")return!1;var r=n.attending.data,i=_.pluck(t.friends,"id"),s=[],o=[];console.log("this is the attendees:");console.log(r);r=_.sortBy(r,function(e){return u(e.id,i)});var a=function(){var e=0;_.each(r,function(t){if(u(t.id,i)){s.length<6&&s.push(t);t.friend=!0;e++}});return e}();for(var f=0;f<s.length;f++)r[f].name!==t.first_name+" "+t.last_name&&o.push(r[f].name);var l="",c="",p=0;if(h.isAttending(e)){console.log("yep");l=" also ";c="You, ";p=1}var d=r.length-s.length-p,v=d>0?' and  <span class="not-xparent">'+d+" others </span>":"";$(".show-sidebar .attendees .text").html('<span class="not-xparent">'+o.join(", ")+"</span>"+v+" are going.");var m=[];console.log("the list of 4 attendees");console.log(r);_.each(r,function(e){if(e.friend||e.name===t.first_name+" "+t.last_name||a<6){var n=e.picture.data.url;m.push('<img class="grid" src="'+n+'"/>')}});$(".show-sidebar .attendees .facepile").html(m.join(""))},renderPhotos:function(){$.when.apply(null,window.dfds).done(function(e){n.sortedPhotos=_.sortBy(n.photos,function(e){return-e.likes});var t=[];for(var r=0;r<95;r++)t.push('<div class="grid padded"><div class="lazyload fade ratio-4-3" data-src="'+n.sortedPhotos[r].medium+'"></div></div>');$(".photos-container").html(t.join("\n"));badracket.lazyLoadImg("render photos")})},videos:function(){var e=$("#video-container"),t=[];_.each(n.videos,function(e){var n=e.thumbnail_large,r=e.title.split(":")[0],i=e.title.split("-")[1],s=e.id,o=['<div class="grid padded">','<div class="playable video" data-id="'+s+'">','<div class="play"></div> ','<div class="lazyload fade ratio-16-9" data-src="'+n+'">',"</div>","</div>",'<div class="album-meta">','<div class="album-title">'+r+"</div>",'<div class="artist-name">'+i+"</div>","</div>","</div>"].join("");t.push(o)});e.html(t);u.video();badracket.lazyLoadImg("vimeo inject - all")},videosHome:function(){var e=$("#video-container"),t=[];for(var r=0;r<4;r++){var i=n.videos[r],s=i.thumbnail_large,o=i.title.split(":")[0],a=i.title.split("-")[1],f=i.id,l=['<div class="grid padded">','<a href="'+br_state.urls.videos+'" class="dJAX_internal">','<div class="playable video" data-id="'+f+'">','<div class="play"></div> ','<div class="lazyload fade ratio-16-9" data-src="'+s+'"></div>',"</div>",'<div class="album-meta">','<div class="album-title">'+o+"</div>",'<div class="artist-name">'+a+"</div>","</div>","</a>","</div>"].join("");t.push(l)}e.html(t);u.videoHome();badracket.lazyLoadImg("vimeo inject - home")}},i={bind:function(){function n(e){var t=$(".vimeo-container");setTimeout(function(){t.removeClass("loading")},500);br_mixpanel.track("Video started");mixpanel.people.increment("Videos started",1);$(window).trigger("vimeo-play-event")}function r(e){$(window).trigger("vimeo-pause-event")}function i(e){mixpanel.people.increment("Videos finished",1);br_mixpanel.track("Video ended");$(".next").find(".video").click()}var e=$("#vimeo-player")[0],t=$f(e);t.addEvent("ready",function(){t.addEvent("play",n);t.addEvent("pause",r);t.addEvent("finish",i)});$(window).on("sm2-play-event",function(){t.api("pause")})}},o={login:function(){l()},logout:function(){c()},videoHomeClick:function(){var e=$(this).data("id");console.log("vid home click ran biiiiiiiiiiiiiiiiiooooooooooooch");$(window).on("djaxLoad",function(t,n){$('[data-id="'+e+'"]').click();console.log($('[data-id="'+e+'"]'))});br_mixpanel.track("Click: video")},videoClick:function(){$(window).off("sm2-play-event");var e=$(this);$("html, body").animate({scrollTop:0},"slow");var t=e.data("id"),n=$(".vimeo-container");$(".grid").removeClass("playing next");e.closest(".grid").addClass("playing").next().addClass("next");var r=$(".main-content").width()*.5;n.addClass("loading").css("height",r);n.find(".iframe-wrap").html('<iframe style="visibility:hidden;" onload="this.style.visibility=\'visible\';" id="vimeo-player" src="http://player.vimeo.com/video/'+t+'?api=1&autoplay=true&player_id=vimeo-player"></iframe>');i.bind();n.fitVids();br_mixpanel.track("Click: video")},rsvp:function(n){function o(e){var n=!1;_.each(t.events,function(t){if(t.id==e){console.log("is already going");n=!0}});return n}function u(){console.log("attend called");FB.api("/"+s+"/attending","post",function(e){i.removeClass("transparent");console.log(e);if(e.error)r.rsvpButton("error",i);else{r.rsvpButton(!0,i);t.events===null&&(t.events=[]);o(s)||t.events.push(h.getEventByID(s))}})}var i=$(n.target).closest(".show-rsvp");i.addClass("transparent");var s=i.data("fb-id");console.log(s);e.connectStatus!=="connected"?l(u):u()}},u={login:function(){$(".facebook .login").on("click",o.login)},logout:function(){$(".facebook .logout").on("click",o.logout)},rsvp:function(){s.bd.on({click:function(e){o.rsvp(e)}},".show-rsvp")},video:function(){$(".video").on("click",o.videoClick)},videoHome:function(){$('[data-view="home"]').find(".video").on("click",o.videoHomeClick)},bindAll:function(){this.login();this.logout();this.rsvp()},unBindAll:function(){$(".facebook .login").off("click",o.login);$(".facebook .logout").off("click",o.logout);$(".show-rsvp").off("click",o.rsvp)}};return{render:r,bindUI:u,vimeo:i}}();return{config:e,init:v,login:l,logout:c,fbEnsureInit:i,user_do_or_wait:o,page_do_or_wait:u,fetch:h,user:t,BR:n,UI:d}}();br_fb.UI.bindUI.bindAll();