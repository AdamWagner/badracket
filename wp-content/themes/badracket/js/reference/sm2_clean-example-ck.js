soundManager.url="SoundManager2/swf/";soundManager.flashVersion=9;var Application=function(){var e=this,t=document.getElementById("play"),n=document.getElementById("jump"),r,s;e.removeChildNodesFrom=function(e){if(e.hasChildNodes())while(e.childNodes.length>0)e.removeChild(e.firstChild)};e.play=function(){if(soundManager.canPlayLink(this)){soundManager.stopAll();soundManager.play(this.getAttribute("title"),this.getAttribute("href"));r=this.getAttribute("title");t.setAttribute("value","Pause")}e.updateView();return!1};e.jump=function(){var e=document.getElementById("timeline"),t=e.value,n=t.split(":"),i=parseInt(n[0]),s=parseInt(n[1]),o=parseInt(n[2]);if(typeof r!="undefined"&&soundManager.getSoundById(r)){var u=soundManager.getSoundById(r),a=i*60*1e3+s*1e3+o;u.setPosition(a)}};e.bindPlaylistLinks=function(){var t=document.getElementsByTagName("ul")[0],n=t.getElementsByTagName("a");for(i=0;i<n.length;i++)n[i].onclick=e.play};e.bindButtons=function(){t.onclick=function(){if(typeof r!="undefined"&&soundManager.getSoundById(r).paused){soundManager.resume(r);this.setAttribute("value","Pause")}else{soundManager.pause(r);this.setAttribute("value","Play")}e.updateView();return!1};n.onclick=e.jump};e.formatTime=function(e){var t=parseInt(e/1e3),n=parseInt(t/60),r=t%60;r<10&&(r="0"+r);return n+":"+r};e.updateView=function(){clearTimeout(s);var n=document.getElementById("duration"),o=document.getElementById("progress"),u=document.getElementById("title");if(typeof r!="undefined"){var a=soundManager.getSoundById(r),f=document.createTextNode(r),l=document.createTextNode(e.formatTime(a.position)+" / "+e.formatTime(a.duration)+(a.bytesLoaded<a.bytesTotal?" (loading)":"")),c="";for(i=0;i<parseInt((a.duration-a.position)/1e3);i++)c+=".";var h=document.createTextNode(c);e.removeChildNodesFrom(n);e.removeChildNodesFrom(o);e.removeChildNodesFrom(u);n.appendChild(l);o.appendChild(h);u.appendChild(f);a.playState===0&&t.setAttribute("value","Play")}s=setTimeout(e.updateView,1e3)};return e}();window.onload=function(){soundManager.onready(function(){Application.bindPlaylistLinks();Application.bindButtons();Application.updateView()})};