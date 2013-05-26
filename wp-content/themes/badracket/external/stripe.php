<?php

/* ========================================================================================================================
Stripe
======================================================================================================================== */

switch(ENVIRONMENT){
  case 'local':
    // require_once( 'includes/env-local.php'); // environment getter functions
    $sk_key = "sk_test_5WPYe79f3ARl35CElPgwxV5y";
    break;
  case 'staging':
    // require_once( 'includes/env-staging.php'); // environment getter functions
    break;
  case 'production':
    // require_once( 'includes/env-production.php'); // production getter functions
    $sk_key = "sk_live_QbttFsj9dnkdgehWvBLCGxsz";
    break;
}

if ($_POST) {
  Stripe::setApiKey($sk_key);
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
