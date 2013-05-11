(function(a) {
  a.setCookie = function(d, e, c) {
    if (typeof d === "undefined" || typeof e === "undefined") {
      return false
    }
    var f = d + "=" + encodeURIComponent(e);
    if (c.domain) {
      f += "; domain=" + c.domain
    }
    if (c.path) {
      f += "; path=" + c.path
    }
    if (c.duration) {
      var b = new Date();
      b.setTime(b.getTime() + c.duration * 24 * 60 * 60 * 1000);
      f += "; expires=" + b.toGMTString()
    }
    if (c.secure) {
      f += "; secure"
    }
    return document.cookie = f
  };
  a.delCookie = function(b) {
    return a.setCookie(b, "", {duration: -1})
  };
  a.readCookie = function(b) {
    var c = document.cookie.match("(?:^|;)\\s*" + b.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1") + "=([^;]*)");
    return (c) ? decodeURIComponent(c[1]) : null
  };
  a.CooQueryVersion = "v 2.0"
})(jQuery);




(function(b) {
  function a(bi, bc) {
    function ao(j) {
      return function(k) {
        return !this._t || !this._t._a ? null : j.call(this, k)
      }
    }
    function bj() {
      if (ay.debugURLParam.test(aI)) {
        ay.debugMode = true
      }
    }
    this.flashVersion = 8;
    this.debugFlash = this.debugMode = false;
    this.useConsole = true;
    this.waitForWindowLoad = this.consoleOnly = false;
    this.nullURL = "about:blank";
    this.allowPolling = true;
    this.useFastPolling = false;
    this.useMovieStar = true;
    this.bgColor = "#ffffff";
    this.useHighPerformance = false;
    this.flashPollingInterval = null;
    this.flashLoadTimeout = 1000;
    this.wmode = null;
    this.allowScriptAccess = "always";
    this.useHTML5Audio = this.useFlashBlock = false;
    this.html5Test = /^probably$/i;
    this.useGlobalHTML5Audio = true;
    this.requireFlash = false;
    this.audioFormats = {mp3: {type: ['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],required: true},mp4: {related: ["aac", "m4a"],type: ['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"],required: true},ogg: {type: ["audio/ogg; codecs=vorbis"],required: false},wav: {type: ['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"],required: false}};
    this.defaultOptions = {autoLoad: false,stream: true,autoPlay: false,loops: 1,onid3: null,onload: null,whileloading: null,onplay: null,onpause: null,onresume: null,whileplaying: null,onstop: null,onfailure: null,onfinish: null,onbeforefinish: null,onbeforefinishtime: 5000,onbeforefinishcomplete: null,onjustbeforefinish: null,onjustbeforefinishtime: 200,multiShot: true,multiShotEvents: false,position: null,pan: 0,type: null,usePolicyFile: false,volume: 100};
    this.flash9Options = {isMovieStar: null,usePeakData: false,useWaveformData: false,useEQData: false,onbufferchange: null,ondataerror: null};
    this.movieStarOptions = {bufferTime: 3,serverURL: null,onconnect: null,duration: null};
    this.version = null;
    this.versionNumber = "V2.97a.20110306";
    this.movieURL = null;
    this.url = bi || null;
    this.altURL = null;
    this.enabled = this.swfLoaded = false;
    this.o = null;
    this.movieID = "sm2-container";
    this.id = bc || "sm2movie";
    this.swfCSS = {swfBox: "sm2-object-box",swfDefault: "movieContainer",swfError: "swf_error",swfTimedout: "swf_timedout",swfLoaded: "swf_loaded",swfUnblocked: "swf_unblocked",sm2Debug: "sm2_debug",highPerf: "high_performance",flashDebug: "flash_debug"};
    this.oMC = null;
    this.sounds = {};
    this.soundIDs = [];
    this.muted = false;
    this.debugID = "soundmanager-debug";
    this.debugURLParam = /([#?&])debug=1/i;
    this.didFlashBlock = this.specialWmodeCase = false;
    this.filePattern = null;
    this.filePatterns = {flash8: /\.mp3(\?.*)?$/i,flash9: /\.mp3(\?.*)?$/i};
    this.baseMimeTypes = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
    this.netStreamMimeTypes = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
    this.netStreamTypes = ["aac", "flv", "mov", "mp4", "m4v", "f4v", "m4a", "mp4v", "3gp", "3g2"];
    this.netStreamPattern = RegExp("\\.(" + this.netStreamTypes.join("|") + ")(\\?.*)?$", "i");
    this.mimePattern = this.baseMimeTypes;
    this.features = {buffering: false,peakData: false,waveformData: false,eqData: false,movieStar: false};
    this.sandbox = {};
    this.hasHTML5 = null;
    this.html5 = {usingFlash: null};
    this.ignoreFlash = false;
    var a7, ay = this, a0, aj = navigator.userAgent, ar = b, aI = ar.location.href.toString(), aq = this.flashVersion, at = document, aL, aH, ag = [], aR = false, aQ = false, al = false, ae = false, bd = false, aP, ak, ap, ad, aY, h, aG, a5, e, a4, az, aO, aX, bf, a8, aF, aS, ac, g, aE, d, aN = null, au = null, a3, i, aW, aD, aC, f, an, aB = false, bh = false, be, a6, a2 = null, bg, aA, ai = false, aM, af, bb, a9, am, a1 = Array.prototype.slice, aK = false, aZ, aV, aU, av = aj.match(/pre\//i), ax = aj.match(/(ipad|iphone|ipod)/i);
    aj.match(/mobile/i);
    var ah = aj.match(/msie/i), ab = aj.match(/webkit/i), aJ = aj.match(/safari/i) && !aj.match(/chrome/i), aw = !aI.match(/usehtml5audio/i) && !aI.match(/sm2\-ignorebadua/i) && aJ && aj.match(/OS X 10_6_(3|4|5|6)/i), n = typeof at.hasFocus !== "undefined" ? at.hasFocus() : null, aT = typeof at.hasFocus === "undefined" && aJ, m = !aT;
    this._use_maybe = aI.match(/sm2\-useHTML5Maybe\=1/i);
    this._overHTTP = at.location ? at.location.protocol.match(/http/i) : null;
    this.useAltURL = !this._overHTTP;
    this._global_a = null;
    if (ax || av) {
      ay.useHTML5Audio = true;
      ay.ignoreFlash = true;
      if (ay.useGlobalHTML5Audio) {
        aK = true
      }
    }
    if (av || this._use_maybe) {
      ay.html5Test = /^(probably|maybe)$/i
    }
    this.supported = this.ok = function() {
      return a2 ? al && !ae : ay.useHTML5Audio && ay.hasHTML5
    };
    this.getMovie = function(j) {
      return ah ? ar[j] : aJ ? a0(j) || at[j] : a0(j)
    };
    this.createSound = function(p) {
      function j() {
        l = aD(l);
        ay.sounds[o.id] = new a7(o);
        ay.soundIDs.push(o.id);
        return ay.sounds[o.id]
      }
      var l = null, k = null, o = null;
      if (!al || !ay.ok()) {
        f("soundManager.createSound(): " + a3(!al ? "notReady" : "notOK"));
        return false
      }
      if (arguments.length === 2) {
        p = {id: arguments[0],url: arguments[1]}
      }
      o = l = ak(p);
      if (an(o.id, true)) {
        return ay.sounds[o.id]
      }
      if (aA(o)) {
        k = j();
        k._setup_html5(o)
      } else {
        if (aq > 8 && ay.useMovieStar) {
          if (o.isMovieStar === null) {
            o.isMovieStar = o.serverURL || (o.type ? o.type.match(ay.netStreamPattern) : false) || o.url.match(ay.netStreamPattern) ? true : false
          }
          if (o.isMovieStar) {
            if (o.usePeakData) {
              o.usePeakData = false
            }
          }
        }
        o = aC(o, "soundManager.createSound(): ");
        k = j();
        if (aq === 8) {
          ay.o._createSound(o.id, o.onjustbeforefinishtime, o.loops || 1, o.usePolicyFile)
        } else {
          ay.o._createSound(o.id, o.url, o.onjustbeforefinishtime, o.usePeakData, o.useWaveformData, o.useEQData, o.isMovieStar, o.isMovieStar ? o.bufferTime : false, o.loops || 1, o.serverURL, o.duration || null, o.autoPlay, true, o.autoLoad, o.usePolicyFile);
          if (!o.serverURL) {
            k.connected = true;
            o.onconnect && o.onconnect.apply(k)
          }
        }
        if ((o.autoLoad || o.autoPlay) && !o.serverURL) {
          k.load(o)
        }
      }
      o.autoPlay && !o.serverURL && k.play();
      return k
    };
    this.destroySound = function(o, j) {
      if (!an(o)) {
        return false
      }
      var l = ay.sounds[o], k;
      l._iO = {};
      l.stop();
      l.unload();
      for (k = 0; k < ay.soundIDs.length; k++) {
        if (ay.soundIDs[k] === o) {
          ay.soundIDs.splice(k, 1);
          break
        }
      }
      j || l.destruct(true);
      delete ay.sounds[o];
      return true
    };
    this.load = function(k, j) {
      if (!an(k)) {
        return false
      }
      return ay.sounds[k].load(j)
    };
    this.unload = function(j) {
      if (!an(j)) {
        return false
      }
      return ay.sounds[j].unload()
    };
    this.start = this.play = function(k, j) {
      if (!al || !ay.ok()) {
        f("soundManager.play(): " + a3(!al ? "notReady" : "notOK"));
        return false
      }
      if (!an(k)) {
        j instanceof Object || (j = {url: j});
        if (j && j.url) {
          j.id = k;
          return ay.createSound(j).play()
        } else {
          return false
        }
      }
      return ay.sounds[k].play(j)
    };
    this.setPosition = function(k, j) {
      if (!an(k)) {
        return false
      }
      return ay.sounds[k].setPosition(j)
    };
    this.stop = function(j) {
      if (!an(j)) {
        return false
      }
      return ay.sounds[j].stop()
    };
    this.stopAll = function() {
      for (var j in ay.sounds) {
        ay.sounds[j] instanceof a7 && ay.sounds[j].stop()
      }
    };
    this.pause = function(j) {
      if (!an(j)) {
        return false
      }
      return ay.sounds[j].pause()
    };
    this.pauseAll = function() {
      for (var j = ay.soundIDs.length; j--; ) {
        ay.sounds[ay.soundIDs[j]].pause()
      }
    };
    this.resume = function(j) {
      if (!an(j)) {
        return false
      }
      return ay.sounds[j].resume()
    };
    this.resumeAll = function() {
      for (var j = ay.soundIDs.length; j--; ) {
        ay.sounds[ay.soundIDs[j]].resume()
      }
    };
    this.togglePause = function(j) {
      if (!an(j)) {
        return false
      }
      return ay.sounds[j].togglePause()
    };
    this.setPan = function(k, j) {
      if (!an(k)) {
        return false
      }
      return ay.sounds[k].setPan(j)
    };
    this.setVolume = function(k, j) {
      if (!an(k)) {
        return false
      }
      return ay.sounds[k].setVolume(j)
    };
    this.mute = function(k) {
      var j = 0;
      if (typeof k !== "string") {
        k = null
      }
      if (k) {
        if (!an(k)) {
          return false
        }
        return ay.sounds[k].mute()
      } else {
        for (j = ay.soundIDs.length; j--; ) {
          ay.sounds[ay.soundIDs[j]].mute()
        }
        ay.muted = true
      }
      return true
    };
    this.muteAll = function() {
      ay.mute()
    };
    this.unmute = function(j) {
      if (typeof j !== "string") {
        j = null
      }
      if (j) {
        if (!an(j)) {
          return false
        }
        return ay.sounds[j].unmute()
      } else {
        for (j = ay.soundIDs.length; j--; ) {
          ay.sounds[ay.soundIDs[j]].unmute()
        }
        ay.muted = false
      }
      return true
    };
    this.unmuteAll = function() {
      ay.unmute()
    };
    this.toggleMute = function(j) {
      if (!an(j)) {
        return false
      }
      return ay.sounds[j].toggleMute()
    };
    this.getMemoryUse = function() {
      if (aq === 8) {
        return 0
      }
      if (ay.o) {
        return parseInt(ay.o._getMemoryUse(), 10)
      }
    };
    this.disable = function(k) {
      if (typeof k === "undefined") {
        k = false
      }
      if (ae) {
        return false
      }
      ae = true;
      for (var j = ay.soundIDs.length; j--; ) {
        g(ay.sounds[ay.soundIDs[j]])
      }
      aP(k);
      am.remove(ar, "load", aY);
      return true
    };
    this.canPlayMIME = function(k) {
      var j;
      if (ay.hasHTML5) {
        j = aM({type: k})
      }
      return !a2 || j ? j : k ? k.match(ay.mimePattern) ? true : false : null
    };
    this.canPlayURL = function(k) {
      var j;
      if (ay.hasHTML5) {
        j = aM(k)
      }
      return !a2 || j ? j : k ? k.match(ay.filePattern) ? true : false : null
    };
    this.canPlayLink = function(j) {
      if (typeof j.type !== "undefined" && j.type) {
        if (ay.canPlayMIME(j.type)) {
          return true
        }
      }
      return ay.canPlayURL(j.href)
    };
    this.getSoundById = function(j) {
      if (!j) {
        throw Error("soundManager.getSoundById(): sID is null/undefined")
      }
      return ay.sounds[j]
    };
    this.onready = function(k, j) {
      if (k && k instanceof Function) {
        j || (j = ar);
        ap("onready", k, j);
        ad();
        return true
      } else {
        throw a3("needFunction", "onready")
      }
    };
    this.ontimeout = function(k, j) {
      if (k && k instanceof Function) {
        j || (j = ar);
        ap("ontimeout", k, j);
        ad({type: "ontimeout"});
        return true
      } else {
        throw a3("needFunction", "ontimeout")
      }
    };
    this.getMoviePercent = function() {
      return ay.o && typeof ay.o.PercentLoaded !== "undefined" ? ay.o.PercentLoaded() : null
    };
    this._wD = this._writeDebug = function() {
      return true
    };
    this._debug = function() {
    };
    this.reboot = function() {
      var l, j;
      for (l = ay.soundIDs.length; l--; ) {
        ay.sounds[ay.soundIDs[l]].destruct()
      }
      try {
        if (ah) {
          au = ay.o.innerHTML
        }
        aN = ay.o.parentNode.removeChild(ay.o)
      } catch (k) {
      }
      au = aN = null;
      ay.enabled = al = aB = bh = aR = aQ = ae = ay.swfLoaded = false;
      ay.soundIDs = ay.sounds = [];
      ay.o = null;
      for (l in ag) {
        if (ag.hasOwnProperty(l)) {
          for (j = ag[l].length; j--; ) {
            ag[l][j].fired = false
          }
        }
      }
      ar.setTimeout(function() {
        ay.beginDelayedInit()
      }, 20)
    };
    this.destruct = function() {
      ay.disable(true)
    };
    this.beginDelayedInit = function() {
      bd = true;
      aX();
      setTimeout(az, 20);
      aG()
    };
    this._html5_events = {abort: ao(function() {
      }),canplay: ao(function() {
        this._t._onbufferchange(0);
        var k = !isNaN(this._t.position) ? this._t.position / 1000 : null;
        this._t._html5_canplay = true;
        if (this._t.position && this.currentTime !== k) {
          try {
            this.currentTime = k
          } catch (j) {
          }
        }
      }),load: ao(function() {
        if (!this._t.loaded) {
          this._t._onbufferchange(0);
          this._t._whileloading(this._t.bytesTotal, this._t.bytesTotal, this._t._get_html5_duration());
          this._t._onload(true)
        }
      }),emptied: ao(function() {
      }),ended: ao(function() {
        this._t._onfinish()
      }),error: ao(function() {
        this._t._onload(false)
      }),loadeddata: ao(function() {
      }),loadedmetadata: ao(function() {
      }),loadstart: ao(function() {
        this._t._onbufferchange(1)
      }),play: ao(function() {
        this._t._onbufferchange(0)
      }),playing: ao(function() {
        this._t._onbufferchange(0)
      }),progress: ao(function(q) {
        if (this._t.loaded) {
          return false
        }
        var j, l = 0, k = q.type === "progress", o = q.target.buffered;
        j = q.loaded || 0;
        var p = q.total || 1;
        if (o && o.length) {
          for (j = o.length; j--; ) {
            l = o.end(j) - o.start(j)
          }
          j = l / q.target.duration;
          k && isNaN(j)
        }
        if (!isNaN(j)) {
          this._t._onbufferchange(0);
          this._t._whileloading(j, p, this._t._get_html5_duration());
          j && p && j === p && ay._html5_events.load.call(this, q)
        }
      }),ratechange: ao(function() {
      }),suspend: ao(function(j) {
        ay._html5_events.progress.call(this, j)
      }),stalled: ao(function() {
      }),timeupdate: ao(function() {
        this._t._onTimer()
      }),waiting: ao(function() {
        this._t._onbufferchange(1)
      })};
    a7 = function(p) {
      var j = this, l, k, o;
      this.sID = p.id;
      this.url = p.url;
      this._iO = this.instanceOptions = this.options = ak(p);
      this.pan = this.options.pan;
      this.volume = this.options.volume;
      this._lastURL = null;
      this.isHTML5 = false;
      this._a = null;
      this.id3 = {};
      this._debug = function() {
      };
      this._debug();
      this.load = function(s) {
        var r = null;
        if (typeof s !== "undefined") {
          j._iO = ak(s);
          j.instanceOptions = j._iO
        } else {
          s = j.options;
          j._iO = s;
          j.instanceOptions = j._iO;
          if (j._lastURL && j._lastURL !== j.url) {
            j._iO.url = j.url;
            j.url = null
          }
        }
        if (!j._iO.url) {
          j._iO.url = j.url
        }
        if (j._iO.url === j.url && j.readyState !== 0 && j.readyState !== 2) {
          return j
        }
        j._lastURL = j.url;
        j.loaded = false;
        j.readyState = 1;
        j.playState = 0;
        if (aA(j._iO)) {
          r = j._setup_html5(j._iO);
          if (!r._called_load) {
            r.load();
            r._called_load = true;
            j._iO.autoPlay && j.play()
          }
        } else {
          try {
            j.isHTML5 = false;
            j._iO = aC(aD(j._iO));
            aq === 8 ? ay.o._load(j.sID, j._iO.url, j._iO.stream, j._iO.autoPlay, j._iO.whileloading ? 1 : 0, j._iO.loops || 1, j._iO.usePolicyFile) : ay.o._load(j.sID, j._iO.url, j._iO.stream ? true : false, j._iO.autoPlay ? true : false, j._iO.loops || 1, j._iO.autoLoad ? true : false, j._iO.usePolicyFile)
          } catch (q) {
            aS()
          }
        }
        return j
      };
      this.unload = function() {
        if (j.readyState !== 0) {
          if (j.isHTML5) {
            k();
            if (j._a) {
              j._a.pause();
              j._a.src = ""
            }
          } else {
            aq === 8 ? ay.o._unload(j.sID, ay.nullURL) : ay.o._unload(j.sID)
          }
          l()
        }
        return j
      };
      this.destruct = function(q) {
        if (j.isHTML5) {
          k();
          if (j._a) {
            j._a.pause();
            j._a.src = "";
            aK || j._remove_html5_events()
          }
        } else {
          j._iO.onfailure = null;
          ay.o._destroySound(j.sID)
        }
        q || ay.destroySound(j.sID, true)
      };
      this.start = this.play = function(s, r) {
        var q;
        r = r === undefined ? true : r;
        s || (s = {});
        j._iO = ak(s, j._iO);
        j._iO = ak(j._iO, j.options);
        j.instanceOptions = j._iO;
        if (j._iO.serverURL) {
          if (!j.connected) {
            j.getAutoPlay() || j.setAutoPlay(true);
            return j
          }
        }
        if (aA(j._iO)) {
          j._setup_html5(j._iO);
          o()
        }
        if (j.playState === 1 && !j.paused) {
          if (q = j._iO.multiShot) {
            j.isHTML5 && j.setPosition(j._iO.position)
          } else {
            return j
          }
        }
        if (!j.loaded) {
          if (j.readyState === 0) {
            if (!j.isHTML5) {
              j._iO.autoPlay = true
            }
            j.load(j._iO)
          } else {
            if (j.readyState === 2) {
              return j
            }
          }
        }
        if (j.paused && j.position && j.position > 0) {
          j.resume()
        } else {
          j.playState = 1;
          j.paused = false;
          if (!j.instanceCount || j._iO.multiShotEvents || aq > 8 && !j.isHTML5 && !j.getAutoPlay()) {
            j.instanceCount++
          }
          j.position = typeof j._iO.position !== "undefined" && !isNaN(j._iO.position) ? j._iO.position : 0;
          if (!j.isHTML5) {
            j._iO = aC(aD(j._iO))
          }
          if (j._iO.onplay && r) {
            j._iO.onplay.apply(j);
            j._onplay_called = true
          }
          j.setVolume(j._iO.volume, true);
          j.setPan(j._iO.pan, true);
          if (j.isHTML5) {
            o();
            j._setup_html5().play()
          } else {
            ay.o._start(j.sID, j._iO.loops || 1, aq === 9 ? j.position : j.position / 1000)
          }
        }
        return j
      };
      this.stop = function(q) {
        if (j.playState === 1) {
          j._onbufferchange(0);
          j.resetOnPosition(0);
          if (!j.isHTML5) {
            j.playState = 0
          }
          j.paused = false;
          j._iO.onstop && j._iO.onstop.apply(j);
          if (j.isHTML5) {
            if (j._a) {
              j.setPosition(0);
              j._a.pause();
              j.playState = 0;
              j._onTimer();
              k();
              j.unload()
            }
          } else {
            ay.o._stop(j.sID, q);
            j._iO.serverURL && j.unload()
          }
          j.instanceCount = 0;
          j._iO = {}
        }
        return j
      };
      this.setAutoPlay = function(q) {
        j._iO.autoPlay = q;
        if (j.isHTML5) {
          j._a && q && j.play()
        } else {
          ay.o._setAutoPlay(j.sID, q)
        }
        q && !j.instanceCount && j.readyState === 1 && j.instanceCount++
      };
      this.getAutoPlay = function() {
        return j._iO.autoPlay
      };
      this.setPosition = function(s) {
        if (s === undefined) {
          s = 0
        }
        var r = j.isHTML5 ? Math.max(s, 0) : Math.min(j.duration || j._iO.duration, Math.max(s, 0));
        j.position = r;
        s = j.position / 1000;
        j.resetOnPosition(j.position);
        j._iO.position = r;
        if (j.isHTML5) {
          if (j._a) {
            if (j._html5_canplay) {
              if (j._a.currentTime !== s) {
                try {
                  j._a.currentTime = s
                } catch (q) {
                }
              }
            }
          }
        } else {
          s = aq === 9 ? j.position : s;
          if (j.readyState && j.readyState !== 2) {
            ay.o._setPosition(j.sID, s, j.paused || !j.playState)
          }
        }
        j.isHTML5 && j.paused && j._onTimer(true);
        return j
      };
      this.pause = function(q) {
        if (j.paused || j.playState === 0 && j.readyState !== 1) {
          return j
        }
        j.paused = true;
        if (j.isHTML5) {
          j._setup_html5().pause();
          k()
        } else {
          if (q || q === undefined) {
            ay.o._pause(j.sID)
          }
        }
        j._iO.onpause && j._iO.onpause.apply(j);
        return j
      };
      this.resume = function() {
        if (!j.paused) {
          return j
        }
        j.paused = false;
        j.playState = 1;
        if (j.isHTML5) {
          j._setup_html5().play();
          o()
        } else {
          j._iO.isMovieStar && j.setPosition(j.position);
          ay.o._pause(j.sID)
        }
        if (!j._onplay_called && j._iO.onplay) {
          j._iO.onplay.apply(j);
          j._onplay_called = true
        } else {
          j._iO.onresume && j._iO.onresume.apply(j)
        }
        return j
      };
      this.togglePause = function() {
        if (j.playState === 0) {
          j.play({position: aq === 9 && !j.isHTML5 ? j.position : j.position / 1000});
          return j
        }
        j.paused ? j.resume() : j.pause();
        return j
      };
      this.setPan = function(r, q) {
        if (typeof r === "undefined") {
          r = 0
        }
        if (typeof q === "undefined") {
          q = false
        }
        j.isHTML5 || ay.o._setPan(j.sID, r);
        j._iO.pan = r;
        if (!q) {
          j.pan = r
        }
        return j
      };
      this.setVolume = function(r, q) {
        if (typeof r === "undefined") {
          r = 100
        }
        if (typeof q === "undefined") {
          q = false
        }
        if (j.isHTML5) {
          if (j._a) {
            j._a.volume = r / 100
          }
        } else {
          ay.o._setVolume(j.sID, ay.muted && !j.muted || j.muted ? 0 : r)
        }
        j._iO.volume = r;
        if (!q) {
          j.volume = r
        }
        return j
      };
      this.mute = function() {
        j.muted = true;
        if (j.isHTML5) {
          if (j._a) {
            j._a.muted = true
          }
        } else {
          ay.o._setVolume(j.sID, 0)
        }
        return j
      };
      this.unmute = function() {
        j.muted = false;
        var q = typeof j._iO.volume !== "undefined";
        if (j.isHTML5) {
          if (j._a) {
            j._a.muted = false
          }
        } else {
          ay.o._setVolume(j.sID, q ? j._iO.volume : j.options.volume)
        }
        return j
      };
      this.toggleMute = function() {
        return j.muted ? j.unmute() : j.mute()
      };
      this.onposition = function(s, r, q) {
        j._onPositionItems.push({position: s,method: r,scope: typeof q !== "undefined" ? q : j,fired: false});
        return j
      };
      this.processOnPosition = function() {
        var r, q;
        r = j._onPositionItems.length;
        if (!r || !j.playState || j._onPositionFired >= r) {
          return false
        }
        for (r = r; r--; ) {
          q = j._onPositionItems[r];
          if (!q.fired && j.position >= q.position) {
            q.method.apply(q.scope, [q.position]);
            q.fired = true;
            ay._onPositionFired++
          }
        }
        return true
      };
      this.resetOnPosition = function(s) {
        var r, q;
        r = j._onPositionItems.length;
        if (!r) {
          return false
        }
        for (r = r; r--; ) {
          q = j._onPositionItems[r];
          if (q.fired && s <= q.position) {
            q.fired = false;
            ay._onPositionFired--
          }
        }
        return true
      };
      this._onTimer = function(r) {
        var q = {};
        if (j._hasTimer || r) {
          if (j._a && (r || (j.playState > 0 || j.readyState === 1) && !j.paused)) {
            j.duration = j._get_html5_duration();
            j.durationEstimate = j.duration;
            r = j._a.currentTime ? j._a.currentTime * 1000 : 0;
            j._whileplaying(r, q, q, q, q);
            return true
          } else {
            return false
          }
        }
      };
      this._get_html5_duration = function() {
        var q = j._a ? j._a.duration * 1000 : j._iO ? j._iO.duration : undefined;
        return q && !isNaN(q) && q !== Infinity ? q : j._iO ? j._iO.duration : null
      };
      o = function() {
        j.isHTML5 && be(j)
      };
      k = function() {
        j.isHTML5 && a6(j)
      };
      l = function() {
        j._onPositionItems = [];
        j._onPositionFired = 0;
        j._hasTimer = null;
        j._onplay_called = false;
        j._a = null;
        j._html5_canplay = false;
        j.bytesLoaded = null;
        j.bytesTotal = null;
        j.position = null;
        j.duration = j._iO && j._iO.duration ? j._iO.duration : null;
        j.durationEstimate = null;
        j.failures = 0;
        j.loaded = false;
        j.playState = 0;
        j.paused = false;
        j.readyState = 0;
        j.muted = false;
        j.didBeforeFinish = false;
        j.didJustBeforeFinish = false;
        j.isBuffering = false;
        j.instanceOptions = {};
        j.instanceCount = 0;
        j.peakData = {left: 0,right: 0};
        j.waveformData = {left: [],right: []};
        j.eqData = [];
        j.eqData.left = [];
        j.eqData.right = []
      };
      l();
      this._setup_html5 = function(s) {
        s = ak(j._iO, s);
        var r = aK ? ay._global_a : j._a;
        decodeURI(s.url);
        var q = r && r._t ? r._t.instanceOptions : null;
        if (r) {
          if (r._t && q.url === s.url) {
            return r
          }
          aK && r._t.playState && r._t && s.url !== q.url && r._t.stop();
          l();
          r.src = s.url
        } else {
          r = new Audio(s.url);
          if (aK) {
            ay._global_a = r
          }
        }
        r._called_load = false;
        j.isHTML5 = true;
        j._a = r;
        r._t = j;
        j._add_html5_events();
        r.loop = s.loops > 1 ? "loop" : "";
        if (s.autoLoad || s.autoPlay) {
          r.autobuffer = "auto";
          r.preload = "auto";
          j.load()
        } else {
          r.autobuffer = false;
          r.preload = "none"
        }
        r.loop = s.loops > 1 ? "loop" : "";
        return r
      };
      this._add_html5_events = function() {
        if (j._a._added_events) {
          return false
        }
        var q;
        j._a._added_events = true;
        for (q in ay._html5_events) {
          ay._html5_events.hasOwnProperty(q) && j._a && j._a.addEventListener(q, ay._html5_events[q], false)
        }
        return true
      };
      this._remove_html5_events = function() {
        j._a._added_events = false;
        for (var q in ay._html5_events) {
          ay._html5_events.hasOwnProperty(q) && j._a && j._a.removeEventListener(q, ay._html5_events[q], false)
        }
      };
      this._whileloading = function(t, s, r, q) {
        j.bytesLoaded = t;
        j.bytesTotal = s;
        j.duration = Math.floor(r);
        j.bufferLength = q;
        if (j._iO.isMovieStar) {
          j.durationEstimate = j.duration
        } else {
          j.durationEstimate = j._iO.duration ? j.duration > j._iO.duration ? j.duration : j._iO.duration : parseInt(j.bytesTotal / j.bytesLoaded * j.duration, 10);
          if (j.durationEstimate === undefined) {
            j.durationEstimate = j.duration
          }
        }
        j.readyState !== 3 && j._iO.whileloading && j._iO.whileloading.apply(j)
      };
      this._onid3 = function(t, s) {
        var r = [], q, u;
        q = 0;
        for (u = t.length; q < u; q++) {
          r[t[q]] = s[q]
        }
        j.id3 = ak(j.id3, r);
        j._iO.onid3 && j._iO.onid3.apply(j)
      };
      this._whileplaying = function(t, s, r, q, u) {
        if (isNaN(t) || t === null) {
          return false
        }
        if (j.playState === 0 && t > 0) {
          t = 0
        }
        j.position = t;
        j.processOnPosition();
        if (aq > 8 && !j.isHTML5) {
          if (j._iO.usePeakData && typeof s !== "undefined" && s) {
            j.peakData = {left: s.leftPeak,right: s.rightPeak}
          }
          if (j._iO.useWaveformData && typeof r !== "undefined" && r) {
            j.waveformData = {left: r.split(","),right: q.split(",")}
          }
          if (j._iO.useEQData) {
            if (typeof u !== "undefined" && u && u.leftEQ) {
              t = u.leftEQ.split(",");
              j.eqData = t;
              j.eqData.left = t;
              if (typeof u.rightEQ !== "undefined" && u.rightEQ) {
                j.eqData.right = u.rightEQ.split(",")
              }
            }
          }
        }
        if (j.playState === 1) {
          !j.isHTML5 && ay.flashVersion === 8 && !j.position && j.isBuffering && j._onbufferchange(0);
          j._iO.whileplaying && j._iO.whileplaying.apply(j);
          if ((j.loaded || !j.loaded && j._iO.isMovieStar) && j._iO.onbeforefinish && j._iO.onbeforefinishtime && !j.didBeforeFinish && j.duration - j.position <= j._iO.onbeforefinishtime) {
            j._onbeforefinish()
          }
        }
        return true
      };
      this._onconnect = function(q) {
        q = q === 1;
        if (j.connected = q) {
          j.failures = 0;
          if (an(j.sID)) {
            if (j.getAutoPlay()) {
              j.play(undefined, j.getAutoPlay())
            } else {
              j._iO.autoLoad && j.load()
            }
          }
          j._iO.onconnect && j._iO.onconnect.apply(j, [q])
        }
      };
      this._onload = function(q) {
        q = q ? true : false;
        j.loaded = q;
        j.readyState = q ? 3 : 2;
        j._onbufferchange(0);
        j._iO.onload && j._iO.onload.apply(j, [q]);
        return true
      };
      this._onfailure = function(s, r, q) {
        j.failures++;
        j._iO.onfailure && j.failures === 1 && j._iO.onfailure(j, s, r, q)
      };
      this._onbeforefinish = function() {
        if (!j.didBeforeFinish) {
          j.didBeforeFinish = true;
          j._iO.onbeforefinish && j._iO.onbeforefinish.apply(j)
        }
      };
      this._onjustbeforefinish = function() {
        if (!j.didJustBeforeFinish) {
          j.didJustBeforeFinish = true;
          j._iO.onjustbeforefinish && j._iO.onjustbeforefinish.apply(j)
        }
      };
      this._onfinish = function() {
        var q = j._iO.onfinish;
        j._onbufferchange(0);
        j.resetOnPosition(0);
        j._iO.onbeforefinishcomplete && j._iO.onbeforefinishcomplete.apply(j);
        j.didBeforeFinish = false;
        j.didJustBeforeFinish = false;
        if (j.instanceCount) {
          j.instanceCount--;
          if (!j.instanceCount) {
            j.playState = 0;
            j.paused = false;
            j.instanceCount = 0;
            j.instanceOptions = {};
            j._iO = {};
            k()
          }
          if (!j.instanceCount || j._iO.multiShotEvents) {
            q && q.apply(j)
          }
        }
      };
      this._onbufferchange = function(q) {
        if (j.playState === 0) {
          return false
        }
        if (q && j.isBuffering || !q && !j.isBuffering) {
          return false
        }
        j.isBuffering = q === 1;
        j._iO.onbufferchange && j._iO.onbufferchange.apply(j);
        return true
      };
      this._ondataerror = function() {
        j.playState > 0 && j._iO.ondataerror && j._iO.ondataerror.apply(j)
      }
    };
    a8 = function() {
      return at.body ? at.body : at._docElement ? at.documentElement : at.getElementsByTagName("div")[0]
    };
    a0 = function(j) {
      return at.getElementById(j)
    };
    ak = function(p, j) {
      var l = {}, k, o;
      for (k in p) {
        if (p.hasOwnProperty(k)) {
          l[k] = p[k]
        }
      }
      k = typeof j === "undefined" ? ay.defaultOptions : j;
      for (o in k) {
        if (k.hasOwnProperty(o) && typeof l[o] === "undefined") {
          l[o] = k[o]
        }
      }
      return l
    };
    am = function() {
      function o(p) {
        p = a1.call(p);
        var q = p.length;
        if (l) {
          p[1] = "on" + p[1];
          q > 3 && p.pop()
        } else {
          q === 3 && p.push(false)
        }
        return p
      }
      function j(r, s) {
        var q = r.shift(), p = [k[s]];
        l ? q[p](r[0], r[1]) : q[p].apply(q, r)
      }
      var l = ar.attachEvent, k = {add: l ? "attachEvent" : "addEventListener",remove: l ? "detachEvent" : "removeEventListener"};
      return {add: function() {
          j(o(arguments), "add")
        },remove: function() {
          j(o(arguments), "remove")
        }}
    }();
    aA = function(j) {
      return !j.serverURL && (j.type ? aM({type: j.type}) : aM(j.url) || ai)
    };
    aM = function(l) {
      if (!ay.useHTML5Audio || !ay.hasHTML5) {
        return false
      }
      var j, k = ay.audioFormats;
      if (!af) {
        af = [];
        for (j in k) {
          if (k.hasOwnProperty(j)) {
            af.push(j);
            if (k[j].related) {
              af = af.concat(k[j].related)
            }
          }
        }
        af = RegExp("\\.(" + af.join("|") + ")", "i")
      }
      j = typeof l.type !== "undefined" ? l.type : null;
      l = typeof l === "string" ? l.toLowerCase().match(af) : null;
      if (!l || !l.length) {
        if (j) {
          l = j.indexOf(";");
          l = (l !== -1 ? j.substr(0, l) : j).substr(6)
        } else {
          return false
        }
      } else {
        l = l[0].substr(1)
      }
      if (l && typeof ay.html5[l] !== "undefined") {
        return ay.html5[l]
      } else {
        if (!j) {
          if (l && ay.html5[l]) {
            return ay.html5[l]
          } else {
            j = "audio/" + l
          }
        }
        j = ay.html5.canPlayType(j);
        return ay.html5[l] = j
      }
    };
    a9 = function() {
      function q(t) {
        var s, r, u = false;
        if (!j || typeof j.canPlayType !== "function") {
          return false
        }
        if (t instanceof Array) {
          s = 0;
          for (r = t.length; s < r && !u; s++) {
            if (ay.html5[t[s]] || j.canPlayType(t[s]).match(ay.html5Test)) {
              u = true;
              ay.html5[t[s]] = true
            }
          }
          return u
        } else {
          return (t = j && typeof j.canPlayType === "function" ? j.canPlayType(t) : false) && (t.match(ay.html5Test) ? true : false)
        }
      }
      if (!ay.useHTML5Audio || typeof Audio === "undefined") {
        return false
      }
      var j = typeof Audio !== "undefined" ? new Audio(null) : null, l, k = {}, o, p;
      aV();
      o = ay.audioFormats;
      for (l in o) {
        if (o.hasOwnProperty(l)) {
          k[l] = q(o[l].type);
          if (o[l] && o[l].related) {
            for (p = o[l].related.length; p--; ) {
              ay.html5[o[l].related[p]] = k[l]
            }
          }
        }
      }
      k.canPlayType = j ? q : null;
      ay.html5 = ak(ay.html5, k);
      return true
    };
    a3 = function() {
    };
    aD = function(j) {
      if (aq === 8 && j.loops > 1 && j.stream) {
        j.stream = false
      }
      return j
    };
    aC = function(j) {
      if (j && !j.usePolicyFile && (j.onid3 || j.usePeakData || j.useWaveformData || j.useEQData)) {
        j.usePolicyFile = true
      }
      return j
    };
    f = function(j) {
      typeof console !== "undefined" && typeof console.warn !== "undefined" && console.warn(j)
    };
    aL = function() {
      return false
    };
    g = function(k) {
      for (var j in k) {
        if (k.hasOwnProperty(j) && typeof k[j] === "function") {
          k[j] = aL
        }
      }
    };
    aE = function(j) {
      if (typeof j === "undefined") {
        j = false
      }
      if (ae || j) {
        ay.disable(j)
      }
    };
    d = function(k) {
      var j = null;
      if (k) {
        if (k.match(/\.swf(\?.*)?$/i)) {
          if (j = k.substr(k.toLowerCase().lastIndexOf(".swf?") + 4)) {
            return k
          }
        } else {
          if (k.lastIndexOf("/") !== k.length - 1) {
            k += "/"
          }
        }
      }
      return (k && k.lastIndexOf("/") !== -1 ? k.substr(0, k.lastIndexOf("/") + 1) : "./") + ay.movieURL
    };
    e = function() {
      if (aq !== 8 && aq !== 9) {
        ay.flashVersion = 8
      }
      var j = ay.debugMode || ay.debugFlash ? "_debug.swf" : ".swf";
      if (ay.useHTML5Audio && !ai && ay.audioFormats.mp4.required && ay.flashVersion < 9) {
        ay.flashVersion = 9
      }
      aq = ay.flashVersion;
      ay.version = ay.versionNumber + (ai ? " (HTML5-only mode)" : aq === 9 ? " (AS3/Flash 9)" : " (AS2/Flash 8)");
      if (aq > 8) {
        ay.defaultOptions = ak(ay.defaultOptions, ay.flash9Options);
        ay.features.buffering = true
      }
      if (aq > 8 && ay.useMovieStar) {
        ay.defaultOptions = ak(ay.defaultOptions, ay.movieStarOptions);
        ay.filePatterns.flash9 = RegExp("\\.(mp3|" + ay.netStreamTypes.join("|") + ")(\\?.*)?$", "i");
        ay.mimePattern = ay.netStreamMimeTypes;
        ay.features.movieStar = true
      } else {
        ay.useMovieStar = false;
        ay.features.movieStar = false
      }
      ay.filePattern = ay.filePatterns[aq !== 8 ? "flash9" : "flash8"];
      ay.movieURL = (aq === 8 ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", j);
      ay.features.peakData = ay.features.waveformData = ay.features.eqData = aq > 8
    };
    ac = function(k, j) {
      if (!ay.o || !ay.allowPolling) {
        return false
      }
      ay.o._setPolling(k, j)
    };
    aF = function(u, v) {
      var q = v ? v : ay.url, p = ay.altURL ? ay.altURL : q, s;
      s = a8();
      var t, r, o = aW(), k, j = null;
      j = (j = at.getElementsByTagName("html")[0]) && j.dir && j.dir.match(/rtl/i);
      u = typeof u === "undefined" ? ay.id : u;
      if (aR && aQ) {
        return false
      }
      if (ai) {
        e();
        ay.oMC = a0(ay.movieID);
        aH();
        aQ = aR = true;
        return false
      }
      aR = true;
      e();
      ay.url = d(ay._overHTTP ? q : p);
      v = ay.url;
      ay.wmode = !ay.wmode && ay.useHighPerformance && !ay.useMovieStar ? "transparent" : ay.wmode;
      if (ay.wmode !== null && (aj.match(/msie 8/i) || !ah && !ay.useHighPerformance) && navigator.platform.match(/win32|win64/i)) {
        ay.specialWmodeCase = true;
        ay.wmode = null
      }
      s = {name: u,id: u,src: v,width: "100%",height: "100%",quality: "high",allowScriptAccess: ay.allowScriptAccess,bgcolor: ay.bgColor,pluginspage: "http://www.macromedia.com/go/getflashplayer",type: "application/x-shockwave-flash",wmode: ay.wmode,hasPriority: "true"};
      if (ay.debugFlash) {
        s.FlashVars = "debug=1"
      }
      ay.wmode || delete s.wmode;
      if (ah) {
        q = at.createElement("div");
        r = '<object id="' + u + '" data="' + v + '" type="' + s.type + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" width="' + s.width + '" height="' + s.height + '"><param name="movie" value="' + v + '" /><param name="AllowScriptAccess" value="' + ay.allowScriptAccess + '" /><param name="quality" value="' + s.quality + '" />' + (ay.wmode ? '<param name="wmode" value="' + ay.wmode + '" /> ' : "") + '<param name="bgcolor" value="' + ay.bgColor + '" />' + (ay.debugFlash ? '<param name="FlashVars" value="' + s.FlashVars + '" />' : "") + "</object>"
      } else {
        q = at.createElement("embed");
        for (t in s) {
          s.hasOwnProperty(t) && q.setAttribute(t, s[t])
        }
      }
      bj();
      o = aW();
      if (s = a8()) {
        ay.oMC = a0(ay.movieID) ? a0(ay.movieID) : at.createElement("div");
        if (ay.oMC.id) {
          k = ay.oMC.className;
          ay.oMC.className = (k ? k + " " : ay.swfCSS.swfDefault) + (o ? " " + o : "");
          ay.oMC.appendChild(q);
          if (ah) {
            t = ay.oMC.appendChild(at.createElement("div"));
            t.className = ay.swfCSS.swfBox;
            t.innerHTML = r
          }
          aQ = true
        } else {
          ay.oMC.id = ay.movieID;
          ay.oMC.className = ay.swfCSS.swfDefault + " " + o;
          t = o = null;
          if (!ay.useFlashBlock) {
            if (ay.useHighPerformance) {
              o = {position: "fixed",width: "8px",height: "8px",bottom: "0px",left: "0px",overflow: "hidden"}
            } else {
              o = {position: "absolute",width: "6px",height: "6px",top: "-9999px",left: "-9999px"};
              if (j) {
                o.left = Math.abs(parseInt(o.left, 10)) + "px"
              }
            }
          }
          if (ab) {
            ay.oMC.style.zIndex = 10000
          }
          if (!ay.debugFlash) {
            for (k in o) {
              if (o.hasOwnProperty(k)) {
                ay.oMC.style[k] = o[k]
              }
            }
          }
          try {
            ah || ay.oMC.appendChild(q);
            s.appendChild(ay.oMC);
            if (ah) {
              t = ay.oMC.appendChild(at.createElement("div"));
              t.className = ay.swfCSS.swfBox;
              t.innerHTML = r
            }
            aQ = true
          } catch (l) {
            throw Error(a3("appXHTML"))
          }
        }
      }
      return true
    };
    an = this.getSoundById;
    aO = function() {
      if (ai) {
        aF();
        return false
      }
      if (ay.o) {
        return false
      }
      ay.o = ay.getMovie(ay.id);
      if (!ay.o) {
        if (aN) {
          if (ah) {
            ay.oMC.innerHTML = au
          } else {
            ay.oMC.appendChild(aN)
          }
          aN = null;
          aR = true
        } else {
          aF(ay.id, ay.url)
        }
        ay.o = ay.getMovie(ay.id)
      }
      ay.oninitmovie instanceof Function && setTimeout(ay.oninitmovie, 1);
      return true
    };
    h = function(j) {
      if (j) {
        ay.url = j
      }
      aO()
    };
    aG = function() {
      setTimeout(a5, 500)
    };
    a5 = function() {
      if (aB) {
        return false
      }
      aB = true;
      am.remove(ar, "load", aG);
      if (aT && !n) {
        return false
      }
      var j;
      al || (j = ay.getMoviePercent());
      setTimeout(function() {
        j = ay.getMoviePercent();
        if (!al && m) {
          if (j === null) {
            if (ay.useFlashBlock || ay.flashLoadTimeout === 0) {
              ay.useFlashBlock && i()
            } else {
              aE(true)
            }
          } else {
            ay.flashLoadTimeout !== 0 && aE(true)
          }
        }
      }, ay.flashLoadTimeout)
    };
    h = function(j) {
      if (j) {
        ay.url = j
      }
      aO()
    };
    aW = function() {
      var j = [];
      ay.debugMode && j.push(ay.swfCSS.sm2Debug);
      ay.debugFlash && j.push(ay.swfCSS.flashDebug);
      ay.useHighPerformance && j.push(ay.swfCSS.highPerf);
      return j.join(" ")
    };
    i = function() {
      a3("fbHandler");
      var k = ay.getMoviePercent(), j = ay.swfCSS;
      if (ay.ok()) {
        if (ay.oMC) {
          ay.oMC.className = [aW(), j.swfDefault, j.swfLoaded + (ay.didFlashBlock ? " " + j.swfUnblocked : "")].join(" ")
        }
      } else {
        if (a2) {
          ay.oMC.className = aW() + " " + j.swfDefault + " " + (k === null ? j.swfTimedout : j.swfError)
        }
        ay.didFlashBlock = true;
        ad({type: "ontimeout",ignoreInit: true});
        ay.onerror instanceof Function && ay.onerror.apply(ar)
      }
    };
    a4 = function() {
      function j() {
        am.remove(ar, "focus", a4);
        am.remove(ar, "load", a4)
      }
      if (n || !aT) {
        j();
        return true
      }
      n = m = true;
      aJ && aT && am.remove(ar, "mousemove", a4);
      aB = false;
      j();
      return true
    };
    aP = function(j) {
      if (al) {
        return false
      }
      if (ai) {
        al = true;
        ad();
        aY();
        return true
      }
      ay.useFlashBlock && ay.flashLoadTimeout && !ay.getMoviePercent() || (al = true);
      if (ae || j) {
        if (ay.useFlashBlock) {
          ay.oMC.className = aW() + " " + (ay.getMoviePercent() === null ? ay.swfCSS.swfTimedout : ay.swfCSS.swfError)
        }
        ad({type: "ontimeout"});
        ay.onerror instanceof Function && ay.onerror.apply(ar);
        return false
      }
      am.add(ar, "unload", aL);
      if (ay.waitForWindowLoad && !bd) {
        am.add(ar, "load", aY);
        return false
      } else {
        aY()
      }
      return true
    };
    ap = function(l, j, k) {
      if (typeof ag[l] === "undefined") {
        ag[l] = []
      }
      ag[l].push({method: j,scope: k || null,fired: false})
    };
    ad = function(p) {
      p || (p = {type: "onready"});
      if (!al && p && !p.ignoreInit) {
        return false
      }
      var j = {success: p && p.ignoreInit ? ay.ok() : !ae}, l = p && p.type ? ag[p.type] || [] : [];
      p = [];
      var k, o = a2 && ay.useFlashBlock && !ay.ok();
      for (k = 0; k < l.length; k++) {
        l[k].fired !== true && p.push(l[k])
      }
      if (p.length) {
        k = 0;
        for (l = p.length; k < l; k++) {
          p[k].scope ? p[k].method.apply(p[k].scope, [j]) : p[k].method(j);
          if (!o) {
            p[k].fired = true
          }
        }
      }
      return true
    };
    aY = function() {
      ar.setTimeout(function() {
        ay.useFlashBlock && i();
        ad();
        ay.onload instanceof Function && ay.onload.apply(ar);
        ay.waitForWindowLoad && am.add(ar, "load", aY)
      }, 1)
    };
    aV = function() {
      if (aZ !== undefined) {
        return aZ
      }
      var q = false, j = navigator, l = j.plugins, k, o = ar.ActiveXObject;
      if (l && l.length) {
        if ((j = j.mimeTypes) && j["application/x-shockwave-flash"] && j["application/x-shockwave-flash"].enabledPlugin && j["application/x-shockwave-flash"].enabledPlugin.description) {
          q = true
        }
      } else {
        if (typeof o !== "undefined") {
          try {
            k = new o("ShockwaveFlash.ShockwaveFlash")
          } catch (p) {
          }
          q = !!k
        }
      }
      return aZ = q
    };
    bg = function() {
      var k, j;
      if (aj.match(/iphone os (1|2|3_0|3_1)/i) ? true : false) {
        ay.hasHTML5 = false;
        ai = true;
        if (ay.oMC) {
          ay.oMC.style.display = "none"
        }
        return false
      }
      if (ay.useHTML5Audio) {
        if (!ay.html5 || !ay.html5.canPlayType) {
          ay.hasHTML5 = false;
          return true
        } else {
          ay.hasHTML5 = true
        }
        if (aw) {
          if (aV()) {
            return true
          }
        }
      } else {
        return true
      }
      for (j in ay.audioFormats) {
        if (ay.audioFormats.hasOwnProperty(j) && ay.audioFormats[j].required && !ay.html5.canPlayType(ay.audioFormats[j].type)) {
          k = true
        }
      }
      if (ay.ignoreFlash) {
        k = false
      }
      ai = ay.useHTML5Audio && ay.hasHTML5 && !k && !ay.requireFlash;
      return aV() && k
    };
    aH = function() {
      var l, j = [];
      if (al) {
        return false
      }
      if (ay.hasHTML5) {
        for (l in ay.audioFormats) {
          ay.audioFormats.hasOwnProperty(l) && j.push(l + ": " + ay.html5[l])
        }
      }
      if (ai) {
        if (!al) {
          am.remove(ar, "load", ay.beginDelayedInit);
          ay.enabled = true;
          aP()
        }
        return true
      }
      aO();
      try {
        ay.o._externalInterfaceTest(false);
        if (ay.allowPolling) {
          ac(true, ay.flashPollingInterval ? ay.flashPollingInterval : ay.useFastPolling ? 10 : 50)
        }
        ay.debugMode || ay.o._disableDebug();
        ay.enabled = true
      } catch (k) {
        aE(true);
        aP();
        return false
      }
      aP();
      am.remove(ar, "load", ay.beginDelayedInit);
      return true
    };
    az = function() {
      if (bh) {
        return false
      }
      aF();
      aO();
      return bh = true
    };
    aX = function() {
      if (bf) {
        return false
      }
      bf = true;
      bj();
      if (!ay.useHTML5Audio) {
        if (!aV()) {
          ay.useHTML5Audio = true
        }
      }
      a9();
      ay.html5.usingFlash = bg();
      a2 = ay.html5.usingFlash;
      bf = true;
      at.removeEventListener && at.removeEventListener("DOMContentLoaded", aX, false);
      h();
      return true
    };
    be = function(j) {
      if (!j._hasTimer) {
        j._hasTimer = true
      }
    };
    a6 = function(j) {
      if (j._hasTimer) {
        j._hasTimer = false
      }
    };
    aS = function() {
      ay.onerror instanceof Function && ay.onerror();
      ay.disable()
    };
    aU = function() {
      if (!aw || !aV()) {
        return false
      }
      var l = ay.audioFormats, j, k;
      for (k in l) {
        if (l.hasOwnProperty(k)) {
          if (k === "mp3" || k === "mp4") {
            ay.html5[k] = false;
            if (l[k] && l[k].related) {
              for (; j--; ) {
                ay.html5[l[k].related[j]] = false
              }
            }
          }
        }
      }
    };
    this._setSandboxType = function() {
    };
    this._externalInterfaceOK = function() {
      if (ay.swfLoaded) {
        return false
      }
      (new Date).getTime();
      ay.swfLoaded = true;
      aT = false;
      aw && aU();
      ah ? setTimeout(aH, 100) : aH()
    };
    bb = function() {
      if (at.readyState === "complete") {
        aX();
        at.detachEvent("onreadystatechange", bb)
      }
      return true
    };
    if (!ay.hasHTML5 || a2) {
      am.add(ar, "focus", a4);
      am.add(ar, "load", a4);
      am.add(ar, "load", aG);
      aJ && aT && am.add(ar, "mousemove", a4)
    }
    if (at.addEventListener) {
      at.addEventListener("DOMContentLoaded", aX, false)
    } else {
      at.attachEvent ? at.attachEvent("onreadystatechange", bb) : aS()
    }
    at.readyState === "complete" && setTimeout(aX, 100)
  }
  var c = null;
  if (typeof SM2_DEFER === "undefined" || !SM2_DEFER) {
    c = new a
  }
  b.SoundManager = a;
  b.soundManager = c
})(window);














(function(a) {
  a.mugasha = {options: {autostart: false,user: 0,user_info: undefined,set_url: "",set_link: ""}};
  a.mugasha = function(y) {
    y = a.extend(a.mugasha.options, y);
    var Q = 0;
    var w = {isIE: (navigator.userAgent.match(/MSIE/i)),isSafari: (navigator.userAgent.match(/safari/i)),isChrome: (navigator.userAgent.match(/chrome/i)),isIOS: (navigator.userAgent.match(/(Mobile.+Safari)/i)),start_track: 0,audio_enabled: true,is_playing: false,last_track: undefined,current_track: undefined,current_track_info: {track: undefined,played: undefined,scrobbled: true,tracked: true},volume: 80,loaded: false,position: 0,cookie: a.readCookie("mugasha_play"),cookie_val: {volume: 70,duration: 0},continue_listening_count: 0,mp4_file: "",html5_audio: false};
    var M = {play: false,point: 0};
    var c = null;
    var z = false, J = false;
    var F = false;
    var o = soundManager;
    if (J) {
      a("#soundmanager-debug").show();
      o.debugMode = true;
      o.debugFlash = true
    }
    o.url = "/swf/";
    o.flashVersion = 9;
    if (w.isIOS) {
      o.useHTML5Audio = true
    } else {
      o.useHTML5Audio = false;
      o.useFlashBlock = true;
      o.useFastPolling = true;
      o.useHighPerformance = true
    }
    o.defaultOptions.volume = w.cookie_val.volume;
    P();
    a.address.init(function(U) {
      w.start_track = parseInt(U.value.match(/\d+/))
    });
    a.address.externalChange(function(V) {
      var U = parseInt(V.value.match(/\d+/)) - 1;
      if (w.is_playing && U >= 0) {
        C(U)
      }
    });
    this.set_user = function(U, V) {
      y.user = U;
      y.user_info = V;
      w.audio_enabled = true;
      if (!w.is_playing) {
        A()
      }
      t()
    };
    this.set_tweet_user = function(U, V) {
      y.user_info = U;
      if (!V) {
        d()
      }
    };
    this.register_play_tracking = function(U) {
      y.tracking_callback = U
    };
    function P() {
      if (z) {
        console.log("Initialize")
      }
      s();
      n();
      f()
    }
    a("#formClear").submit(function() {
      a.ajax({beforeSend: function() {
          a("#form_status").toggle()
        },complete: function(U) {
          a("#form_status").toggle();
          s()
        },data: a.param(jQuery(this).serializeArray()),dataType: "script",type: "post",url: "/comments"});
      return false
    });
    function f() {
      a.getJSON("/api/private/single_set?set=" + y.set_id, function(U) {
        c = U.sets[0];
        y.set_link = c.permalink;
        y.set_url = "http://mugasha.com" + y.set_link;
        w.mp4_file = U.media_url + "/" + c.mp4_file;
        p()
      });
      if (z) {
        console.log("Get Set Info")
      }
      t()
    }
    function t() {
      a.getJSON("/dj_sets/stream/get?set=" + y.set_id, function(U) {
        T(U[0]);
        O(U[1], U[2])
      });
      if (z) {
        console.log("Get Stream Data")
      }
    }
    function T(U) {
      a.each(U, function(V, X) {
        var W = a("#track_like_" + X.track.id);
        W.data({track_id: X.track.id,track_num: X.track.trackNumber});
        W.addClass("notfavorite")
      })
    }
    function s() {
      if (y.user) {
        a(".comment_user").html('<img src="' + y.user_info.image + '" class="thumb">');
        a.each(a(".del_comment_" + y.user), function(U, V) {
          a(this).html('<a class="del_comment" data-comdel="' + a(this).attr("data-comment") + '">X</a>')
        });
        a(".del_comment").click(function() {
          a.ajax({type: "DELETE",url: "/comments/" + a(this).attr("data-comdel"),data: ({authenticity_token: _token})})
        })
      }
    }
    function O(V, U) {
      if (U) {
        a("#set_rates").removeClass("like-false").addClass("like-true");
        a("#set_rates a").html("Liked")
      } else {
        a("#set_rates a").html("Like")
      }
    }
    function u() {
      if (w.cookie) {
        return w.cookie_val.volume
      } else {
        return Q.volume
      }
    }
    function R(U) {
      Q.setVolume(U);
      w.cookie_val.volume = U;
      K()
    }
    function K() {
      var U = a.param(w.cookie_val);
      a.setCookie("mugasha_play", U, {path: "/",duration: 365})
    }
    function n() {
      if (w.cookie) {
        var U = {};
        a.each(w.cookie.split("&"), function() {
          var V = this.split("=");
          U[V[0]] = parseInt(V[1])
        });
        w.cookie_val.volume = U.volume;
        w.cookie_val.duration = U.duration;
        o.defaultOptions.volume = w.cookie_val.volume
      }
      if (z) {
        console.log("Get Cookie")
      }
    }
    function S() {
      if (z) {
        console.log("Start Player UI setup")
      }
      a("#timeEnd").text(E(c.duration));
      a("#timeSlider").slider({max: c.duration,slide: function(U, V) {
          v(V.value)
        }});
      a("#volumeSlider").slider({animate: true,value: u(),slide: function(U, V) {
          R(V.value)
        }});
      a("#playBtnTog").click(function() {
        x()
      });
      a("#trackBackBtn").click(function() {
        C(w.current_track - 1)
      });
      a("#trackForwardBtn").click(function() {
        C(w.current_track + 1)
      });
      a(".toArea").click(function() {
        C(a(this).attr("id") - 1)
      });
      a("#rewind-left").click(function() {
        v(w.position - 30)
      });
      a("#rewind-right").click(function() {
        v((w.position - 0.1) + 30)
      });
      a(".buyTrack").toggle(function() {
        I(a(this).attr("data-bt"))
      }, function() {
        l(a(this).attr("data-bt"))
      });
      a("#player").mouseenter(function() {
        a("#seek-arrow").show()
      });
      a("#player").mouseleave(function() {
        a("#seek-arrow").hide()
      });
      a(".favorite").click(function() {
        if (!y.user) {
          jQuery.facebox({ajax: "/login"}, "", "Login or sign up to like tracks.")
        } else {
          if (a(this).hasClass("notfavorite")) {
            g("notfavorite", a(this).attr("data-tracknum"))
          } else {
            g("favorite", a(this).attr("data-tracknum"))
          }
        }
      });
      a("#set_rates").click(function() {
        if (!y.user) {
          jQuery.facebox({ajax: "/login"}, "", "Login or sign up to like this set.")
        } else {
          L()
        }
      });
      a("#fbshare_btn_me").live("click", function() {
        h(a(this).attr("data-track"), "")
      });
      a("#fbshare_btn_friend").live("click", function() {
        h(a("#fb_friend_name").data("track"), a("#fb_friend_name").data("fbid"))
      });
      a(".share_track_facebook").click(function() {
        var U = a(this);
        if (is_fb_user()) {
          jQuery.facebox('<div class="fb_feed_share"><h3> Who do you want to share this track with? </h3> <p> <a class="blue btn xl" id="fbshare_btn_me" data-track="' + a(this).attr("data-track") + '"> Post to my profile</a> </p><hr><p> <strong title="The track will be shared on your friends wall.">Share with a friend</strong><br class="clear"> <input type="text" id="fb_friend_name" value="Start typing your friends name..." onfocus="if (this.value == \'Start typing your friends name...\') {this.value = \'\'; this.style.color =\'#2d3133\';}"> <a class="blue btn xl hide" id="fbshare_btn_friend">Post</a> </p></div>', "", "Share Track on Facebook");
          FB.api("/me/friends", function(W) {
            var V = [];
            a.map(W.data, function(X) {
              V.push({label: X.name,value: X.name,id: X.id})
            });
            a("#fb_friend_name").autocomplete({delay: 0,source: V,minLength: 1,select: function(X, Y) {
                X.preventDefault();
                if (Y.item) {
                  a("#fbshare_btn_friend").show();
                  a("#fb_friend_name").data("fbid", Y.item.id);
                  a("#fb_friend_name").data("track", U.attr("data-track"))
                }
              }}).data("autocomplete")._renderItem = function(X, Y) {
              return a("<li></li>").data("item.autocomplete", Y).append('<a><img class="fb_thumb" src="http://graph.facebook.com/' + Y.id + '/picture">' + Y.label + "</a>").appendTo(X)
            }
          })
        } else {
          h(U.attr("data-track"), "")
        }
      });
      a(".share_set_facebook").click(function() {
        k()
      });
      a(".share_track_twitter").click(function() {
        G(a(this).attr("data-track"))
      });
      a(".recommended_sets").click(function() {
        _gaq.push(["_trackEvent", "Recommendation", "Set Click - Right Widget", a(this).attr("data-setid") + "-" + a(this).attr("data-name")]);
        _gaq.push(["_trackEvent", "Recommendation", "Set Click Position - Right Widget", "Position " + a(this).attr("data-pos")])
      });
      if (y.user && !y.user_info.lastfm_scrobble) {
        a(' <div id="lastfm" class="right_widget"><img alt="Lastfm_32" class="left" src="/images/social/lastfm_32.png" title="Connect your LastFm Account" width="32"><div><span>Last.fm Scrobbling is here.</span><a href="/lastfm_auth/new">Connect account</a></div></div>').insertBefore("#player_feedback")
      }
      q();
      i()
    }
    function q() {
      var U = a("#set_ad_spot");
      U.html('<iframe id="sidebarad"scrolling="no" frameborder="0" marginwidth="0" marginheight="0"/></iframe>');
      if (mdg.view_width > 1200) {
        U.css("position", "absolute").css("top", "10px").css("left", "970px");
        a("#sidebarad").attr("src", "/ads/sidebar_ad").css("width", "160px").css("height", "600px")
      } else {
        a("#sidebarad").attr("src", "/ads/sidebar_square_ad/").css("width", "300px").css("height", "250px")
      }
    }
    function D() {
      a("#sidebarad")[0].contentWindow.location.reload()
    }
    function i() {
      a(document).keydown(function(U) {
        if (!F) {
          if (U.keyCode == 32) {
            U.preventDefault();
            x()
          }
          if (U.keyCode == 39) {
            U.preventDefault();
            C(w.current_track + 1)
          }
          if (U.keyCode == 37) {
            U.preventDefault();
            C(w.current_track - 1)
          }
        }
      });
      a(":input").live("focus", function() {
        F = true
      });
      a(":input").live("blur", function() {
        F = false
      })
    }
    function g(V, U) {
      a.ajax({type: "POST",url: "/dj_sets/track_like",data: ({authenticity_token: _token,status: V,track_id: c.tracks[U - 1].id,set_id: c.id,podcast_id: c.show_id,artist_id: c.tracks[U - 1].artist_id})})
    }
    function L() {
      a.ajax({type: "POST",url: "/dj_sets/likes/" + c.id,data: ({authenticity_token: _token,podcast_id: c.show_id}),success: function(U) {
          t()
        }})
    }
    function d() {
      if (y.user) {
        if (y.user_info.twitter_user) {
          B("Listening to " + c.show_title + " " + c.title + " by " + c.show_artist + " on @mugasha " + c.set_link, "Tweet about this set.")
        } else {
          tweet_type = 0;
          a("#hidden_tweet_linup").submit()
        }
      } else {
        window.open("http://twitter.com/home?status=Listening+to+" + c.show_title + "+" + c.title + "+by+" + c.show_artist + "+on+@mugasha+" + c.set_link)
      }
    }
    function G(U) {
      if (y.user) {
        if (y.user_info.twitter_user) {
          B("Listening to " + c.tracks[U].title + " by " + c.tracks[U].artist + " on @mugasha " + c.tracks[U].track_link, "Tweet about this track.")
        } else {
          tweet_type = 0;
          a("#hidden_tweet_linup").submit()
        }
      } else {
        window.open("http://twitter.com/home?status=Listening+to+" + c.tracks[U].title + "+by+" + c.tracks[U].artist + "+on+@mugasha+" + c.tracks[U].track_link)
      }
    }
    function B(U, V) {
      jQuery.facebox('<div class="tweet_info"><img src="' + y.user_info.twitter_img + '" class="left"><div class="left tweet_form"><textarea class="tweetie">' + U + '</textarea><a class="counter"></span><a class="tweet_link awesome float_right">Tweet</a></div></div>', "tweet_box", V);
      i();
      a(".tweet_link").click(function() {
        send_tweet({})
      });
      a("#tweetie").charCount({allowed: 140,warning: 20,counterText: "Characters left: "})
    }
    function k() {
      var U = {name: "Listening to " + c.show_title + " " + c.title + " by " + c.show_artist + " on Mugasha",href: c.set_link + "?ref=fb",caption: c.description,properties: {"Browse more sets": {text: c.show_title + " by " + c.show_artist,href: "http://mugasha.com/" + c.show_title.replace(" ", "-") + "?ref=fb"}},media: [{type: "image",src: "http://mugasha.com/img/img.png?type=share_set&id=" + c.id + "&imgurl=" + encodeURIComponent(c.medium_image),href: c.set_link + "?ref=fb"}]};
      links = [{text: "Listen on Mugasha",href: c.set_link + "?ref=fb"}];
      FB.ui({method: "stream.publish",message: "",attachment: U,action_links: links,user_message_prompt: "What do you think about this set?"}, function(V) {
        if (V && V.post_id) {
        } else {
        }
      })
    }
    function h(U, X) {
      var Y = c.tracks[U].artist_image == null ? c.medium_image : c.tracks[U].artist_image;
      var W = c.tracks[U].track_link == "" ? y.set_url + "#/track/" + U + 1 : c.tracks[U].track_link;
      var V = {to: X,method: "stream.publish",message: "I love this track",attachment: {name: "Listening to " + c.tracks[U].title + " - " + c.tracks[U].artist + " on Mugasha",href: W + "?ref=fb",properties: {Set: {text: c.show_title + " by " + c.show_artist,href: y.set_url + "?ref=fb"},Track: {text: c.tracks[U].title,href: W + "?ref=fb"},Artist: {text: c.tracks[U].artist,href: "http://mugasha.com/artist/" + c.tracks[U].artist + "?ref=fb"}},media: [{type: "image",href: W + "?ref=fb",src: Y}]},action_links: [{text: "Listen on Mugasha",href: W + "?ref=fb"}],user_message_prompt: "What do you think about this track?"};
      FB.ui(V, function(Z) {
        if (Z && Z.post_id) {
          hide_frame()
        } else {
        }
      })
    }
    function C(U) {
      if (z) {
        console.warn("PLAY TRACK")
      }
      var V = c.tracks[U].start_time;
      if (V == 0) {
        V += 1
      }
      v(V)
    }
    function x() {
      if (w.audio_enabled) {
        j()
      } else {
        N()
      }
    }
    function A() {
      Q.play()
    }
    function b() {
      Q.pause()
    }
    function j() {
      Q.togglePause()
    }
    function v(U) {
      if (z) {
        console.log("SEEK Called")
      }
      if (z) {
        console.log("SEEK Time => " + U)
      }
      if (!w.is_playing) {
        if (z) {
          console.error("SEEK and PLAY")
        }
        Q.mute();
        A();
        M.play = true;
        M.point = U;
        setTimeout(function() {
          v(U);
          Q.unmute()
        }, 1500)
      } else {
        Q.setPosition(U * 1000)
      }
    }
    function I(U) {
      a("#trackExtraBLtrackWrap_" + U).fadeIn();
      a("#BLtrackWrap_" + U).addClass("buyTrackOn")
    }
    function l(U) {
      a("#trackExtraBLtrackWrap_" + U).hide();
      a("#BLtrackWrap_" + U).removeClass("buyTrackOn")
    }
    function E(X) {
      var W, U, V;
      if (Math.floor(X / 3600) == 0) {
        W = "00"
      } else {
        (Math.floor(X / 3600) < 10) ? W = "0" + Math.floor(X / 3600) : W = Math.floor(X / 3600)
      }
      if (Math.floor((X / 60) % 60) == 0) {
        U = "00"
      } else {
        (Math.floor((X / 60) % 60) < 10) ? U = "0" + Math.floor((X / 60) % 60) : U = Math.floor((X / 60) % 60)
      }
      if (Math.floor(X % 60) == 0) {
        V = "00"
      } else {
        (Math.floor(X % 60) < 10) ? V = "0" + Math.floor(X % 60) : V = Math.floor(X % 60)
      }
      return W + ":" + U + ":" + V
    }
    function e(U) {
      if (z) {
        console.log("STATE: " + U)
      }
      a("#buffering-state").hide();
      w.loaded = true;
      switch (U) {
        case "PAUSED":
          w.is_playing = false;
          a("#playBtnTog").removeClass("pauseBtn").addClass("playBtn");
          break;
        case "PLAYING":
          w.is_playing = true;
          a("#playBtnTog").removeClass("playBtn").addClass("pauseBtn");
          break;
        case "BUFFERING":
          w.is_playing = false;
          a("#buffering-state").show();
          break;
        case "IDLE":
          w.is_playing = false;
          w.loaded = false;
          break;
        default:
      }
    }
    function H(V) {
      if (!y.user && (V != w.position)) {
        w.cookie_val.duration += 1;
        K();
        if (w.cookie_val.duration >= 180 && w.cookie_val.duration % 30 == 0) {
          N()
        }
        if (w.cookie_val.duration >= 420) {
          b();
          w.audio_enabled = false;
          N()
        }
        if (z) {
          console.log("duration = " + w.cookie_val.duration)
        }
      }
      if (V != w.position && ((y.user && y.user_info.lastfm_scrobble) || y.tracking_callback)) {
        m()
      }
      w.position = V;
      a("#timeStart").text(E(V));
      for (var U = 0; U < c.tracks.length; U++) {
        if (V > c.tracks[U].start_time && V < c.tracks[U].end_time) {
          if (U != w.current_track) {
            r(U)
          }
        }
      }
      a("#timeSlider").slider("value", V)
    }
    function m() {
      if (w.current_track && w.current_track >= 0) {
        if (w.current_track_info.track != w.current_track) {
          w.current_track_info.track = w.current_track;
          w.current_track_info.played = 0;
          w.current_track_info.scrobbled = false;
          w.current_track_info.tracked = false;
          if (y.tracking_callback) {
            a(document).trigger(y.tracking_callback, ["track_play_start", {track: c.tracks[w.current_track_info.track].title,artist: c.tracks[w.current_track_info.track].artist,duration: c.tracks[w.current_track_info.track].duration}])
          }
        }
        w.current_track_info.played += 1;
        var U = c.tracks[w.current_track_info.track].duration;
        if (!w.current_track_info.scrobbled && U > 30 && ((w.current_track_info.played > U / 2) || w.current_track_info.played > 30)) {
          w.current_track_info.scrobbled = true;
          a.post("/tracks/scrobble", {track: c.tracks[w.current_track_info.track].title,artist: c.tracks[w.current_track_info.track].artist,duration: c.tracks[w.current_track_info.track].duration})
        }
        if (y.tracking_callback && !w.current_track_info.tracked && U > 30 && (w.current_track_info.played > (Math.floor(U * 0.8)))) {
          w.current_track_info.tracked = true;
          a(document).trigger(y.tracking_callback, ["track_play_80", {track: c.tracks[w.current_track_info.track].title,artist: c.tracks[w.current_track_info.track].artist,duration: c.tracks[w.current_track_info.track].duration}])
        }
      }
    }
    function r(U) {
      w.current_track = U;
      if (z) {
        console.log("Current Track: " + w.current_track)
      }
      var V = "#trackWrap_" + (U + 1);
      if (w.last_track != undefined) {
        if (z) {
          console.log("Last Track: " + w.last_track)
        }
        var W = "#trackWrap_" + (w.last_track + 1);
        a(W).removeClass("trackCurrent");
        l(w.last_track + 1)
      }
      a(V).addClass("trackCurrent");
      I(U + 1);
      a("#TrackTitle").text(c.tracks[U].title);
      a("#TrackArtist").text(c.tracks[U].artist);
      document.title = c.tracks[U].title + " - " + c.tracks[U].artist + " | " + c.show_title + " " + c.title + " | Mugasha";
      a.address.value("/track/" + (U + 1) + "/" + c.tracks[U].artist.replace(/\W/, "-") + "/" + c.tracks[U].title);
      if (c.tracks[U].artist_image) {
        a(".player_photo")[0].src = c.tracks[U].artist_image
      } else {
        a(".player_photo")[0].src = c.medium_image
      }
      a.post("/tracks/" + c.tracks[U].id + "/play", {track_name: c.tracks[U].title,artist: c.tracks[U].artist});
      w.last_track = U;
      D()
    }
    function N() {
      if (!mdg.facebox_open) {
        jQuery.facebox({ajax: "/login"}, "", "Login or sign up to continue listening.")
      }
      w.continue_listening_count += 1
    }
    player_onconnect = function(U) {
      S();
      if (w.start_track) {
        C(w.start_track - 1)
      }
    };
    player_whileplaying = function() {
      H((this.position / 1000).toFixed())
    };
    player_whileloading = function() {
    };
    player_onbufferchange = function() {
      if (this.isBuffering && this.playState == 0) {
        e("BUFFERING")
      }
    };
    player_onplay = function() {
      e("PLAYING")
    };
    player_onpause = function() {
      e("PAUSED")
    };
    player_onresume = function() {
      e("PLAYING")
    };
    player_onerror = function() {
    };
    player_onfinish_complete = function() {
      if (z) {
        console.error("Finish")
      }
      jQuery.facebox({ajax: "/recommendations?styles=" + c.styles}, "", "Suggested Sets")
    };
    player_onfinish = function() {
      if (z) {
        console.error("Finish")
      }
    };
    player_onbeforefinish = function() {
      if (z) {
        console.error("Before Finish")
      }
    };
    function p() {
      if (z) {
        console.log("Embed Player")
      }
      o.onready(function() {
        if (o.supported()) {
          a("#sm2-support").hide();
          if (z) {
            console.log("HTML5 => " + o.useHTML5Audio)
          }
          if (z) {
            console.log("mp4 => " + o.html5.mp4)
          }
          if (z) {
            console.log("File => " + w.mp4_file)
          }
          if (z) {
            console.log("can play => " + o.canPlayURL(w.mp4_file))
          }
          if (o.useHTML5Audio && o.html5.mp4 && o.canPlayURL(w.mp4_file)) {
            if (z) {
              console.log("support HTML5")
            }
            Q = o.createSound({id: "mugasha_audio",url: w.mp4_file,autoLoad: true,onbeforefinishtime: 5000,onjustbeforefinishtime: 200,whileplaying: player_whileplaying,onplay: player_onplay,onpause: player_onpause,onresume: player_onresume,onfinish: player_onfinish,onbeforefinish: player_onbeforefinish,onbeforefinishcomplete: player_onfinish_complete,onjustbeforefinish: player_onbeforefinish});
            w.html5_audio = true;
            player_onconnect()
          } else {
            Q = o.createSound({id: "mugasha_audio",serverURL: "rtmp://s23gldsoj0czkb.cloudfront.net/cfx/st",url: "mp4:" + c.file.substring(0, c.file.length - 1) + "4",autoLoad: true,onbeforefinishtime: 5000,onjustbeforefinishtime: 200,onconnect: player_onconnect,onfailure: player_onerror,whileplaying: player_whileplaying,onplay: player_onplay,onpause: player_onpause,onresume: player_onresume,onfinish: player_onfinish,onbeforefinish: player_onbeforefinish,onbeforefinishcomplete: player_onfinish_complete,onjustbeforefinish: player_onbeforefinish});
            if (z) {
              console.log(Q.options.url)
            }
          }
        } else {
          if (z) {
            console.log("SM2 Error")
          }
        }
      });
      o.onerror = function() {
        var V = a("#sm2-support");
        var W = '<div style="margin:0.5em;margin-top:-0.25em"><h3>Oh snap!</h3><p>Looks like we had trouble loading the player. Make sure you have flash player installed and enabled.</p><p id="flashblocker">If you have a flash blocker, try allowing the SWF to run - it should be visible on the <strong>left</strong>.</p><p id="flash-offline">' + (!o._overHTTP ? "<b>Viewing offline</b>? You may need to change a Flash security setting." : "Other possible causes: Missing .SWF, or no Flash?") + 'Not to worry, as guided help is provided.</p><p><a href="http://www.schillmania.com/projects/soundmanager2/doc/getstarted/index.html#troubleshooting"  target="_blank" class="feature-hot">Troubleshooting</a></p></div>';
        var U = (navigator.userAgent.match(/(ipad|iphone)/i));
        V.html(W);
        V.css({padding: "10px","margin-left": "10px","margin-bottom": "10px"});
        if (U || o.getMoviePercent()) {
          a("#flashblocker").hide();
          if (U) {
            a("#flash-offline").hide()
          }
        }
      }
    }
    return this
  }
})(jQuery);
















var play_track = undefined;
$.address.init(function(a) {
  play_track = a.value.match(/\d+/)
});
$("input[name*='authenticity_token']").val(_token);
