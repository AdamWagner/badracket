/* @codekit-prepend "lib/stripe.js" */
/* @codekit-prepend "lib/jquery.payments.js" */
/* @codekit-prepend "lib/jquery.form.js" */

jQuery(function($){

  var paymentFormWrapper, paymentForm, loadingContainer,
      loadingSpinner, needsValidation, submitButton,
      name, email, ccNum, ccExp, ccCvc, filePath,
      _cover, _title, _artist, _file, _price;

  badracket.setupDownloadForm = function(cover, title, artist, price, file) {
    var formHTML;

    $('#buy-album-form').remove();
    // $('body').addClass('modal--active');

    _cover = cover;
    _title = title;
    _artist = artist;
    _file = file;
    _price = price;
    filePath = file;

    jQuery.ajax({
         url: s.domain + 'wp-admin/admin-ajax.php',
         data:{ 'action':'do_ajax', 'fn':'download_modal' },
         dataType: 'JSON',
         success:function(data){ renderForm(data); },
         error:function(err){ console.log('there has been an error');},
    });


    function renderForm(data){
        $('body').append(data);

        modalFormHTML = $('#buy-album-form');
        modalFormHTML.modal('show');

        $('.buy-album-cover').attr('src',cover);
        $('#buy-album-header').text(title);
        $('.buy-artist-name').text(artist);
        $('.price').text('Free');


        modalFormHTML.on('hidden', function(){
          this.remove();
        });


        paymentFormWrapper = $('.payment-form-wrapper');
        name = $('.your-name');
        email = $('.your-email');
        submitButton = $('.submit-payment-button');
        paymentForm = $('#payment-form');

        submitButton.attr('href', filePath);

        function isValidEmail(email) {
          var eReg=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return eReg.test(email) && email.length > 0;
        }

        name.toggleClass('invalid', name.val().length < 3 );
        email.toggleClass('invalid', !isValidEmail( email.val() ) );

        function validateFields(){
          name.toggleClass('invalid', name.val().length < 3 );
          email.toggleClass('invalid', !isValidEmail( email.val() ) );

          if ( $('input.invalid').length ) {
              submitButton.addClass('disabled');
              return false;
            } else {
              submitButton.removeClass('disabled');
              return true;
            }
        }

       function handleFormSubmit(){
          submitButton.click(function(event) {

            if ( validateFields() ) {
              submitButton.prop('disabled', true);
              sendMail( name.val(), email.val() );
              mixpanel.people.increment("Albums purchased", 1);
              setTimeout(function() {
                modalFormHTML.modal('hide');
              }, 500);

            }

          // Prevent the form from submitting with the default action
          return false;
        });
      }
       validateFields();
       paymentFormWrapper.keyup( validateFields );
       handleFormSubmit();

    }

    };

  badracket.setupPayForm = function( cover, title, artist, price, file) {

    _cover = cover;
    _title = title;
    _artist = artist;
    _file = file;
    _price = price;

    var priceCents = price * 100;
    filePath = file;


    jQuery.ajax({
         url: s.domain + 'wp-admin/admin-ajax.php',
         data:{ 'action':'do_ajax', 'fn':'get_payment_modal' },
         dataType: 'JSON',
         success:function(data){ renderForm(data); },
         error:function(err){ console.log('there has been an error');},
    });


  function renderForm(data){

      $('body').append(data);

      modalFormHTML = $('#buy-album-form');
      modalFormHTML.modal('show');

      modalFormHTML.on('hidden', function(){
        this.remove();
      });

      // cache jQuery lookup
      paymentFormWrapper = $('.payment-form-wrapper');
      paymentForm = $('#payment-form');
      loadingContainer = $('.loading-container');
      loadingSpinner = $('.submit-payment-button');
      needsValidation = $('.validation');
      submitButton = $('.submit-payment-button');
      name = $('.your-name');
      email = $('.your-email');
      ccNum = $('.cc-number');
      ccExp = $('.cc-exp');
      ccCvc = $('.cc-cvc');

      paymentForm.append('<input type="hidden" name="price" value="'+priceCents+'"/">');
      $('.buy-album-cover').attr('src',cover);
      $('#buy-album-header').text(title);
      $('.buy-artist-name').text(artist);
      $('.price').text(price);

      // format fields
      $('[data-numeric]').payment('restrictNumeric');
      ccNum.payment('formatCardNumber');
      ccExp.payment('formatCardExpiry');
      ccCvc.payment('formatCardCVC');

      validateFields();
      paymentFormWrapper.keyup( validateFields );
      handleFormSubmit();

    }
  };

   function isValidEmail(email) {
      var eReg=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return eReg.test(email);
  }


  function validateFields(){
    var cardType = $.payment.cardType( ccNum.val() );

    ccNum.toggleClass('invalid', !$.payment.validateCardNumber(ccNum.val()));
    ccExp.toggleClass('invalid', !$.payment.validateCardExpiry(ccExp.payment('cardExpiryVal')));
    ccCvc.toggleClass('invalid', !$.payment.validateCardCVC(ccCvc.val(), cardType));
    name.toggleClass('invalid', name.val().length < 3 );
    email.toggleClass('invalid', !isValidEmail( email.val() ) );

    if ( $('input.invalid').length ) {
      submitButton.addClass('disabled');
      return false;
    } else {
      submitButton.removeClass('disabled');
      return true;
    }
  }

  function handleFormSubmit(){
    console.log(filePath);
    console.log('handle form sumit attached');
    paymentForm.submit(function(event) {
      // Disable the submit button to prevent repeated clicks
      event.preventDefault();

      if ( validateFields() ) {
        $(this).find('button').prop('disabled', true);
        paymentFormWrapper.addClass('loading');
        loadingContainer.show();
        loadMessages();

        // $('input').removeClass('invalid'); // don't think I need this, since validate() already ran and toggled

        var exp_date = ccExp.val(),
            expiration_month = exp_date.split('/')[0].trim(),
            expiration_year = exp_date.split('/')[1].trim();

        Stripe.createToken(
        {
          number : ccNum.val(),
          cvc : ccCvc.val(),
          exp_month : expiration_month,
          exp_year : expiration_year
        },
        stripeResponseHandler
        );
      }

      // Prevent the form from submitting with the default action
      return false;
    });
  }



  var stripeResponseHandler = function(status, response) {

    if (response.error) {
      // Show the errors on the form
      paymentForm.find('.payment-errors').text(response.error.message);
      paymentForm.find('button').prop('disabled', false);

    } else {

      console.log('payment success');
      var token = response.id;
      paymentForm.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      paymentForm.ajaxSubmit(options = {
        success:function(){
          paymentFormWrapper.removeClass('loading');
          loadingContainer.hide();
          submitButton.hide();
          sendMail( name.val(), email.val() );
          mixpanel.people.increment("Albums purchased", 1);
          mixpanel.people.track_charge( parseInt( _price.substring(1) ,10) );

          var downloadButton = '<a class="red-button" href="'+filePath+'">Download album</a>';

          $('.modal-footer').append(downloadButton);

          var html = [
            '<h2 class="bottom1 top1">Thanks for your support!</h2>',
            '<p class="bottom1">Use the download button below to begin downloading the album. Enjoy :-)</p>'
          ].join('\n');

          paymentFormWrapper.html(html);
        }
      });
    }
  };

  function loadMessages(){
    var messages = [
      'Rummaging through the back room...',
      'Grabbing your album... '
    ];

    var i = 0;

    displayMessage();


    function displayMessage(){
      $('.loading-messages').append('<div>' + messages[i] + '</div>');
      i++;
      if ( i < 2) {
        setTimeout(function() { displayMessage(); }, 2100);
      }
    }
  }

  function sendMail( name, email ){

    console.log('send mail js ran');

    var message = [
      name + ',',
      '\n',
      'Thanks for supporting ' + _artist + '!',
      'You can download ' + _title + ' with the link below.',
      '\n',
      _file,
      '\n',
      '-The Bad Racket Team',
      'http://www.badracket.com'
    ].join('\n');

    var subject = _title + ' Download Link';

    var domain = document.location.origin + document.location.pathname;

    jQuery.ajax({
         url: domain + 'wp-admin/admin-ajax.php',
         data:{
              'action':'do_ajax',
              'fn':'send_mail',
              'subject': subject,
              'message': message,
              'email' : email
              },
         dataType: 'JSON',
         success:function(data){
           console.log(data);
         },
         error: function(errorThrown){
              console.log(errorThrown);
         }
     });
  }
});

// This identifies your website in the createToken call below
Stripe.setPublishableKey('pk_test_iV1NX0AkuxskATxdKxLU26ba');