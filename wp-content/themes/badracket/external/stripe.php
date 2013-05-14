<?php

/* ========================================================================================================================
Stripe
======================================================================================================================== */

if ($_POST) {
  Stripe::setApiKey("sk_test_5WPYe79f3ARl35CElPgwxV5y");
  $error = '';
  $success = '';
  try {
    if (!isset($_POST['stripeToken']))
      throw new Exception("The Stripe Token was not generated correctly");
    Stripe_Charge::create(array("amount" => $_POST['price'],
                                "currency" => "usd",
                                "card" => $_POST['stripeToken']));
    $success = 'Your payment was successful.';
  }
  catch (Exception $e) {
    $error = $e->getMessage();
  }
}

?>
