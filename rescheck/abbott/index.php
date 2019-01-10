<?php
$param = $_GET['s'];
$msg = $param . " -- https://disneyworld.disney.go.com/dining/magic-kingdom/be-our-guest-restaurant/";

// send email
mail("7013065058@messaging.sprintpcs.com","Disney Dining",$msg);
mail("tabbott@vogellaw.com","Disney Dining",$msg);
mail("tlabbott@cableone.net","Disney Dining",$msg);
mail("7013062348@messaging.sprintpcs.com","Disney Dining", "Abbott alert " . $msg);
mail("7013063354@messaging.sprintpcs.com","Disney Dining", "Abbott alert " . $msg);
mail("kryshel.fischer@outlook.com","Disney Dining", "Abbott alert " . $msg);
?>