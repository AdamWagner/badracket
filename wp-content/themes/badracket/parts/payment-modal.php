<div id="buy-album-form" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header group">
    <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> -->
    <img class="buy-album-cover" src="" alt="">
    <hgroup>
      <h3 id="buy-album-header"></h3>
      <h4 class="buy-artist-name"></h4>
      <div class="price"></div>
    </hgroup>
  </div>
  <div id="modal-content">
    <div class="modal-body">
        <div class="loading-container">
          <span class="loading-spinner style-2"></span>
          <div class="loading-messages"></div>
        </div>

      <div class="payment-form-wrapper">

        <form action="" method="POST" id="payment-form" novalidate autocomplete="on">
          <span class="payment-errors"></span>

          <table>
          <tr>
            <td class="label-container">Name</td>
            <td class="input-container"><input type="text" size="20" class="your-name w-100" placeholder="Your name" /></td>
          </tr>

          <tr>
            <td class="label-container">Email</td>
            <td class="input-container"><input type="text" size="20" class="your-email w-100" placeholder="Your email" /></td>
          </tr>

          <tr>
            <td class="label-container">Card Number</td>
            <td class="input-container"><input type="text" size="20" data-stripe="number " class="cc-number w-100 " pattern="\d*" x-autocompletetype="cc-number" placeholder="Card number" required/></td>
          </tr>

          <tr>
            <td class="label-container">CVC</td>
            <td class="input-container"><input type="text" size="4" data-stripe="cvc" class="cc-cvc" pattern="\d*" x-autocompletetype="cc-csc" placeholder="Security code" required  autocomplete="off"/></td>
          </tr>

          <tr>
            <td class="label-container">Exp date</td>
            <td class="input-container"><input type="text" size="9" data-stripe="exp-date " class="cc-exp w-100 " pattern="\d*" x-autocompletetype="cc-exp" placeholder="MM / YY" required maxlength="9"/></td>
          </tr>

        </table>

      </div>
    </div>
    <div class="modal-footer">
      <span  class="cancel-purchase" data-dismiss="modal" aria-hidden="true">close</span>
      <button class="submit-payment-button disabled" type="submit">Submit Payment</button>
    </div>
    </form>
  </div>
  </div> <?php // End #modal-content ?>