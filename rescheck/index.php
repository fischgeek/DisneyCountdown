<?php
// $param = $_GET['s'];
// $link = $_GET['l'];
$place = $_GET['p'];
//$subject = 'Disney Dining';
//$msg = $param . " -- " . $link;
$subject = $place;
// $msg = $link;
$msg = "teamviewer8://computers";
$frm = "From: fischgeek@fischgeek.com";

mail("7013063354@messaging.sprintpcs.com",$subject,$msg,$frm);
mail("kryshel.fischer@tmihospitality.com",$subject,$msg,$frm);
mail("kryshel.fischer@outlook.com",$subject,$msg,$frm);
mail("7013062348@messaging.sprintpcs.com",$subject,$msg,$frm);
mail("jrfischer@outlook.com",$subject,$msg,$frm);
echo "<script>window.close();</script>";