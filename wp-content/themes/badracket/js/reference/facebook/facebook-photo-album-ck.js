(function(e){e.fn.facebookPhotoAlbum=function(t){function r(e,t){var n,r=[];for(n=e;n<=t-1;n++)r[n]=n;r.sort(function(){return Math.random()-.5});return r}var n=e.extend({facebookAlbumId:"10150146071791729",photoLimit:"10",randomOrder:"true"},t);return this.each(function(){var t=n.facebookAlbumId,s=n.photoLimit,o=n.randomOrder,u="https://graph.facebook.com/"+t+"/photos",a=e(this);a.html("Loading...");e.getJSON(u,function(t){a.html("");var n=s;t.data.length<n&&(n=t.data.length);var u=r(0,n);for(i=0;i<u.length;i++){if(o==="true")var f=t.data[u[i]];else var f=t.data[i];var l="<li data-thumb='"+f.source+"'><a href='"+f.link+"' ><img src='"+f.source+"' /></a></li>";a.append(l)}})})}})(jQuery);