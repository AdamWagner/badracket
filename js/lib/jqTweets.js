/* JQTWEET */
JQTWEET = {
    user: "badracket",
    numTweets: 5,
    appendTo: ".twitter",
    loadTweets: function (a) {
        $.ajax({
            url: "http://api.twitter.com/1/statuses/user_timeline.json/",
            type: "GET",
            dataType: "jsonp",
            data: {
                screen_name: JQTWEET.user,
                include_rts: true,
                count: a,
                include_entities: true
            },
            success: function (d, f, e) {
                var c = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';
                for (var b = 0; b < d.length; b++) {
                    $(JQTWEET.appendTo).append(c.replace("TWEET_TEXT", JQTWEET.ify.clean(d[b].text)).replace(/USER/g, d[b].user.screen_name).replace("AGO", JQTWEET.timeAgo(d[b].created_at)).replace(/ID/g, d[b].id_str));
                }
            }
        });
    },
    timeAgo: function (g) {
        var i = new Date();
        var e = new Date(g);
        if ($.browser.msie) {
            e = Date.parse(g.replace(/( \+)/, " UTC$1"));
        }
        var h = i - e;
        var b = 1000,
            c = b * 60,
            d = c * 60,
            f = d * 24,
            a = f * 7;
        if (isNaN(h) || h < 0) {
            return "";
        }
        if (h < b * 2) {
            return "right now";
        }
        if (h < c) {
            return Math.floor(h / b) + " seconds ago";
        }
        if (h < c * 2) {
            return "about 1 minute ago";
        }
        if (h < d) {
            return Math.floor(h / c) + " minutes ago";
        }
        if (h < d * 2) {
            return "about 1 hour ago";
        }
        if (h < f) {
            return Math.floor(h / d) + " hours ago";
        }
        if (h > f && h < f * 2) {
            return "yesterday";
        }
        if (h < f * 365) {
            return Math.floor(h / f) + " days ago";
        } else {
            return "over a year ago";
        }
    },
    ify: {
        link: function (a) {
            return a.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function (g, f, d, c, b) {
                var e = d.match(/w/) ? "http://" : "";
                return '<a class="twtr-hyperlink" target="_blank" href="' + e + f + '">' + ((f.length > 25) ? f.substr(0, 24) + "..." : f) + "</a>" + b;
            });
        },
        at: function (a) {
            return a.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function (b, c) {
                return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + c + '">@' + c + "</a>";
            });
        },
        list: function (a) {
            return a.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function (b, c) {
                return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + c + '">@' + c + "</a>";
            });
        },
        hash: function (a) {
            return a.replace(/(^|\s+)#(\w+)/gi, function (b, c, d) {
                return c + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + d + '">#' + d + "</a>";
            });
        },
        clean: function (a) {
            return this.hash(this.at(this.list(this.link(a))));
        }
    }
};