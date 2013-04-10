/* @codekit-prepend "lib/stripe.js" */
/* @codekit-prepend "lib/jquery.payments.js" */
/* @codekit-prepend "lib/jquery.form.js" */

jQuery(function($){

  var paymentFormWrapper, paymentForm, loadingContainer,
      loadingSpinner, needsValidation, submitButton,
      name, email, ccNum, ccExp, ccCvc, filePath;

  badracket.setupPayForm = function( cover, title, artist, price, file) {

    var priceCents = price * 100;
    filePath = file;
    $('#modal-content').html('<form action="" method="POST" id="payment-form" novalidate autocomplete="on"> <div class="modal-body"> <div class="loading-container"> <span class="loading-spinner style-2"> </span> <div class="loading-messages"></div> </div> <div class="payment-form-wrapper"> <span class="payment-errors"></span> <table> <tr> <td class="label-container">Name </td> <td class="input-container"> <input type="text" size="20" class="your-name w-100" placeholder="Your name" /> </td> </tr> <tr> <td class="label-container">Email </td> <td class="input-container"><input type="text" size="20" class="your-email w-100" placeholder="Your email" /> </td> </tr> <tr> <td class="label-container">Card Number </td> <td class="input-container"><input type="text" size="20" data-stripe="number " class="cc-number w-100 " pattern="\d*" x-autocompletetype="cc-number" placeholder="Card number" required/> </td> </tr> <tr> <td class="label-container">CVC </td> <td class="input-container"><input type="text" size="4" data-stripe="cvc" class="cc-cvc" pattern="\d*" x-autocompletetype="cc-csc" placeholder="Security code" required  autocomplete="off"/> </td> </tr> <tr> <td class="label-container">Exp date </td> <td class="input-container"><input type="text" size="9" data-stripe="exp-date " class="cc-exp w-100 " pattern="\d*" x-autocompletetype="cc-exp" placeholder="MM / YY" required maxlength="9"/> </td> </tr> </table> </div> <!-- end form-wrapper --> </div> <!-- end modal-body --> <div class="modal-footer"> <span  class="cancel-purchase" data-dismiss="modal" aria-hidden="true">close </span> <button class="submit-payment-button disabled" type="submit">Submit Payment </button> </div> </form>');

    $('#payment-form').append('<input type="hidden" name="price" value="'+priceCents+'"/">');
    $('.buy-album-cover').attr('src',cover);
    $('#buy-album-header').text(title);
    $('.buy-artist-name').text(artist);
    $('.price').text(price);

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

    // format fields
    $('[data-numeric]').payment('restrictNumeric');
    ccNum.payment('formatCardNumber');
    ccExp.payment('formatCardExpiry');
    ccCvc.payment('formatCardCVC');

    validateFields();
    paymentFormWrapper.keyup( validateFields );
    handleFormSubmit();

    // console.log(file);
  };


  function validateFields(){
    var cardType = $.payment.cardType( ccNum.val() );

    ccNum.toggleClass('invalid', !$.payment.validateCardNumber(ccNum.val()));
    ccExp.toggleClass('invalid', !$.payment.validateCardExpiry(ccExp.payment('cardExpiryVal')));
    ccCvc.toggleClass('invalid', !$.payment.validateCardCVC(ccCvc.val(), cardType));
    name.toggleClass('invalid', name.val().length < 3 );
    email.toggleClass('invalid', email.val().length < 4 );

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
});

// This identifies your website in the createToken call below
Stripe.setPublishableKey('pk_test_iV1NX0AkuxskATxdKxLU26ba');