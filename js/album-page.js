badracket.loadBandTweets = function(){
  var twitterHandle = $('.album-page-wrapper').attr('data-twitter');
  if (twitterHandle.substring(0,1) === '@') {
    twitterHandle = twitterHandle.substring(1);
  }
  JQTWEET.user = twitterHandle;
  JQTWEET.loadTweets(3);
};