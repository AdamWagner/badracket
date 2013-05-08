/* Facebook Specific */

function call_facebook(path, callback, access_token) {
  if (access_token) {
    url = 'http://graph.facebook.com/' + path + '?access_token=' + access_token;
  } else {
    url = 'http://graph.facebook.com/' + path;
  }
  
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: callback
  });
}

function sign_in(client_id, redirect_uri) {
  location.href = 'https://graph.facebook.com/oauth/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&scope=email';
  return false;
}

function get_access_token(client_id, redirect_uri, code, callback) {
  $.ajax({
    url: 'http://tom.puresolo/apis/facebook_access_token?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&code=' + code,
    dataType: 'jsonp',
    success: callback
  });
}

function get_account_details(access_token, callback) {
  call_facebook('me', callback, access_token);
}


/* Demo Specific */

function show_application(client_id) {
  $('#client_id_form').hide();
  call_facebook(client_id, show_application_name);
}

function show_application_name(data) {
  $('#application_name').html(data.name + ' (' + data.id + ')');
  $('#your_application').show();
}

function show_client_id_form() {
  $('#your_application').hide();
  $('#client_id_form').show();
}

function save_access_token(data) {
  $.cookie('access_token', data.access_token);
  get_account_details($.cookie('access_token'), show_account_details);
}

function show_account_details(data) {
  alert('Hello ' + data.name + ' (' + data.email + ')');
}


/* Page Specific */

$(function() {
  if ($.cookie('client_id')) {
    show_application($.cookie('client_id'));
  }
  
  if (jQuery.url.param("code") != null) {
    get_access_token($.cookie('client_id'), 'http://tom.jquery/', jQuery.url.param("code"), save_access_token);
  }
  
  $('#save_client_id').click(function() {
    $.cookie('client_id', $('#client_id').attr('value'));
    show_application($.cookie('client_id'));
  });
  
  $('#change_client_id').click(function() {
    $.cookie('client_id', null);
    show_client_id_form();
    return false;
  });
  
  $('#sign_in').click(function() {
    sign_in($.cookie('client_id'), 'http://tom.jquery/');
  });
});