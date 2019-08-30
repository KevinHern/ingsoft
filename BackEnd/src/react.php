<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
if ($_POST)
	{

	// set response code - 200 OK

	http_response_code(200);
	/*
	$subject = $_POST['fname'];
	$to = "me@malith.pro";
	$from = $_POST['email'];

	// data

	$msg = $_POST['number'] . $_POST['message'];
    */
	// Headers

	$headers = "MIME-Version: 1.0\r\n";
	$headers.= "Content-type: application/json;\r\n";
	//$headers.= "From: <" . $from . ">";
	//mail($to, $subject, $msg, $headers);
	

    //echo json_encode( $_POST );

	echo json_encode(array(
		"sent" => "PHP Rocks"
	));
	}
  else
	{
	// tell the user about error

	echo json_encode(["sent" => false, "message" => "Something went wrong"]);
	}
?>