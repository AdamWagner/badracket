  var fbToken;

var br_facebook = {
  token : null,
  userID : null
};

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
          fbToken = response.authResponse.accessToken;
          br_facebook.token = fbToken;
        } else {
            // cancelled
        }
    }, { scope:'email,user_activities,friends_activities,friends_likes,friends_location,rsvp_event,user_events'});
}

function logout() {
  console.log('fuck you');
   FB.api('https://graph.facebook.com/me?access_token='+fbToken, function(response){
    console.log(response);
  });
}

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        // console.log('Good to see you, ' + response.name + '.');
        console.log(response);
    });
    FB.api('/me/friends', function(response) {
        // console.log(response);
    });
    FB.api('/me/permissions', function (response) {
        console.log(response);
    } );
}



window.fbAsyncInit = function() { // always runs after sdk loads
  FB.init({
    appId      : '182655285084916', // App ID
    channelUrl : '//WWW.BADRACKET.COM/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      br_facebook.token = response.authResponse.accessToken;
      br_facebook.userID = response.authResponse.userID;
    } else if (response.status === 'not_authorized') {
      login();
    } else {
      login();
    }
   });
};




var listen,album,artist,title,listenCount;

var titleList = [];
var albumList = [];
var artistList = [];

console.log('this stuff executes');

var myBS = 'blah';


var allDone = false;

function get_music_listens() {
  FB.api('/me/music.listens', function(response) {
    listen = response.data;
    listenCount = listen.length;
    for (var i=0; i<listenCount; i++) {
      ripMusicData(listen[i].data);
    }
  });
}

function ripMusicData(listen) {
  if (listen.album) {
    albumList.push(listen.album.title);
  }
  get_artist_name(listen);
  titleList.push(listen.song.title);
}

function get_artist_name(listen){
  var albumID = listen.song.id;
  FB.api(albumID, function(response){
    artistList.push(response.data.musician[0].name);
    if (artistList.length === listenCount) { render(); }
  });
}

function get_friends() {
   FB.api('/me/friends', function(response) {
    console.log(response);
  });
}

function get_event(id){
    FB.api('/badracket/events/', function(response) {
      _.each(response.data, function(el){
      if (el.id == id) { console.log(el); return el; }
    });
  });
}

function get_attendees(id){
   FB.api('/'+id+'/attending', function(response) {
    return response.data;
   });
}

function is_attending( eventID, userID ) {
  var result;
  FB.api('/' + eventID + '/attending/' + userID, function(response) {
    result = response.data;
  });
  return result;
}


function rsvp(eventId) {
  FB.api('/'+eventId+'/attending', 'post', function(data) {
   console.log(data);
   });
}


$('.show-rsvp').click(function(){
  var eventId = $(this).data('fb-id');
  // get_event(eventId);
  rsvp(eventId);
  is_attending(eventId, br_facebook.userID);
});



function fb_init(){
  var eventId = $('.show-rsvp').data('fb-id');
  console.log(eventId);
  console.log(br_facebook.userID);
  var a = is_attending(eventId, br_facebook.userID);
  console.log(a);
  _.each(a, function(el){
    $('body').append(el.name);
  });
}


setTimeout(function() {
  fb_init();
}, 1000);



function render(){
  $.each(titleList, function(index, value){
    $('ul').append(
        $(document.createElement('li')).text('You listened to ' + titleList[index] + ' by ' + artistList[index])
    );
  });
}