<div id="buy-album-form" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header group">
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
            <td class="input-container"><input type="text" size="20" class="your-name w-100 invalid" placeholder="Your name" /></td>
          </tr>

          <tr>
            <td class="label-container">Email</td>
            <td class="input-container"><input type="text" size="20" class="your-email w-100 invalid" placeholder="Your email" /></td>
          </tr>
        </table>

    <div class="modal-footer">
      <span  class="cancel-purchase" data-dismiss="modal" aria-hidden="true">close</span>
      <button class="submit-payment-button disabled" type="submit">Download</button>
    </div>
    </form>
  </div>
</div> <?php // End #modal-content ?>
</div>
</div>