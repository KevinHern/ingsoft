<?php
	//Libraries
	include '../connection.php';

	
	$json = file_get_contents('php://input');
	//Converts it into a PHP object
    $_POST = json_decode($json, true);
    
	/*
	INPUTS:
	1. User's ID
	2. Phone number
	3. Number's extension

	------------

	OUTPUTS:
	1. Status: 1 if success, 0 otherwise
	*/
	$link = OpenConUser("u");

	$number = $_POST["number"];
	$ext = $_POST["ext"];
	$uid = $_POST["uid"];

	try
	{
		$query = "INSERT INTO telephone VALUES('$uid', '$number', $ext);";
		$result = pg_query($link, $query);
		$json = array('status' => 1);
	}
	catch (Exception $e)
	{
		$json = array('status' => 0, 'message' => "Ocurrio un error");
	}
	finally
	{
		echo json_encode($json);
	}

	CloseCon($link);


?>