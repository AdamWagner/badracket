/* @codekit-prepend "data.js" */



var AlbumModel = Backbone.Model.extend({

  initialize: function() {

  }
});



var albumModel= new AlbumModel(albums[0]);

console.log(albumModel.attributes);


var AlbumView = Backbone.View.extend({

  tag : 'p',

  template : _.template( '<p> <%= this.model.albumName %> </p>' ),

  events: {

  },

  initialize: function() {

  },

  render: function() {
    this.$el.html( this.template( this.model.toJSON() ) );
    return this;
  }
});


var albumView = new AlbumView({ model: albumModel});

console.log(albumView.render().el);

// $('html').append(albumView);