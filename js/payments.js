/* @codekit-prepend "lib/stripe.js" */
/* @codekit-prepend "lib/jquery.payments.js" */
/* @codekit-prepend "lib/jquery.form.js" */


// Stripe

jQuery(function($){

  var paymentForm = $('.payment-form'),
      loadingContainer = $('.loading-container'),
      loadingSpinner = $('.submit-payment-button'),
      needsValidation = $('.validation'),
      submitButton = $('.submit-payment-button'),
      name = $('.your-name'),
      email = $('.your-email'),
      ccNum = $('.cc-number'),
      ccExp = $('.cc-exp'),
      ccCvc = $('.cc-cvc');

  // format fields
  $('[data-numeric]').payment('restrictNumeric');
  ccNum.payment('formatCardNumber');
  ccExp.payment('formatCardExpiry');
  ccCvc.payment('formatCardCVC');

  function validateFields(){
    var cardType = $.payment.cardType($('.cc-number').val());

    ccNum.toggleClass('invalid', !$.payment.validateCardNumber(ccNum.val()));
    ccExp.toggleClass('invalid', !$.payment.validateCardExpiry(ccExp.payment('cardExpiryVal')));
    ccCvc.toggleClass('invalid', !$.payment.validateCardCVC(ccCvc.val(), cardType));
    name.toggleClass('invalid', name.val().length < 3 );
    email.toggleClass('invalid', email.val().length < 4 );

    if ( $('input.invalid').length ) {
      needsValidation.addClass('failed');
      submitButton.addClass('disabled');
    } else {
      needsValidation.addClass('passed');
      submitButton.removeClass('disabled');
    }
  }


  // After each key press, check validation of whole form
  paymentForm.keyup( validateFields );



  $('#payment-form').submit(function(event) {
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);

    submitButton.addClass('loading');
    $('.payment-form').addClass('loading');
    $('.loading-container').show();
    loadMessages();

    event.preventDefault();

    $('input').removeClass('invalid');
    $('.validation').removeClass('passed failed');

    validateFields();


    var exp_date = ccExp.val(),
        expiration_month = exp_date.split('/')[0].trim(),
        expiration_year = exp_date.split('/')[1].trim();

    console.log(exp_date);

    Stripe.createToken({
      number : ccNum.val(),
      cvc : ccCvc.val(),
      exp_month : expiration_month,
      exp_year : expiration_year
    }, stripeResponseHandler);

    $('.payment-form').addClass('loading');

    // Prevent the form from submitting with the default action
    return false;
  });



  var stripeResponseHandler = function(status, response) {
    var $form = $('#payment-form');


    if (response.error) {
      // Show the errors on the form
      $form.find('.payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false);
    } else {

      console.log('payment success');
      // token contains id, last4, and card type
      var token = response.id;
      // Insert the token into the form so it gets submitted to the server
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      // $form.get(0).submit();
      $form.ajaxSubmit(options = {
        success:function(){
          paymentForm.removeClass('loading');
          $('.loading-container').hide();

          submitButton.hide();

          var downloadButton = '<a class="red-button" href>Download album</a>';

          $('.modal-footer').append(downloadButton);

          var html = [
            '<h2 class="bottom1 top1">Thanks for your support!</h2>',
            '<p class="bottom1">Use the download button below to begin downloading the album. Enjoy :-)</p>',
          ].join('\n');

          paymentForm.html(html);
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
        setTimeout(function() { displayMessage(); }, 2000);
      }
    }
  }




});


jQuery(function($) {

});




// text card number
// 4242424242424242




// This identifies your website in the createToken call below
Stripe.setPublishableKey('pk_test_iV1NX0AkuxskATxdKxLU26ba');