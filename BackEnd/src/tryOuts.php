<?php
include 'getSub.php';
permission();
http_response_code(200);
header("Content-type: application/json");
$json = file_get_contents('php://input');
// Converts it into a PHP object
$user= json_decode($json, true);
//print_r($user);
$token = $user['token'];
//echo $token;
$uid = getUid($token);
echo json_encode(array("status" => $uid));

