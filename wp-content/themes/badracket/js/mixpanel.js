var br_mixpanel = function(){

  function track(eventName, extraProps) {
    extraProps = (extraProps === undefined) ? {} : extraProps;
    mixpanel.track(eventName, extraProps);
  }

  function setPeople( o ) {
    var id = mixpanel.get_distinct_id();
    mixpanel.identify(id);

    var friendCount;
    if ( typeof o.friends === 'undefined' ) {
      friendCount = 0;
    } else {
      friendCount = o.friends.length;
    }

    var user = {
      $first_name : o.first_name,
      $last_name : o.last_name,
      $email : o.email,
      gender : o.gender,
      $created : new Date(),
      'Number of FB friends' : friendCount,
      $username : o.username,
      'Likes BR on FB?' : o.likesBR
    };

    mixpanel.people.set( user );
    // use mixpanel.people.set_once
  }
  return {
    track : track,
    setPeople : setPeople,
  };

}();