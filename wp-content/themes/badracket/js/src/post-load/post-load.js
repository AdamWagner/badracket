var gf_placeholder = function() {

  $('.gform_wrapper .gplaceholder')
    .find('input, textarea').filter(function(i){
      var $field = $(this);

      if (this.nodeName == 'INPUT') {
        var type = this.type;
        return !(type == 'hidden' || type == 'file' || type == 'radio' || type == 'checkbox');
      }

      return true;
    })
    .each(function(){
      var $field = $(this);

      var id = this.id;
      var $labels = $('label[for=' + id + ']').remove();
      var label = $labels.last().text();

      if ( label === 'State / Province / Region') { label = 'State'; }

      if (label.length > 0 && label[ label.length-1 ] == '*') {
        label = label.substring(0, label.length-1) + ' *';
      }

      $field[0].setAttribute('placeholder', label);
    });

  var support = (!('placeholder' in document.createElement('input'))); // borrowed from Modernizr.com

  if ( support ) {
    $('input[placeholder], textarea[placeholder]').placeholder({
      blankSubmit: true
    });
  }

};